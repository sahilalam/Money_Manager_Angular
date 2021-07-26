import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Pages/Register/register/register.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { RegisterUserComponent } from './Pages/RegisterUser/register-user/register-user.component';
import { HomeComponent } from './Pages/Home/home/home.component';

const home = (window.localStorage.accessToken) ? '/home' : '/register';

const routes: Routes = [

  { path: 'register', component: RegisterComponent, },
  { path: 'register/:encrypted_mail', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
