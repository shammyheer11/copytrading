import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-my-strategies',
  templateUrl: './my-strategies.component.html',
  styleUrls: ['./my-strategies.component.scss']
})
export class MyStrategiesComponent {
  accountForm: FormGroup = new FormGroup({});
  public loading: boolean = true;
  public submitted: boolean = false;
  public durationInSeconds = 3;
  public showModals: boolean = false;
  public accountInfo: any;
  public staticVal: any;
  public dataSource: any;
  public btnloading: boolean = false;
  public MinimumAmout: any = '100';
  public riskLimit: number = 5;
  public currentOrder : boolean = true;
  public position : boolean = true;


  public disabled = false;
  public max = 100;
  public min = 0;
  public showTicks = false;
  public step = 1;
  public thumbLabel = false;
  public value = 0;


  riskLimitVal: Options = {
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
      { value: 10 }
    ]
  };


  constructor(
    private ApiService: BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }


  /**
   * Hide create strategy Modal
   */
  hideModal() {
    this.showModals = false;
  }

  /**
   * Show create strategy Modal
   */
  showModal() {
    if (this.accountInfo) {
      this.showModals = true;
      this.createForm();
    } else {
      this.ApiService.warningSnackBar('Please connect your account first');
    }
  }



  /**
   * Create my strategy form
   */
  createForm() {
    this.accountForm = this.fb.group({
      strategyName: ['', [Validators.required]],
      exchange: ['Bybit', Validators.required],
      type: ['linear', Validators.required],
      bybitaccount: [this.staticVal, Validators.required],
      baseCoin: ['USDT', Validators.required],
      strategyDescription: [''],
      copyTradingcost: ['', Validators.required],
      riskLimitValue: [this.riskLimit, Validators.required],
      minimumBalance: ['50', Validators.required],
    })
  }

  /**
   * On submit my strategy form
   * @param params 
   */
  async onSubmit(params: { valid: boolean, value: any }) {
    console.log(params.value);
    this.submitted = true;
    this.btnloading = true;
    if (params.valid) {
      const foundItem = this.accountInfo.find((item: any) => item._id === params.value.bybitaccount);
      if (foundItem.totalWalletBalance >= this.MinimumAmout) {
        let accLimit = this.accountForm.value;
        let stringValue = accLimit.riskLimitValue.toString();
        this.accountForm.controls['riskLimitValue'].setValue(stringValue);
        await this.ApiService.addStrategies(params.value).subscribe((res: any) => {
          if (res && res.success == true) {
            this.ApiService.setalert(true);
            this.ApiService.successSnackBar('Stategy Added Succesfully');
            this.showModals = false;
            this.myStrategies();
            this.btnloading = false;
            this.showModals = false;
          } else {
            this.ApiService.warningSnackBar(res.message);
            this.btnloading = false;
          }
        });
      } else {
        this.btnloading = false;
        this.ApiService.warningSnackBar('Required mimimum 100 USDT Wallet Balance');
      }
    } else {
      this.ApiService.warningSnackBar('Please fill requried Fields');
      this.btnloading = false;
    }
  }


  /**
   * Get exchange account list
   */
  getAccoundInfo() {
    this.ApiService.getAccountDetails()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.accountInfo = res.data;
          this.staticVal = res.data[0]._id;
        }
      });
  }

  /**
   * Get my strategy List
   */
  myStrategies() {
    this.ApiService.getMyStrategies()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.dataSource = res.data;
        }
      });
  }


  deleteStategy(items : any){
    this.btnloading = true;
    if(this.position == true || this.currentOrder == true){
      this.ApiService.warningSnackBar('Currently some orders are running');
      this.btnloading = false;
    }else{
      this.spinner.show();
      this.ApiService.deleteStrategy(items._id).subscribe((res : any)=>{
        if(res && res.success == true){
          this.ApiService.successSnackBar('Strategy deleted succesfully');
          this.myStrategies();
          this.spinner.hide();
        }else{
          this.ApiService.warningSnackBar('Strategy not deleted');
          this.spinner.hide();
        }
      });
      this.btnloading = false;
    }
  }


  mypositionorders() {
    this.ApiService.getpositionOrderList()
      .subscribe((res: any) => {
        if (res && res.data && res.data.length > 0) {
          let data = res.data.filter((obj: any) => obj.hasOwnProperty('positionStatus') && obj.size != "0" );
          this.position = true;
          if(data.length == 0){
            this.position = false;
          }
        }else{
          this.position = false;
        }
      });
  }

  /**
   * Get current orders list
   */  
  mycurrentorders() {
    this.spinner.show();
    this.ApiService.getcurrentOrderList()
      .subscribe((res: any) => {
        if (res && res.data && res.data.length > 0) {
          let data = res.data.filter((obj: any) => obj.hasOwnProperty('orderStatus'));
          this.currentOrder = true;
          if(data.length == 0){
            this.currentOrder = false;
          }
        }else{
          this.currentOrder = false;
        }
      });
  }




  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.getAccoundInfo();
    this.myStrategies();
    this.mypositionorders();
    this.mycurrentorders();
    this.loading = false;
  }

}
