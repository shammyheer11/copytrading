import { Component } from '@angular/core';
import { BybitService } from '../service/bybit.service';
import { Route, Router } from '@angular/router';
// import { BybitApiService } from 'bybit-api-angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser: any;
  constructor(private bybitApi: BybitService, private route: Router) {

  }

  checkUser() {
    let data: any = localStorage.getItem('user');
    if (data) {
      this.currentUser = JSON.parse(data);
      // this.route.navigate(['/admin'])
    }
  }






  ngOnInit() {
    this.checkUser();
  }








}
