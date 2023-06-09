import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';



@Component({
  selector: 'app-exchange-account',
  templateUrl: './exchange-account.component.html',
  styleUrls: ['./exchange-account.component.scss']
})
export class ExchangeAccountComponent {
  @ViewChild('myButton', { static: false }) myButton: ElementRef<HTMLButtonElement> = null!;
  public loading: boolean = true;
  public dataSource: any
  public showModals: boolean = false;
  public wizardVal = 0;
  public submitted: boolean = false;
  accountForm: FormGroup = new FormGroup({});
  public btnloading: boolean = false;

  public TotalBalance: number = 0;
  public totalAccoutS : number = 0; 

  public currentOrder : boolean = true;
  public position : boolean = true;


  constructor(
    private ApiService: BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }


  /**
   * Get account list and Total account balance
   */
  async getAccoundInfo() {
    await this.ApiService.getAccountDetails()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.dataSource = res.data;
          if (this.dataSource) {
            this.totalAccoutS = this.dataSource.length;
            for (let i = 0; i < this.dataSource.length; i++) {
              this.TotalBalance += parseFloat(this.dataSource[i].totalWalletBalance);
            }
          }
        }else{
          this.dataSource = null;
        }
      });
  }

  /**
   * Calculate lost and profit %
   * @param data 
   * @param items 
   * @returns 
   */
  calculateTotal(data: any, items: any): any {
    if (data && data != 0) {
      let change = data - items;
      let percentage = ((change / items) * 100).toFixed(2);
      let sign = change >= 0 ? '+' : '';
      return sign + percentage + '%';
    }else{
      return '0%';
    }
  }

  /**
   * On submit connect account
   * @param params 
   */
  onSubmit(params: { valid: boolean, value: any }) {
    this.submitted = true;
    this.btnloading = true;
    if (params.valid) {
      this.ApiService.addAccount(params.value).subscribe((res: any) => {
        if (res && res.success == true) {
          this.ApiService.successSnackBar('Account Connected');
          this.getAccoundInfo();
          this.btnloading = false;
          this.wizardVal = 0;
          this.showModals = false;
        } else {
          if(res && res.message && res.message.retMsg){
            this.ApiService.warningSnackBar(res.message.retMsg);
          }else{
            this.ApiService.warningSnackBar(res.message);
          }
          
          this.btnloading = false;
        }
      });
    } else {
      this.btnloading = false;
    }

  }


  deleteAccount(items : any){
    this.btnloading = true;
    console.log(items);
    if(this.position == true || this.currentOrder == true){
      this.ApiService.warningSnackBar('Currently some orders are running');
      this.btnloading = false;
    }else{
      this.spinner.show();
      this.ApiService.deleteExchangeAccount(items._id).subscribe((res : any)=>{
        if(res && res.success == true){
          this.ApiService.successSnackBar('Strategy deleted succesfully');
          this.getAccoundInfo();
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






/**
 * Hide connect account modal
 */
  hideModal() {
    this.wizardVal = 0;
    this.showModals = false;
  }

  /**
   * Show connect account Modal
   */
  showModal() {
    this.createForm();
    this.showModals = true;
  }

  /**
   * Next wizard step
   * @param data 
   */
  next(data: any) {
    if (this.wizardVal == 2) {
      this.myButton.nativeElement.click();
    } else {
      this.wizardVal = data + 1;
    }
  }

  /**
   * Previous wizard step
   * @param data 
   */
  prev(data: any) {
    this.wizardVal = data - 1;
  }

  /**
   * Create connect account form
   */
  createForm() {
    this.accountForm = this.fb.group({
      connectionName: ['', [Validators.required]],
      apiKey: ['', Validators.required],
      secretKey: ['', Validators.required]
    })
  }


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.getAccoundInfo();
    this.mypositionorders();
    this.mycurrentorders();
    this.loading = false;

  }
}

