import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'money-manager-frontend';
  accessToken: string | undefined = window.localStorage.accessToken;
  show: boolean = false;
  username: string = "";

  constructor(private router: Router, private services: MoneyManagerService) { }

  handleLogOut() {
    window.localStorage.removeItem("accessToken");
    this.accessToken = undefined;
    this.router.navigate(['/']);
  }

  verify(): void {
    if (this.accessToken) {
      this.show = true;
      this.services.verifyToken(this.accessToken).subscribe((data) => {
        this.username = data.body.data.name
      }, (err) => {
        console.log(err.message);
      })
    }
  }

  onActivate(elementRef: any) {
    if (elementRef.changeNav) {
      elementRef.changeNav.subscribe(() => {
        this.accessToken = window.localStorage.accessToken;
      })
    }
    this.verify();
  }

  ngOnInit(): void {
    this.verify();
  }

}
