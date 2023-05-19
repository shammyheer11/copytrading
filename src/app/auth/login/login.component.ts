import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.lowercaseNoSpaceValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
        this.ApiService.userLogin(params.value)
         .subscribe((res : any) => {
          console.log(res);
           if (res.success === true) {
            localStorage.setItem('user', JSON.stringify(res));
            this.ApiService.successSnackBar('User Logged in succesfully');
            this.route.navigate(['admin']);
           }else{
            this.ApiService.warningSnackBar(res.message);
           }
         });
      } else {
        // this.toastr.error('Invalid Form Values', 'Failed');  
      }
    }


     lowercaseNoSpaceValidator(control: AbstractControl): ValidationErrors | null {
      const value: string = control.value;
      const spaceRegex = /\s/; // Regex to match any whitespace character
      if (spaceRegex.test(value)) {
        return { noSpace: true }; // Validation failed for spaces
      }
      return null; // Validation passed
    }




    get f() { 
      return this.loginForm.controls; 
    }


  


  ngOnInit() {
    this.createForm();
    let data :any = localStorage.getItem('user');
    this.currentUser = JSON.parse(data);
    if(this.currentUser){
      // this.router.navigate(['index']);
    }
    this.loading = false;
  }

}
