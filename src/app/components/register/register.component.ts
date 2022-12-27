import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({});
  public showUsernameErrors: boolean = false;
  public showEmailErrors: boolean = false;
  public showPasswordErrors: boolean = false;
  public showConfirmPasswordErrors: boolean = false;
  values = '';

  constructor(
    private _bannerService: BannerService, 
    private _authService: AuthenticationService, 
    private router: Router, private fb: FormBuilder, private _toastr: ToastrService) {
      this._bannerService.toggleBanned(true);


      this.form = this.fb.group({

        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]],
        confirm_password: ['', [Validators.required]]      
      }, { 
        validator: this.confirmedValidator('password', 'confirm_password')
      })
   }

  onInputUsername(event: any) {
    event.target.value.length != 0 ? this.showUsernameErrors = true : this.showUsernameErrors = false 
  }
  onInputEmail(event: any) {
    event.target.value.length != 0 ? this.showEmailErrors = true : this.showEmailErrors = false 
  }
  onInputPassword(event: any) {
    event.target.value.length != 0 ? this.showPasswordErrors = true : this.showPasswordErrors = false 
  }
  onInputConfPassword(event: any) {
    event.target.value.length != 0 ? this.showConfirmPasswordErrors = true : this.showConfirmPasswordErrors = false 
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
    let username = this.form.get('username')?.value;
    let email = this.form.get('email')?.value;
    let password = this.form.get('password')?.value;
    let confPassword = this.form.get('confirm_password')?.value;
    this._authService.signup(username, email, password, confPassword).subscribe((res: any) => {
      this._toastr.success('User successfully created!');
      this.router.navigate(['/signin']);
    }, (err: any) => {
      this._toastr.error('User unsuccessfully created!');
    })
  }

}
