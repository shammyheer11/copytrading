import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BybitService } from 'src/app/core/service/bybit.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
 signupForm: FormGroup = new FormGroup({});
 public loading : boolean = true;
 public submitted : boolean = false;
 public currentUser : any;
 public referralCode : any = '';
 constructor( 
  private router: ActivatedRoute,
    private fb: FormBuilder,  
    private ApiService : BybitService, 
    private route : Router){
      this.router.queryParams.subscribe(params => {
        if(params && params['referralCode']){
          this.referralCode = params['referralCode'];
        }else{
          this.referralCode = '';
        }
      });

 }

 createForm() {
   this.signupForm = this.fb.group({
    username: ['', [Validators.required, this.lowercaseNoSpaceValidator]],
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     referralCode : [this.referralCode]
   })
 }

 lowercaseNoSpaceValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  const spaceRegex = /\s/; // Regex to match any whitespace character
  if (spaceRegex.test(value)) {
    return { noSpace: true }; // Validation failed for spaces
  }
  return null; // Validation passed
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
       this.ApiService.userSignUp(params.value)
         .subscribe((res : any) => {
           if (res.success === true) {
            this.ApiService.successSnackBar(res.message);
             this.route.navigate(['/login']);
           }else{
            this.ApiService.warningSnackBar(res.message);
           }
         });
     } 
   }



   get f() { 
    return this.signupForm.controls; 
  }




 ngOnInit() {
   this.createForm();
   let data :any = localStorage.getItem('currentUser')
   this.currentUser = JSON.parse(data);
   if(this.currentUser){
     // this.router.navigate(['index']);
   }
   this.loading = false;
 }

}
