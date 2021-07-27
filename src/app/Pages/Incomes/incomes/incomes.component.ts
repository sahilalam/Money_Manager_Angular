import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AddIncome } from 'src/app/Models';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  @Input() change = true;
  dataSource: AddIncome[] = [];
  show: boolean = false;
  displayedColumns: string[] = ['amount', 'description', 'date'];


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

  Incomes = () => {
    this.show = true;
    this.services.getIncome(
      {
        from: '0',
        to: '0',
      }
    ).subscribe((data) => {
      console.log(data)
      this.show = false;
      this.dataSource = [];
      for (let i = 0; i < data.body.data.length; i++) {
        let date: any = new Date(data.body.data[i].date);
        date = date.getTime()
        date = new Date(date);
        date.setHours(date.getHours() - 5);
        date.setMinutes(date.getMinutes() - 30);
        date = new Date(date);
        date = date.toLocaleString();
        this.dataSource.push({
          amount: data.body.data[i].amount,
          description: data.body.data[i].description,
          date
        })

      }
      this.dataSource = [...this.dataSource];


    }, (err) => {
      this.show = false;
      this.openSnackBar(err.error.message, false);

    })
  }


  ngOnInit(): void {
    this.Incomes();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.Incomes();
  }

}
