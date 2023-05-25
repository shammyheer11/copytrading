import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  public dataSource: any;
  constructor(
    private ApiService: BybitService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }



    /**
   * Get my strategy List
   */
    myStrategies() {
      this.ApiService.getMyStrategies()
        .subscribe((res: any) => {
          if (res && res.data) {
            this.dataSource = res.data;
          }
        });
    }




    ngOnInit() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 1500);
      this.myStrategies();
    }

}
