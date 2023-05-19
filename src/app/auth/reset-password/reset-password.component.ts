import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup = new FormGroup({});
  public loading : boolean = true;
  public submitted : boolean = false;
  public token : any = 'DFGDF';
  constructor( 
    private fb: FormBuilder,
    private ApiService : BybitService,
    private route : Router ){
      this.createForm();
  }

  createForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator })
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['password_confirmation'].value;

    if (password !== confirmPassword) {
      form.controls['password_confirmation'].setErrors({ passwordMismatch: true });
    } else {
      form.controls['password_confirmation'].setErrors(null);
    }
  }

    /**
   * On Login form submit
   * 
   * @param valid 
   * @param value 
   */
    onSubmit(params: { valid: boolean, value: any }) {
      this.submitted =  true;
      console.log(params.value);
      if (params.valid) {
        this.ApiService.forgetPassword(params.value)
         .subscribe((res : any) => {
          console.log(res);
          //  if (res.success === true) {
          //   this.ApiService.successSnackBar('Email sent to your Inbox');
          //   this.route.navigate(['login']);
          //  }else{
          //   this.ApiService.warningSnackBar(res.message);
          //  }
         });
      } 
    }


    get f() { 
      return this.resetForm.controls; 
    }


  


  ngOnInit() {
    this.loading = false;
  }
}
