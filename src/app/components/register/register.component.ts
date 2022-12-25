import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form: FormGroup = new FormGroup({});


  constructor(
    private _bannerService: BannerService, 
    private _authService: AuthenticationService, 
    private router: Router, private fb: FormBuilder) {
      this._bannerService.toggleBanned(true);


      this.form = fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirm_password: ['', [Validators.required]]      
      }, { 
        validator: this.confirmedValidator('password', 'confirm_password')
      })
   }

   confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }

}
