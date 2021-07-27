import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AddExpenditure } from 'src/app/Models';
import { MoneyManagerService } from 'src/app/Services/money-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css']
})
export class ExpendituresComponent implements OnInit {
  @Input() change = true;
  dataSource: AddExpenditure[] = [];
  show: boolean = false;
  displayedColumns: string[] = ['amount', 'description', 'division', 'category', 'date'];


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

  Expenditures = () => {
    this.show = true;
    this.services.getExpense({
      from: '0',
      to: '0',
      division: '0',
      category: '0',
    }).subscribe((data) => {
      this.show = false;
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
          division: data.body.data[i].division,
          category: data.body.data[i].category,
          date
        })

      }
      this.dataSource = [...this.dataSource];
      console.log(this.dataSource)

    }, (err) => {
      this.show = false;
      this.openSnackBar(err.error.message, false);

    })
  }


  ngOnInit(): void {
    this.Expenditures();

  }
  ngOnChanges(changes: SimpleChanges) {
    this.Expenditures();
  }

}
