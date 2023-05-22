import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { BybitService } from 'src/app/core/service/bybit.service';


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

  public takeProfit: any;
  public stopLoss: any;


  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private ApiService: BybitService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private translate: TranslateService

  ) {
    translate.setDefaultLang('en');
  }

  switchLang(language: string) {
    this.translate.use(language);
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
        this.CointList = res.data.filter((obj: any) => obj.hasOwnProperty('usdIndexPrice'));
        this.filteredOptions = this.CointList;
        // this.currentCoin = this.CointList.find((c :any) => c.symbol === 'BTCUSDT');
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
    let coin = event.value;
    this.currentCoin = this.CointList.find((c: any) => c.symbol === coin);
    let numberValue = Number(this.currentCoin.usdIndexPrice).toFixed(3);
    this.placeorder.controls['orderprice'].setValue(numberValue);
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
    let numberValue = Number(this.currentCoin.usdIndexPrice).toFixed(3);
    this.placeorder = this.fb.group({
      category: ['linear', Validators.required],
      symbol: ['', [Validators.required]],
      leverage: ['5'],
      orderprice: [numberValue, Validators.required],
      takeProfit: [''],
      stopLoss: [''],
      side: ['Buy', Validators.required],
      strategyId: ['', Validators.required],
      orderType: ['Market', Validators.required],
      filterCoin: ['']
    })
  }

  /**
   * On save profit loss Modal
   * @returns 
   */
  changeProfit() {
    let items = this.placeorder.value.side;
    if (items == 'Buy') {
      if (this.takeProfit < this.currentCoin.usdIndexPrice || this.stopLoss > this.currentCoin.usdIndexPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be greater and stop loss should be less then base price');
        this.takeProfitLoss = false;
        return;
      } else {
        this.placeorder.controls['takeProfit'].setValue(this.takeProfit.toString());
        this.placeorder.controls['stopLoss'].setValue(this.stopLoss.toString());
        this.takeProfitLoss = false;
      }
    } else {
      if (this.takeProfit > this.currentCoin.usdIndexPrice || this.stopLoss < this.currentCoin.usdIndexPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be less and stoploss should be greater then base price');
        this.takeProfitLoss = false;
        return;
      } else {
        this.placeorder.controls['takeProfit'].setValue(this.takeProfit.toString());
        this.placeorder.controls['stopLoss'].setValue(this.stopLoss.toString());
        this.takeProfitLoss = false;
      }
    }
  }


  /**
   * Open change loss profit modal
   */
  openProfit() {
    if(this.placeorder.controls['orderprice'].value >= 1){
      this.takeProfitLoss = true;
    }else{
      this.takeProfitLoss = false;
      this.myCheckbox.nativeElement.click();
      this.ApiService.warningSnackBar('Please select a coin first');
    }

  }


  closeProfit() {
    this.takeProfitLoss = false;
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
        if (orderPriceval > this.currentCoin.usdIndexPrice) {
          this.ApiService.warningSnackBar('Buy Position should be Less than base price');
          this.btnloading = false;
          return;
        }
      }

      if (formfield.orderType == 'Limit' && formfield.side == 'Sell') {
        if (orderPriceval < this.currentCoin.usdIndexPrice) {
          this.ApiService.warningSnackBar('Buy Position should be higher than base price');
          this.btnloading = false;
          return;
        }
      }

      this.placeorder.controls['orderprice'].setValue(orderPriceval.toString());
      await this.ApiService.copytrading(params.value).subscribe((res: any) => {
        if (res && res.success == true) {
          if (res.message == 'OK') {
            this.ApiService.successSnackBar('Trade execute sucessfully');
            this.ApiService.onPlaceOrder(true);
          } else {
            this.ApiService.warningSnackBar(res.message);
          }
          this.hideModal();
          // this.myStrategies();
          this.btnloading = false;
        } else {
          this.ApiService.warningSnackBar('Trade not execute');
          this.btnloading = false;
        }
      });
    } else {
      this.btnloading = false;
    }

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
      this.ApiService.getuser(data.data._id).subscribe((value: any) => {
        this.isSuperadmin = value.data[0].role;
        this.userName = value.data[0].username
      });
    }
  }

}
