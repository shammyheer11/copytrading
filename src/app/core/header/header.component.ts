import { Component } from '@angular/core';
import { BybitService } from '../service/bybit.service';
// import { BybitApiService } from 'bybit-api-angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser : any;
  constructor(private bybitApi : BybitService){
    
  }

  checkUser(){
    let data :any = localStorage.getItem('user');
    if(data){
      this.currentUser = JSON.parse(data);
    }
   

  }



 
  

  ngOnInit() {
    this.checkUser();
  }








}
