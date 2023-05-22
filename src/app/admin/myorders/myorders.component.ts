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
  public position: any;
  public currentOrder: any;
  public orderHistory: any;
  public cancelOrderModal: boolean = false;
  public editOrderModal: boolean = false;
  public cancelOrderData: any;
  public actionorderType: any;
  public editorderData: any;
  public takeProfit: any;
  public stopLoss: any;

  constructor(
    private ApiService: BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  mycurrentorders() {
    this.ApiService.getcurrentOrderList()
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
        }
      });
  }

  myhistoryorders() {
    this.ApiService.gethistoryOrderList()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.orderHistory = res.data;
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


  modalCancelOrder(item: any, type: string) {
    this.cancelOrderModal = true;
    this.actionorderType = type;
    this.cancelOrderData = {
      "orderId": item.orderId,
      "strategies": item.strategies,
    };
  }

  cancelOrder() {
    this.ApiService.cancelOrder(this.cancelOrderData)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.ApiService.successSnackBar('Cancel Order sucessfully');
          this.orderHistory = res.data;
          this.cancelOrderModal = false;
        } else {
          this.cancelOrderModal = false;
          this.ApiService.warningSnackBar('Order Not cancel');
        }
      });
  }


  editTPSLModal(data: any, type: string) {
    this.editOrderModal = true;
    this.actionorderType = type;
    this.editorderData = data;
    this.takeProfit = this.editorderData.takeProfit;
    this.stopLoss = this.editorderData.stopLoss;
  }

  UpdateTPSL() {
    if (this.editorderData.side == 'Buy') {
      if (this.takeProfit < this.editorderData.lastPriceOnCreated || this.stopLoss > this.editorderData.lastPriceOnCreated) {
        this.ApiService.warningSnackBar('Takeprofit should be greater and stop loss should be less then base price');
        this.editOrderModal = false;
        return;
      } else {
        let data = {
          "orderId": this.editorderData.orderId,
          "strategies": this.editorderData.strategies,
          "stopLoss": this.stopLoss.toString(),
          "takeProfit": this.takeProfit.toString()
        }
        this.ApiService.editOrder(data).subscribe((res: any) => {
          if (res) {
            this.editOrderModal = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
            console.log(res);
          }
        });
        
      }
    } else {
      if (this.takeProfit > this.editorderData.lastPriceOnCreated || this.stopLoss < this.editorderData.lastPriceOnCreated) {
        this.ApiService.warningSnackBar('Takeprofit should be less and stoploss should be greater then base price');
        this.editOrderModal = false;
        return;
      } else {
        let data = {
          "orderId": this.editorderData.orderId,
          "strategies": this.editorderData.strategies,
          "stopLoss": this.stopLoss.toString(),
          "takeProfit": this.takeProfit.toString()
        }
        this.ApiService.editOrder(data).subscribe((res: any) => {
          if (res) {
            this.editOrderModal = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
            console.log(res);
          }
        });
        
      }
    }


  }



  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.mypositionorders();


    this.ApiService.getOrderAlert().subscribe((value: any) => {
      this.mypositionorders();
    });
  }

}
