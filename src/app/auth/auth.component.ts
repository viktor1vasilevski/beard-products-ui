import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BannerService } from "../services/banner.service";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
     isLoginMode = false;
     //isLoading = false; spinner data
     error: string = "";

    constructor(private _bannerService: BannerService, private _authService: AuthService) {
        this._bannerService.toggleBanned(true);
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode; 
    }

    onSubmit(form: NgForm) {
        if(!form.valid){
            return;
        }
        const username = form.value.username;
        const password = form.value.password;

        //this.isLoading = true;

        if (this.isLoginMode) {
            //...
        } else {
            this._authService.login(username, password).subscribe((res: any) => {
 
                //this.isLoading = false;
            }, errorMessage => {  
                            
                this.error = 'An Error occured';
                //this.isLoading = false;     
            });
        }

        

        form.reset();
        
    }

}