import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public dataSource : any;
  constructor(
    private ApiService: BybitService,
    private spinner: NgxSpinnerService
  ) { }

  async getAccoundInfo() {
    await this.ApiService.getAccountDetails()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.dataSource = res.data;
        }
      });
  }

  ngOnInit() {
    this.getAccoundInfo();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }
}
