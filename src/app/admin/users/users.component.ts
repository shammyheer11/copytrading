import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public users: any;
  public userModal: boolean = false;
  public userRole: string = 'user';
  public userID: any;
  public editUser: boolean = false;
  public currentUser: any;
  public submitted: boolean = false;

  editUserForm: FormGroup = new FormGroup({});
  constructor(
    private route: Router,
    private ApiService: BybitService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {

  }

  getUsers() {
    this.ApiService.getUsersList()
      .subscribe((res: any) => {
        if (res && res.data) {
          this.users = res.data;
        } else {
          this.ApiService.warningSnackBar(res.message);
        }
      });
  }

  deleteUser(items: any) {
    console.log(items);
    this.ApiService.deleteUser(items._id).subscribe((res: any) => {
      if (res && res.success == true) {
        this.ApiService.successSnackBar('User delete succesfully');
        this.getUsers();
      } else {
        this.ApiService.warningSnackBar('User not delete');
      }
    });
  }



  createForm() {
    this.editUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      userId: ['', [Validators.required]],
    })
  }

  /**
  * On Login form submit
  * 
  * @param valid 
  * @param value 
  */
  onSubmit(params: { valid: boolean, value: any }) {
    this.submitted = true;
    if (params.valid) {
      this.ApiService.editUserAccount(params.value)
        .subscribe((res: any) => {
          if (res.success === true) {
            this.editUser = false;
            this.ApiService.successSnackBar('User edit successfully');
            this.getUsers();
          } else {
            this.ApiService.warningSnackBar('User not edit');
          }
        });
    }
  }





  cancelEditDialog() {
    this.editUser = false;
  }



  editUsers(items: any) {
    this.editUser = true;
    this.currentUser = items;
    this.createForm();
    this.editUserForm.controls['email'].setValue(items.email);
    this.editUserForm.controls['userId'].setValue(items._id);
  }



  get f() {
    return this.editUserForm.controls;
  }


  updateRole(item: any) {
    this.userID = item._id;
    this.userRole = item.role;
    this.userModal = true;
  }

  cancelDialog() {
    this.userRole = 'user';
    this.userModal = false;
  }

  confirmDialog() {
    let data: any = {
      userId: this.userID,
      role: this.userRole
    };

    this.ApiService.changeUserRole(data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.ApiService.successSnackBar('User role updated');
          this.getUsers();
          this.userModal = false;
        } else {
          this.ApiService.warningSnackBar('User role note updated');
          this.userModal = false;
        }
      });
  }


  ngOnInit() {
    this.getUsers();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

}
