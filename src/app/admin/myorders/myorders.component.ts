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
  public position : any;
  public currentOrder : any;
  public orderHistory : any;

  constructor(
    private ApiService: BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  async mycurrentorders() {
    await this.ApiService.getcurrentOrderList()
      .subscribe((res: any) => {
        console.log(res.data);
        if (res && res.data) {
          this.currentOrder = res.data;
        }
      });
  }

  mypositionorders() {
    this.ApiService.getpositionOrderList()
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.data) {
          this.position = res.data;
          // this.position = this.position.find((c :any) => c.symbol === coin);
        }
      });
  }

  myhistoryorders() {
    this.ApiService.gethistoryOrderList()
      .subscribe((res: any) => {
        // console.log(res);
        if (res && res.data) {
          this.orderHistory = res.data;
        }
      });
  }

  onChange(data : any){
    console.log(data.tab.textLabel);
    if(data.tab.textLabel == 'Positions'){
      this.mypositionorders();
    }else if(data.tab.textLabel == 'Current Orders'){
      this.mycurrentorders();
    }else if(data.tab.textLabel == 'Order History'){
      this.myhistoryorders();
    }
  }

  cancelOrder(item : any){
    let data ={
      "orderId":item.orderId,
      "strategies":item.strategies
    };

    this.ApiService.cancelOrder(data)
    .subscribe((res: any) => {
      if (res && res.data) {
        this.ApiService.successSnackBar('Cancel Order sucessfully');
        this.orderHistory = res.data;
      }else{
        this.ApiService.warningSnackBar('Order Not cancel');
      }
    });

  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.mypositionorders();
  }

}
