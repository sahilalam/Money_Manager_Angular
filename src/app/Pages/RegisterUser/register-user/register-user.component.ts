import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  show: boolean = false;
  encrypted_mail: string = "";
  submit: boolean = false;
  confirmedPassword: boolean = false;
  password: string = "";

  constructor(private route: ActivatedRoute, private services: MoneyManagerService, private _snackBar: MatSnackBar, private router: Router) {
    this.route.params.subscribe(params => {
      this.encrypted_mail = params.encrypted_mail
    });
  }

  handleConfirmPassword(model: NgForm) {
    this.submit = false;
    this.password = "";
    if (model.value.password.length >= 8) {
      this.confirmedPassword = true;
    }
    else {
      this.confirmedPassword = false;
    }
  }

  handleSubmit(model: NgForm) {
    if (model.value.password === model.value.confirmedPassword) {
      this.submit = true;
    }
    else {
      this.submit = false;
    }
  }

  openSnackBar(message: string, successfull: boolean) {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [
        (successfull) ? "success" : "error"
      ]
    });
  }

  registerUser(model: NgForm): void {
    if (model.form.valid) {
      this.show = true;
      const username = model.value.username;
      const password = model.value.password;
      this.services.registerUser(username, password, this.encrypted_mail).subscribe((data) => {
        this.show = false;
        this.openSnackBar(data.body.message, true);
      }, (err) => {
        this.show = false;
        this.openSnackBar(err.error.message, false);
      })
    }
  }
  ngOnInit(): void {
    if (window.localStorage.accessToken) {
      this.router.navigate(['/dashboard']);
    }
  }

}
