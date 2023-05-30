import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public durationInSeconds = 3;
  public users : any ;
  public userModal : boolean = false;
  public userRole : string = 'user';
  public userID : any;
  constructor(
    private route : Router, 
    private ApiService : BybitService,
    private spinner : NgxSpinnerService
  ){

  }

  getUsers(){
    this.ApiService.getUsersList()
    .subscribe((res : any) => {
      if(res && res.data){
          this.users = res.data;
      }else{
        this.ApiService.warningSnackBar(res.message);
      }
    });
  }




  updateRole(item : any){
    this.userID = item._id;
    this.userRole = item.role;
    this.userModal = true;
  }

  cancelDialog(){
    this.userRole = 'user';
    this.userModal = false;

  }

  confirmDialog(){
    let data :any = {
      userId : this.userID,
      role : this.userRole
    };

    this.ApiService.changeUserRole(data)
    .subscribe((res : any) => {
      if(res && res.data){
        this.ApiService.successSnackBar('User role updated');
        this.getUsers();
        this.userModal = false;
      }else{
        this.ApiService.warningSnackBar('User role note updated');
        this.userModal = false;
      }
    });
  }


  ngOnInit(){
    this.getUsers();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

}
