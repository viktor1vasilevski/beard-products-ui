import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { BalmsComponent } from './pages/balms/balms.component';
import { HomeComponent } from './pages/home/home.component';
import { OilsComponent } from './pages/oils/oils.component';
import { SoapsComponent } from './pages/soaps/soaps.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'soaps', component: SoapsComponent },
  { path: 'balms', component: BalmsComponent },
  { path: 'oils', component: OilsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
