import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-positions-order',
  templateUrl: './positions-order.component.html',
  styleUrls: ['./positions-order.component.scss']
})
export class PositionsOrderComponent {
  @Input() position: any;

  /** Limit close*/
  public limitModel: any = false;
  public limitPrice: any;
  public limitQty: any;
  public currentOrder: any;
  public qtyPercent : any;

  /** Market close */
  public marketModel: boolean = false;


  public takeProfit: any;
  public stopLoss: any;
  public editOrderModal: boolean = false;

  constructor(
    private ApiService: BybitService,
    private spinner: NgxSpinnerService
  ) { }



  /**
* Edit Modal show
* @param data 
* @param type 
*/
  editTPSLModal(data: any, type: string) {
    this.editOrderModal = true;
    this.currentOrder = data;
    this.takeProfit = this.currentOrder.takeProfit;
    this.stopLoss = this.currentOrder.stopLoss;
  }

  /**
   * Update order on confirm
   * @returns 
   */
  UpdateTPSL() {
    let data = {
      "strategies" : this.currentOrder.strategies,
      "category": this.currentOrder.type,
      "symbol": this.currentOrder.symbol,
      "orderId": this.currentOrder.orderId,
      "takeProfit": this.takeProfit.toString(),
      "stopLoss": this.stopLoss.toString(),
      "positionIdx": this.currentOrder.positionIdx

    }
    if (this.currentOrder.side == 'Buy') {
     
      if (this.takeProfit < this.currentOrder.avgPrice || this.stopLoss > this.currentOrder.avgPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be greater and stop loss should be less then base price');
        this.editOrderModal = false;
        return;
      } else {

        this.ApiService.editpostionOrder(data).subscribe((res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.ApiService.onPlaceOrder(true);
            this.editOrderModal = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
          } else {
            this.ApiService.warningSnackBar('Order not Update');
          }
        });

      }
    } else {
      if (this.takeProfit > this.currentOrder.avgPrice || this.stopLoss < this.currentOrder.avgPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be less and stoploss should be greater then base price');
        this.editOrderModal = false;
        return;
      } else {
        this.ApiService.editOrder(data).subscribe((res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.ApiService.onPlaceOrder(true);
            this.editOrderModal = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
          } else {
            this.ApiService.warningSnackBar('Order not Update');
          }
        });

      }
    }


  }

  /** Limit Close start  */
  closeLimitModel() {
    this.limitModel = false;
    this.currentOrder = null;
    this.limitPrice = null
    this.limitQty = null;
    this.qtyPercent = null;
  }

  limitClose(item: any) {
    this.currentOrder = item;
    this.limitModel = true;
    this.limitPrice = item.markPrice
    this.limitQty = item.size;
  }


  calcLimit(item: any) {
    if (this.currentOrder) {
      this.limitQty = this.currentOrder.size * item / 100;
      this.limitQty = this.limitQty.toFixed(3);
      this.qtyPercent = item;
      console.log(this.qtyPercent)
    }
  }




  closeWithLimit() {
    if (this.limitQty) {
        let data = {
            "orderId": this.currentOrder.orderId,
            "strategies":this.currentOrder.strategies,
            "side": this.currentOrder.side,
            "orderType": 'Limit',
            "price": this.limitPrice.toString(),
            "qty": this.qtyPercent,
            "symbol" : this.currentOrder.symbol
        }
        this.ApiService.closePostionOrder(data).subscribe((res : any)=>{
          if (res && res.data && res.data.length > 0) { 
            this.ApiService.onPlaceOrder(true);
            this.ApiService.successSnackBar('order Executed sucessfully');
            this.closeLimitModel();
          }else{
            this.ApiService.warningSnackBar('Order Not executed');
          }
        });
      
    }
  }

  /** Limit Close End  */

  /** Market Close start  */

  marketClose(item: any) {
    this.currentOrder = item;
    this.marketModel = true;
    this.limitQty = item.size;
  }

 
  closeWithMarket() {
    if (this.limitQty) {
        let data = {
            "orderId": this.currentOrder.orderId,
            "strategies":this.currentOrder.strategies,
            "side": this.currentOrder.side,
            "orderType": 'Market',
            "price": this.currentOrder.markPrice,
            "qty": this.qtyPercent,
            "symbol" : this.currentOrder.symbol
        }
        this.ApiService.closePostionOrder(data).subscribe((res : any)=>{
          if (res && res.data && res.data.length > 0) { 
            this.ApiService.onPlaceOrder(true);
            this.ApiService.successSnackBar('order Executed sucessfully');
            this.closeMarketModel();
          }else{
            this.ApiService.warningSnackBar('Order Not executed');
          }
        });
      
    }
  }

  closeMarketModel() {
    this.currentOrder = null;
    this.marketModel = false;
    this.limitQty = null;
    this.qtyPercent = null;
  }


  ngOnInit() {
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1500);
    console.log(this.position);
  }
}
