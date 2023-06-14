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
  public btnloading: boolean = false;
  /** Limit close*/
  public limitModel: any = false;
  public limitPrice: any;
  public limitQty: any;
  public currentOrder: any;
  public qtyPercent: any;

  /** Market close */
  public marketModel: boolean = false;


  public takeProfit: any;
  public stopLoss: any;
  public editOrderModal: boolean = false;
  public getWalletData: any;

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

    console.log(data);
    let items = {
      strategyId: data.strategies,
      symbol: data.symbol
    }
    this.ApiService.checkleverage(items).subscribe((res: any) => {
      if (res && res.success == true) {
        this.getWalletData = res;
      }
    });


  }


  calculateStopLoss() {

    // let newwallet : any = ((this.WalletBalance * this.positionSize) / 100).toFixed(3);
    // console.log(newwallet + 'New wallet');
    // let btcAmount :any = ((newwallet * this.currentOrder.leverage) / this.CurrentCoinPrice).toFixed(5);

    // console.log(btcAmount + 'Coin amount');

    // let stopLossBTC : any = ((newwallet * this.currentOrder.leverage) / this.stopLoss).toFixed(6);
    // console.log(stopLossBTC + 'stop LossBTC');

    // let lossBTC : any;

    // if (this.currentOrder.side == 'Buy') {
    //   lossBTC = btcAmount - stopLossBTC;
    // }else{
    //   lossBTC = parseFloat(stopLossBTC) - parseFloat(btcAmount);
    // }
    // this.roi = ((lossBTC * this.CurrentCoinPrice / newwallet) * 100).toFixed(4);
  }





  /**
   * Update order on confirm
   * @returns 
   */
  UpdateTPSL() {
    this.btnloading = true;
    let data = {
      "strategies": this.currentOrder.strategies,
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
        this.btnloading = false;
        return;
      } else {

        this.ApiService.editpostionOrder(data).subscribe((res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.ApiService.onPlaceOrder(true);
            this.editOrderModal = false;
            this.btnloading = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
          } else {
            this.btnloading = false;
            this.ApiService.warningSnackBar('Order not Update');
          }
        });

      }
    } else {
      if (this.takeProfit > this.currentOrder.avgPrice || this.stopLoss < this.currentOrder.avgPrice) {
        this.ApiService.warningSnackBar('Takeprofit should be less and stoploss should be greater then base price');
        this.editOrderModal = false;
        this.btnloading = false;
        return;
      } else {
        this.ApiService.editOrder(data).subscribe((res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.ApiService.onPlaceOrder(true);
            this.editOrderModal = false;
            this.btnloading = false;
            this.ApiService.successSnackBar('Order Update sucessfully');
          } else {
            this.btnloading = false;
            this.ApiService.warningSnackBar('Order not Update');
          }
        });

      }
    }

    setTimeout(() => {
      this.btnloading = false;
    }, 5000);

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
    }
  }




  closeWithLimit() {
    this.btnloading = true;
    if (this.limitQty) {
      let data = {
        "orderId": this.currentOrder.orderId,
        "strategies": this.currentOrder.strategies,
        "side": this.currentOrder.side,
        "orderType": 'Limit',
        "price": this.limitPrice.toString(),
        "qty": this.qtyPercent,
        "symbol": this.currentOrder.symbol,
        "ordercreatedTime": this.currentOrder.created_at
      }
      this.ApiService.closePostionOrder(data).subscribe((res: any) => {
        // if (res && res.data && res.data.length > 0) { 
        if (res && res.success == true) {
          this.btnloading = false;
          this.ApiService.onPlaceOrder(true);
          this.ApiService.successSnackBar('order Executed sucessfully');
          this.closeLimitModel();
        } else {
          this.btnloading = false;
          this.ApiService.warningSnackBar('Order Not executed');
          this.closeLimitModel();
        }
      });
    }
    setTimeout(() => {
      this.btnloading = false;
    }, 5000);
  }

  /** Limit Close End  */

  /** Market Close start  */

  marketClose(item: any) {
    this.currentOrder = item;
    this.marketModel = true;
    this.limitQty = item.size;
  }


  closeWithMarket() {
    this.btnloading = true;
    if (this.limitQty) {
      let data = {
        "orderId": this.currentOrder.orderId,
        "strategies": this.currentOrder.strategies,
        "side": this.currentOrder.side,
        "orderType": 'Market',
        "price": this.currentOrder.markPrice,
        "qty": this.qtyPercent,
        "symbol": this.currentOrder.symbol,
        "ordercreatedTime": this.currentOrder.created_at
      }
      this.ApiService.closePostionOrder(data).subscribe((res: any) => {
        // if (res && res.data && res.data.length > 0) {
        if (res && res.success == true) {
          this.btnloading = false;
          this.ApiService.onPlaceOrder(true);
          this.ApiService.successSnackBar('order Executed sucessfully');
          this.closeMarketModel();
        } else {
          this.btnloading = false;
          this.ApiService.warningSnackBar('Order Not executed');
          this.closeMarketModel();
        }
      });
    }
    setTimeout(() => {
      this.btnloading = false;
    }, 5000);
  }

  closeMarketModel() {
    this.currentOrder = null;
    this.marketModel = false;
    this.limitQty = null;
    this.qtyPercent = null;
  }


  ngOnInit() {

  }
}
