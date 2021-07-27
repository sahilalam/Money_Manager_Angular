import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddIncome } from 'src/app/Models';

@Component({
  selector: 'app-new-income',
  templateUrl: './new-income.component.html',
  styleUrls: ['./new-income.component.css']
})
export class NewIncomeComponent implements OnInit {
  @Output() refreshIncomeData: EventEmitter<any> = new EventEmitter();
  show: boolean = false;
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

  newIncome = (model: NgForm) => {
    if (model.form.valid) {
      this.show = true;
      const params: AddIncome = {
        amount: model.value.amount,
        description: model.value.description,
        date: model.value.date,
      }

      this.services.addIncome(params).subscribe((data) => {
        this.show = false;
        this.refreshIncomeData.emit();
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
