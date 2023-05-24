import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss']
})
export class CurrentOrderComponent {
  @Input() currentOrder : any;
  public cancelOrderModal : boolean = false;
  public cancelOrderData : any;
  public editOrderModal : boolean = false;
  public editorderData : any;
  public takeProfit : any;
  public stopLoss : any;
  public selectedValueIndex: any;
  selectedValues: { [key: string]: any } = {};

  constructor(
    private ApiService: BybitService,
    private spinner: NgxSpinnerService
  ) { }


  closeCancelOrder(){
    this.cancelOrderModal = false;
    this.selectedValues[this.selectedValueIndex] = null;
  }

    /** Cancel order show modal */
    onSelectionChange(event:any, item : any, index :any){
      this.selectedValueIndex = index;
      if(event.value && event.value == 'cancelall'){
        this.cancelOrderModal = true;
        this.cancelOrderData = {
          "orderId": item.orderId,
          "strategies": item.strategies,
        };
      }else{
        this.cancelOrderModal = true;
      }
      console.log(event.value);
    }

      /**
   * Cancel order on confirm
   */
  cancelOrder() {
    this.ApiService.cancelOrder(this.cancelOrderData)
      .subscribe((res: any) => {
        if (res && res.data.length > 0) {
          this.ApiService.successSnackBar('Cancel Order sucessfully');
          this.cancelOrderModal = false;
          this.ApiService.onPlaceOrder(true);
          this.closeCancelOrder();
        } else {
          this.cancelOrderModal = false;
          this.ApiService.warningSnackBar('Order Not cancel');
          this.closeCancelOrder();
        }
      });
  }



      /**
   * Edit Modal show
   * @param data 
   * @param type 
   */
  editTPSLModal(data: any, type: string) {
    this.editOrderModal = true;
    this.editorderData = data;
    this.takeProfit = this.editorderData.takeProfit;
    this.stopLoss = this.editorderData.stopLoss;
  }

    /**
   * Update order on confirm
   * @returns 
   */
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
            if (res && res.data.length > 0) {
              this.editOrderModal = false;
              this.ApiService.successSnackBar('Order Update sucessfully');
              this.ApiService.onPlaceOrder(true);
            }else{
              this.ApiService.warningSnackBar('Order not Update');
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
            if (res && res.data.length > 0) {
              this.editOrderModal = false;
              this.ApiService.successSnackBar('Order Update sucessfully');
              this.ApiService.onPlaceOrder(true);
            }else{
              this.ApiService.warningSnackBar('Order not Update');
            }
          });
  
        }
      }
  
  
    }



  ngOnInit() {

  }
}
