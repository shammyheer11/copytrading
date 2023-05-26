import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-detail-analytics',
  templateUrl: './detail-analytics.component.html',
  styleUrls: ['./detail-analytics.component.scss']
})
export class DetailAnalyticsComponent {
  public dataSource: any;
  public currentID: any;
  public loading: boolean = true;
  public postionsOrder: any;
  public closeOrder: any;
  public detailModel : boolean = false;
  public modalType :any;
  public orderByUsers : any;
  constructor(
    private ApiService: BybitService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.currentID = this.route.snapshot.paramMap.get('id');
  }


  onChange(data: any) {
    if (data.tab.textLabel == 'Positions') {
      this.spinner.show();
      this.getPostionsOrders();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    } else if (data.tab.textLabel == 'Closed Order') {
      this.spinner.show();
      this.getClosedOrders();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }
  }

  async getPostionsOrders() {
    this.ApiService.getMainTradersPostion(this.currentID)
      .subscribe((res: any) => {
        if (res && res.data && res.data.length > 0) {
          this.postionsOrder = res.data.filter((obj: any) => obj.hasOwnProperty('positionStatus') && obj.size != "0");
          if (this.postionsOrder.length == 0) {
            this.postionsOrder = [];
          }
        } else {
          this.postionsOrder = [];
        }
      });
  }

  getClosedOrders() {
    this.ApiService.getMainTradersClose(this.currentID)
      .subscribe((res: any) => {
        if (res && res.data && res.data.length > 0) {
          this.closeOrder = res.data;
        } else {
          this.closeOrder = [];
        }
      });
  }


  getDetailsList(items: any, type : boolean){
    this.spinner.show();
    this.modalType = type;
    let data = {
      "orderId":items.orderId,
      "strategies":this.currentID,
      "position":type
  }
    this.ApiService.getSubscriberlist(data).subscribe((res : any)=>{
      if(res && res.data && res.data.length > 0){
        console.log(res);
        this.orderByUsers = res.data;
        this.detailModel = true;
      }else{
        this.orderByUsers = [];
      }
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  closeUserModal(){
    this.detailModel = false;
    this.orderByUsers = [];
  }


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.getPostionsOrders();
    this.loading = false;
  }
}
