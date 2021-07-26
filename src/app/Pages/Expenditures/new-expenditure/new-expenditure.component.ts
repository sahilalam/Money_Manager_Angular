import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select } from './Models';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddExpenditure } from 'src/app/Models';

@Component({
  selector: 'app-new-expenditure',
  templateUrl: './new-expenditure.component.html',
  styleUrls: ['./new-expenditure.component.css']
})
export class NewExpenditureComponent implements OnInit {
  show: boolean = false;
  divisions: Select[] = [
    {
      value: "Office"
    },
    {
      value: "Personal"
    }
  ]
  categories: Select[] = [
    {
      value: "Fuel"
    },
    {
      value: "Medical"
    },
    {
      value: "Movie"
    },
    {
      value: "Food"
    },
    {
      value: "Loan"
    },
    {
      value: "Other"
    },
  ]
  constructor(private services: MoneyManagerService, private _snackBar: MatSnackBar) { }

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

  newExpenditure = (model: NgForm) => {
    if (model.form.valid) {
      this.show = true;
      const params: AddExpenditure = {
        amount: model.value.amount,
        description: model.value.description,
        date: model.value.date,
        category: model.value.category,
        division: model.value.division,
      }

      this.services.addExpense(params).subscribe((data) => {
        this.show = false;
        this.openSnackBar(data.body.message, true)
      }, (err) => {
        this.show = false;
        this.openSnackBar(err.error.message, false);

      })
    }
  }

  ngOnInit(): void {
  }



}
