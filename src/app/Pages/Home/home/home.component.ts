import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  incomeChanged = true;
  expenditureChanged = true;
  accessToken: string | undefined = window.localStorage.accessToken;

  constructor() {
  }

  refreshIncomes = () => {
    console.log("income added");
    this.incomeChanged = !this.incomeChanged;
  }

  refreshExpenditures = () => {
    console.log("expense added");
    this.expenditureChanged = !this.expenditureChanged;
  }

  ngOnInit(): void {
  }

}
