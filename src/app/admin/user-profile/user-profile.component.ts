import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public currentUser:any;
  public loading : boolean = true;
  public reffralData : any;
  constructor(
    private route : Router, 
    private ApiService : BybitService,
    private spinner : NgxSpinnerService,
    private clipboard: Clipboard
  ){

  }

  getUserDetails(){
    this.ApiService.getUsersProfile().subscribe((res : any)=>{
      if(res){
        this.reffralData = res;
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }


  copyText(text : any){
    this.clipboard.copy(text);
    this.ApiService.successSnackBar('Referral code copied');
  }

  ngOnInit(){
    this.getUserDetails();
    let data: any = localStorage.getItem('user');
    if (data) { 
      this.currentUser = JSON.parse(data);
     
    }
  }
}



