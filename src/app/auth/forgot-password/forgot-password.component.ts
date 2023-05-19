import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup = new FormGroup({});
  public loading : boolean = true;
  public currentUser : any;
  public durationInSeconds = 3;
  public submitted : boolean = false;
  constructor( 
    private fb: FormBuilder ,
    private ApiService : BybitService,
    private route : Router ){
  }

  createForm() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

    /**
   * On Login form submit
   * 
   * @param valid 
   * @param value 
   */
    onSubmit(params: { valid: boolean, value: any }) {
      this.submitted =  true;
      if (params.valid) {
        this.ApiService.forgetPassword(params.value)
         .subscribe((res : any) => {
          console.log(res);
           if (res.success === true) {
            this.ApiService.successSnackBar('Email sent to your Inbox');
            this.route.navigate(['login']);
           }else{
            this.ApiService.warningSnackBar(res.message);
           }
         });
      } 
    }


    get f() { 
      return this.forgotForm.controls; 
    }


  


  ngOnInit() {
    this.createForm();
    this.loading = false;
  }
}
