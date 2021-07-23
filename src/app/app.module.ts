import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Pages/Register/register/register.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { RegisterUserComponent } from './Pages/RegisterUser/register-user/register-user.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard/dashboard.component';
import { IncomesComponent } from './Pages/Incomes/incomes/incomes.component';
import { ExpendituresComponent } from './Pages/Expenditures/expenditures/expenditures.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MoneyManagerService } from './Services/money-manager.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegisterUserComponent,
    DashboardComponent,
    IncomesComponent,
    ExpendituresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [MoneyManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
