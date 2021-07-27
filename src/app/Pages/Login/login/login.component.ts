import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() changeNav: EventEmitter<any> = new EventEmitter();

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

  login(model: NgForm): void {
    if (model.form.valid) {
      this.show = true;
      const username = model.value.username;
      const password = model.value.password;
      this.services.login(username, password).subscribe((data) => {
        this.show = false;
        window.localStorage.accessToken = data.body.access_token;
        this.changeNav.emit();
        this.router.navigate(['/home'])
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
