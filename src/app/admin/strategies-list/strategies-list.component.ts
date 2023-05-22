import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-strategies-list',
  templateUrl: './strategies-list.component.html',
  styleUrls: ['./strategies-list.component.scss']
})
export class StrategiesListComponent {
  public loading : boolean = true;
  public dataSource : any;
  coppystrategyForm: FormGroup = new FormGroup({});
  public showModals : boolean = false;
  public durationInSeconds = 3;
  public accountList : any;
  public staticVal : any;
  public traderInfo : any;
  public btnloading : boolean =  false;
  public MinimumAmout : any = '100';

  constructor(
    private route : Router, 
    private ApiService : BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ){

  }


  /**
   * Get exchange account list
   */
  getAccoundInfo(){
    this.ApiService.getAccountDetails()
    .subscribe((res : any) => {
      if(res && res.data){
          this.accountList = res.data;
          this.staticVal = res.data[0]._id;
      }
    });
  }



  /**
   * Get all public strategies List
   */
  publicStrategies(){
    this.ApiService.getpublicStrategies()
    .subscribe((res : any) => {
      if(res && res.data){
          this.dataSource = res.data;
      }else{
        this.ApiService.warningSnackBar('No data found');
      }
    });
  }


  /**
   * Create copy strategy popup form
   */
  createForm() {
    this.coppystrategyForm = this.fb.group({
      subscribeTo: ['', [Validators.required]],
      subscribeFrom: [this.staticVal, [Validators.required]],
      strategies: ['', [Validators.required]],
    })
  }


  /**
   * Submit copy strategy form
   * @param params 
   */
  onSubmit(params: { valid: boolean, value: any }) {
    this.btnloading = true;
    if (params.valid) {
      const foundItem = this.accountList.find((item :any) => item._id === params.value.subscribeFrom);
      if(foundItem.totalWalletBalance >= this.MinimumAmout){
          this.ApiService.copyStrategy(params.value).subscribe((res : any) =>{
          if(res && res.success == true){
            this.ApiService.successSnackBar('Subscribe Succesfully');
            this.showModals = false;
            this.btnloading = false;
          }else{
            this.ApiService.warningSnackBar(res.message);
            this.showModals = false;
            this.btnloading = false;
          }
      });
      }else{
        this.btnloading = false;
        this.ApiService.warningSnackBar('Required mimimum 100 USDT Wallet Balance');
      }
    }else{
      this.btnloading = false;
    }

  }






  /**
   * Hide popup modal
   */
  hideModal(){
    this.showModals = false;
  }

  /**
   * Show strategy copy form popup
   * @param item 
   */
  openStrategy(item : any){  
    this.traderInfo = item;
    this.showModals = true;
    this.createForm();
    this.coppystrategyForm.controls['subscribeTo'].setValue(item.bybitaccount._id);
    this.coppystrategyForm.controls['strategies'].setValue(item._id);
  }



  ngOnInit(){
    this.publicStrategies();
    this.getAccoundInfo();
    this.loading = false;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }
}
