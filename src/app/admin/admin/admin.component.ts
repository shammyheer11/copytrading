import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { BybitService } from 'src/app/core/service/bybit.service';
import { Options } from "@angular-slider/ngx-slider";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('myButton') myButton!: ElementRef;
  @ViewChild('myCheckbox') myCheckbox!: ElementRef<HTMLInputElement>;

  placeorder: FormGroup = new FormGroup({});
  public isSuperadmin: string = 'user';
  public loading: boolean = true;
  public submitted: boolean = false;
  public showModals: boolean = false;
  public CointList: any;
  public currentCoin: any = 'BTCUSDT';
  public dataSource: any;
  public btnloading: boolean = false;
  public takeProfitLoss: boolean = false;
  public HidePrice: boolean = true;
  public changePrefrence: boolean = false;
  public userName: string = '';
  public filteredOptions: any;
  public getCoin: any;
  public currentLang: any;
  public checkTpSl: boolean = false;

  public takeProfit: any;
  public stopLoss: any;
  public maxStopLoss: any;

  public CurrentCoinPrice: any;
  public WalletBalance: any;
  public tradeUnit: any;
  public calculateSLrisk: any;
  public roi: any;
  public riskValue: number = 5;
  public positionSize: number = 10;
  public coinFloatVal: any = 2;
  public qtyFloatValue: any = 2;
  risk: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
    ]
  };

  slippage: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 10 },
      { value: 25 },
      { value: 50 },
      { value: 75 },
      { value: 100 },
    ]
  };


  public coinsUnit: any;


  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private ApiService: BybitService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private translate: TranslateService

  ) {
    translate.setDefaultLang('en');
    this.currentLang = 'en';
  }

  switchLang(language: string) {
    this.translate.use(language);
    this.currentLang = language;
  }

  /**
   * Get strategy List
   */
  async myStrategies() {
    await this.ApiService.getMyStrategies()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.dataSource = res.data;
        }
      });
  }

  /**
   * Get coins and price
   */
  getCoins() {
    this.ApiService.getCoinsList().subscribe((res: any) => {
      if (res && res.data) {
        this.CointList = res.data.filter((item: any) => item.symbol.includes("USDT"));
        this.filteredOptions = this.CointList;
      }
    });
  }


  filterOptions(event: any) {
    const searchTerm = this.placeorder.controls['filterCoin'].value;
    const filterValue = searchTerm ? searchTerm.toUpperCase() : '';
    this.filteredOptions = this.CointList.filter((option: any) =>
      option.symbol.toUpperCase().includes(filterValue)
    );
  }



  /**
   * On select coin 
   * @param event 
   */
  onSelectionChange(event: any) {
    let numberValue = Number(this.CurrentCoinPrice);
    this.placeorder.controls['orderprice'].setValue(numberValue);
    this.checkLeverage();
  }

  onLeverageChange(event: any) {
    let formValue = this.placeorder.value;
    if (formValue.symbol) {
      this.checkLeverage();
    }
  }



  checkLeverage() {
    let formValue = this.placeorder.value;
    let items = {
      strategyId: formValue.strategyId,
      symbol: formValue.symbol
    }
    this.ApiService.checkleverage(items).subscribe((res: any) => {
      if (res && res.success == true) {
        if (!res.usdtWalletBal) {
          this.ApiService.warningSnackBar('Insufficient Available balance');
          return;
        }
        this.WalletBalance = res.usdtWalletBal;
        this.CurrentCoinPrice = res.CoinBalance;


        console.log('Total wallet balance ' + this.WalletBalance);


        this.qtyFloatValue = this.getDecimalVal(res.getInstruments.minOrderQty);
        this.coinFloatVal = this.getDecimalVal(this.CurrentCoinPrice);
        if (formValue.symbol == 'BTCUSDT') {
          if (this.WalletBalance < 100 && formValue.leverage < 25) {
            this.coinFloatVal = 3;
            this.qtyFloatValue = 5;
          } else {
            this.qtyFloatValue = this.getDecimalVal(res.getInstruments.minOrderQty);
            this.coinFloatVal = this.getDecimalVal(this.CurrentCoinPrice);
          }

        }


        let newwallet: any = (this.WalletBalance * (this.positionSize / 100)).toFixed(4);

        console.log('Balance used for trade ' + newwallet);


        let buyingPower: any = (newwallet * formValue.leverage).toFixed(this.coinFloatVal);

        console.log('Buying power after leverage ' + buyingPower);


        this.tradeUnit = (buyingPower / this.CurrentCoinPrice).toFixed(this.qtyFloatValue);


        if (res.getInstruments && (this.tradeUnit < res.getInstruments.minOrderQty)) {
          this.placeorder.controls['symbol'].setValue('');
          this.ApiService.warningSnackBar('The minimum quantity required for the purchase is ' + res.getInstruments.minOrderQty);
          return;
        }



        let maxLoss: any = (newwallet * (this.riskValue / 100)).toFixed(4);
        let StopLossValue: any;
        if (formValue.side == 'Buy') {
          StopLossValue = parseFloat(buyingPower) - parseFloat(maxLoss);
        } else {
          StopLossValue = parseFloat(buyingPower) + parseFloat(maxLoss);
        }

        this.maxStopLoss = (StopLossValue / this.tradeUnit).toFixed(this.coinFloatVal);
        this.placeorder.controls['positionsize'].setValue(this.positionSize);
        this.placeorder.controls['quantity'].setValue(this.tradeUnit.toString());
      } else {
        this.ApiService.warningSnackBar('Data not found.');
      }
    });
  }


  /**
   * Calculate Stoploss percentage
   */
  calculateStopLoss() {
    let data = this.getDecimalVal(this.stopLoss);
    if (data && data > this.coinFloatVal) {
      this.stopLoss = this.stopLoss.toFixed(this.coinFloatVal);
    }

    let formValue = this.placeorder.value;
    let newwallet: any = (this.WalletBalance * this.positionSize) / 100;
    let btcAmount: any = ((newwallet * formValue.leverage) / this.CurrentCoinPrice).toFixed(this.qtyFloatValue);

    let stopLossBTC: any = ((newwallet * formValue.leverage) / this.stopLoss).toFixed(6);
    let lossBTC: any;
    if (formValue.side == 'Buy') {
      lossBTC = btcAmount - stopLossBTC;
    } else {
      lossBTC = parseFloat(stopLossBTC) - parseFloat(btcAmount);
    }
    // Calculate the ROI in terms of percentage
    this.calculateSLrisk = ((lossBTC * this.CurrentCoinPrice / newwallet) * 100).toFixed(2);

  }




  getDecimalVal(val: any) {
    if (val) {
      let decimalCount: number = 0;
      if (Number.isInteger(val)) {
        return decimalCount = 0;
      } else {
        return decimalCount = val.toString().split('.')[1]?.length || 0;
      }
    }
  }


  /**
   * On change order type
   * @param event 
   */
  onTypeChange(event: any) {
    let type = event.value;
    if (type === 'Market') {
      this.HidePrice = true;
    } else {
      this.HidePrice = false;
    }

  }


  /**
   * Show create order Modal
   */
  showModal() {
    this.myStrategies();
    if (this.dataSource) {
      this.showModals = true;
      this.createForm();
      this.placeorder.controls['strategyId'].setValue(this.dataSource[0]._id);
    } else {
      this.ApiService.warningSnackBar('Please create a strategy first to place Order');
    }
  }


  get f() {
    return this.placeorder.controls;
  }




  /**
   * Create placeorder form
   */
  createForm() {
    this.placeorder = this.fb.group({
      category: ['linear', Validators.required],
      symbol: ['', [Validators.required]],
      leverage: ['5'],
      orderprice: ['', Validators.required],
      takeProfit: [''],
      stopLoss: [''],
      side: ['Buy', Validators.required],
      strategyId: ['', Validators.required],
      orderType: ['Market', Validators.required],
      filterCoin: [''],
      riskLimitValue: [this.riskValue, Validators.required],
      tradeMode: ['0', Validators.required],
      quantity: ['', Validators.required],
      positionsize: ['', Validators.required],

    })
  }

  /**
   * On save profit loss Modal
   * @returns 
   */
  changeProfit() {
    if (this.calculateSLrisk < -10.25) {
      this.ApiService.warningSnackBar('Maximum Stop loss should be less then 10 %');
      return;
    }
    let items = this.placeorder.value.side;
    if (!this.takeProfit || !this.stopLoss) {
      this.ApiService.warningSnackBar('Takeprofit and stop loss should be required');
      return;
    }
    if (items == 'Buy') {
      if (this.takeProfit < this.CurrentCoinPrice || this.stopLoss > this.CurrentCoinPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be greater and stop loss should be less then base price');
        this.takeProfitLoss = false;
        return;
      } else {
        this.placeorder.controls['takeProfit'].setValue(this.takeProfit.toString());
        this.placeorder.controls['stopLoss'].setValue(this.stopLoss.toString());
        this.takeProfitLoss = false;
        this.myCheckbox.nativeElement.checked = true;
      }
    } else {
      if (this.takeProfit > this.CurrentCoinPrice || this.stopLoss < this.CurrentCoinPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be less and stoploss should be greater then base price');
        this.takeProfitLoss = false;
        return;
      } else {
        this.placeorder.controls['takeProfit'].setValue(this.takeProfit.toString());
        this.placeorder.controls['stopLoss'].setValue(this.stopLoss.toString());
        this.takeProfitLoss = false;
        this.myCheckbox.nativeElement.checked = true;
      }
    }
  }


  /**
   * Open change loss profit modal
   */
  openProfit() {
    if (this.placeorder.controls['symbol'].value) {
      this.takeProfitLoss = true;
      this.myCheckbox.nativeElement.checked = true;
    } else {
      this.takeProfitLoss = false;
      this.myCheckbox.nativeElement.click();
      this.ApiService.warningSnackBar('Please select a coin first');
      this.myCheckbox.nativeElement.checked = false;
    }
  }


  closeProfit() {
    this.takeProfitLoss = false;
    this.myCheckbox.nativeElement.checked = false;
    this.takeProfit = null;
    this.stopLoss = null;
  }


  /**
   * UserlogOut
   */
  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }


  /**
   * Hide create order modal
   */
  hideModal() {
    this.showModals = false;
    this.HidePrice = true;
    this.takeProfit = '';
    this.stopLoss = '';
    this.filteredOptions = this.CointList;
    this.WalletBalance = null;
    this.CurrentCoinPrice = null;
    this.maxStopLoss = null;
    this.positionSize = 25;
    this.riskValue = 5;
  }


  /**
   * Submit trade 
   * @param params 
   * @returns 
   */
  async onSubmit(params: { valid: boolean, value: any }) {
    this.submitted = true;
    this.btnloading = true;
    if (params.valid) {
      let formfield = this.placeorder.value;
      let orderPriceval = formfield.orderprice

      if (formfield.orderType == 'Limit' && formfield.side == 'Buy') {
        if (orderPriceval > this.CurrentCoinPrice) {
          this.ApiService.warningSnackBar('Buy Position should be Less than base price');
          this.btnloading = false;
          return;
        }
      }

      if (formfield.orderType == 'Limit' && formfield.side == 'Sell') {
        if (orderPriceval < this.CurrentCoinPrice) {
          this.ApiService.warningSnackBar('Buy Position should be higher than base price');
          this.btnloading = false;
          return;
        }
      }

      let tradeTypeValue = formfield.tradeMode
      this.placeorder.controls['tradeMode'].setValue(parseInt(tradeTypeValue));
      this.placeorder.controls['orderprice'].setValue(orderPriceval.toString());
      this.placeorder.controls['riskLimitValue'].setValue(this.riskValue);
      await this.ApiService.copytrading(params.value).subscribe((res: any) => {
        if (res && res.success == true) {
          if (res.data.retMsg == 'OK') {
            this.ApiService.successSnackBar('Trade execute sucessfully');
            this.ApiService.onPlaceOrder(true);
          } else {
            this.ApiService.warningSnackBar(res.message);
          }
          this.hideModal();
          this.btnloading = false;
        }else if(res && res.success == false && res.data.retMsg){
          console.log(res.data);
          this.ApiService.warningSnackBar(res.data.retMsg);
          this.btnloading = false;
        } else {
          this.ApiService.warningSnackBar('Trade not execute');
          this.btnloading = false;
        }
      });
    } else {
      this.btnloading = false;
    }

    setTimeout(() => {
      this.btnloading = false;
    }, 5000);

  }

  ngOnInit() {
    this.myStrategies();
    this.getCoins();
    this.checkUser();
    this.ApiService.getalert().subscribe((value: any) => {
      this.myStrategies();
    });

  }



  /**
   * Check user details
   */
  checkUser() {
    let data: any = localStorage.getItem('user');
    if (data) {
      data = JSON.parse(data);
      this.userName = data.data.username;
      // if (data.data.role == "superadmin" || data.data.role == "admin") {

      //   setInterval(() => {
      //     this.ApiService.tradeWithdaw().subscribe((value: any) => {
      //     });
      //   }, 3000);
      // }
      this.ApiService.getuser(data.data._id).subscribe((value: any) => {
        if (value && value.data) {
          this.isSuperadmin = value.data[0].role;
        }
      });
    }
  }

}
