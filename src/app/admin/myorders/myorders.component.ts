import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent {
  public position: any = [];
  public currentOrder: any;
  public orderHistory: any;


  constructor(
    private ApiService: BybitService,
    private spinner: NgxSpinnerService
  ) { }

  /**
   * Get positions order list
   */  
  mypositionorders() {
    this.spinner.show();
    this.ApiService.getpositionOrderList()
      .subscribe((res: any) => {
        if (res && res.data && res.data.length > 0) {
          this.position = res.data.filter((obj: any) => obj.hasOwnProperty('positionStatus') && obj.size != "0" );
          this.spinner.hide();
          if(this.position.length == 0){
            this.position = [];
            this.spinner.hide();
          }
        }else{
          this.spinner.hide();
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
          this.currentOrder = res.data.filter((obj: any) => obj.hasOwnProperty('orderStatus'));
          this.spinner.hide();
          if(this.currentOrder.length == 0){
            this.currentOrder = [];
            this.spinner.hide();
          }
        }else{
          this.currentOrder = [];
          this.spinner.hide();
        }
      });
  }

  /**
   * Get history orders list
   */
  myhistoryorders() {
    this.spinner.show();
    this.ApiService.gethistoryOrderList()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.orderHistory = res.data;
          this.spinner.hide();
        }else{
          this.spinner.hide();
        }
      });
  }


  onChange(data: any) {
    if (data.tab.textLabel == 'Positions') {
      this.mypositionorders();
    } else if (data.tab.textLabel == 'Current Orders') {
      this.mycurrentorders();
    } else if (data.tab.textLabel == 'Order History') {
      this.myhistoryorders();
    }
  }



  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.mypositionorders();
    this.mycurrentorders();


    this.ApiService.getOrderAlert().subscribe((value: any) => {
      this.mypositionorders();
      this.mycurrentorders();
    });
  }

}


