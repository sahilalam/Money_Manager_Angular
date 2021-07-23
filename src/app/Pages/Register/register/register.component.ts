import { Component, OnInit } from '@angular/core';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  show: boolean = false;
  constructor(private services: MoneyManagerService, private _snackBar: MatSnackBar, private router: Router) { }

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

  register(model: NgForm): void {
    console.log(model)
    if (model.form.valid) {
      this.show = true;
      const email = model.form.value.email;
      this.services.registerMail(email).subscribe((data) => {
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
