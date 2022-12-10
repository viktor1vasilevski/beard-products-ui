import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //name = '';

  isLoginMode = false;

  public user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  constructor(
    private _bannerService: BannerService, 
    private _authService: AuthenticationService, 
    private router: Router) {
      //this._bannerService.toggleBanned(true);
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (this.isLoginMode) {
      // ... ovde kje treba da se odlogira prvo pa posle da se logira
    } else {

    }

    this._authService.signup(username, email, password, confirmPassword).subscribe((res: any) => {
 
      this.router.navigate(['/soaps']);
    }, error => {
  
    });

    form.reset();
      
    }

}
