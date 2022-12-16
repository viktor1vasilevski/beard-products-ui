import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoapsComponent } from './pages/soaps/soaps.component';
import { BalmsComponent } from './pages/balms/balms.component';
import { OilsComponent } from './pages/oils/oils.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { BannerService } from './services/banner.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UserSoapsComponent } from './pages/soaps/user-soaps/user-soaps.component';
import { AdminSoapsComponent } from './pages/soaps/admin-soaps/admin-soaps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteSoapModalComponent } from './components/modals/soap/delete-soap-modal/delete-soap-modal.component';
import { CreateSoapModalComponent } from './components/modals/soap/create-soap-modal/create-soap-modal.component';
import { EditSoapModalComponent } from './components/modals/soap/edit-soap-modal/edit-soap-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CreateBalmModalComponent } from './components/modals/balm/create-balm-modal/create-balm-modal.component';
import { DeleteBalmModalComponent } from './components/modals/balm/delete-balm-modal/delete-balm-modal.component';
import { EditBalmModalComponent } from './components/modals/balm/edit-balm-modal/edit-balm-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    SoapsComponent,
    BalmsComponent,
    OilsComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    SigninComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    UserSoapsComponent,
    AdminSoapsComponent,
    DeleteSoapModalComponent,
    CreateSoapModalComponent,
    EditSoapModalComponent,
    CreateBalmModalComponent,
    DeleteBalmModalComponent,
    EditBalmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    Ng2SmartTableModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [BannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
