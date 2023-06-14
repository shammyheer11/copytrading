import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent {
  public dataSource : any;

  constructor( 
    private ApiService : BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ){}

  
  /**
   * Get my subscription List
   */
  mySubscription(){
    this.ApiService.getSubscriptionList()
    .subscribe((res : any) => {
      if(res && res.data){
          this.dataSource = res.data;
      }else{
        this.dataSource = null;
      }
    });
  }

  ngOnInit(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.mySubscription();
  }

}
