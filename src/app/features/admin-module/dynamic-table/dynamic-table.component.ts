import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  imports: [FormsModule, CommonModule]
})
export class DynamicTableComponent {
  rows: number = 2; // Initial number of rows
  cols: number = 3; // Initial number of columns
  tableData: any = {
    headers: ["name", "quantity", "price"],
    values: []
  };
  foodItemId: number = 2;

  addRow() {
    this.rows++;
    this.tableData.values.push(["", "", ""]); // Add an empty row to tableData
  }

  addColumn() {
    this.cols++;
    for (let row of this.tableData.values) {
      row.push(""); // Add an empty cell to each row
    }
    this.tableData.headers.push(""); // Add an empty header for the new column
  }

  submitData() {
    console.log(this.tableData); // Display data in console (you can send it to a server here)
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
