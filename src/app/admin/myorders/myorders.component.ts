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

  myorders() {
    this.ApiService.getOrderList()
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.data) {
          this.position = res.data;
        }
      });
  }


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.myorders();
  }

}
