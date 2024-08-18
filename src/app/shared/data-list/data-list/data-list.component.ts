import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ColumnModel } from 'src/app/model/columnsModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx'
import * as saveAs from 'file-saver'
import { HttpClient } from '@angular/common/http';
import { TableDataResponse } from 'src/app/model/TableDataResponse';
import Handsontable from 'handsontable';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnChanges, OnInit {
  // @HostBinding('class') class = 'h-100';
  id = 'hotInstance';
  html = Handsontable.renderers.HtmlRenderer

  @Input() data = [];
  @Input() excelColumns = []
  @Input() columns: ColumnModel[] = []
  @Output() actionEdit: EventEmitter<object> = new EventEmitter();
  @Output() actionDelete: EventEmitter<object> = new EventEmitter();
  @Output() actionAdd: EventEmitter<object> = new EventEmitter();
  @Output() actionManageTable: EventEmitter<object> = new EventEmitter();
  @Output() getSelectedRow: EventEmitter<object> = new EventEmitter();
  @Output() rowChangeEmit: EventEmitter<object> = new EventEmitter();

  @Input() dropDownMenu = true
  @Input() searchfilter = true
  @Input() exportsRequired = false
  /**
   * please pass both param and remote Url in case of server fetching
   */
  @Input() param: any;
  @Input() remoteUrl: any;
  totalRecords = 0
  rowForm: FormGroup | any

  constructor(
    private fb: FormBuilder,
    private render: Renderer2,
    private http: HttpClient,
    private ref: ChangeDetectorRef
  ) {
    this.rowForm = this.fb.group({
      row: [this.model.length],
      search: ['']
    })
  }
  ngOnInit(): void {
    if (this.param && this.remoteUrl) {
      this.fetchRemoteData()
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['param']?.firstChange == false) {
      console.log(this.param)
      this.fetchRemoteData()
    }
  }
  model = {
    "draw": 1,
    "start": 0,
    "length": 20,
    "search": {
      "value": "",
      "regex": ""
    }
  }
  onRowPerPageChange() {
    this.model = {
      "draw": 1,
      "start": 0,
      "length": 20,
      "search": {
        "value": "",
        "regex": ""
      }
    }
    this.model.length = parseInt(this.rowForm.get('row').value)
    if (this.remoteUrl) {
      this.fetchRemoteData()
      return
    }
    this.rowChangeEmit.emit(this.model)
  }
  onSerachhange() {
    this.model.search.value = this.rowForm.get('search').value
    if (this.remoteUrl) {
      this.fetchRemoteData()
    }
  }

  actionRenderee() {
    let that = this
    let column:any = that.columns.find(el => el.keyValue == 'action')
    return (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) => {

      if (column['buttons'] && td.childNodes.length === 0) {
        if (column.buttons.some((el:any) => el == 'edit')) {
          const editButton = document.createElement('button');

          editButton.innerText = 'Edit ';
          editButton.className = 'btn btn-sm btn-outline-primary m-1'
          const editIcon = document.createElement('i');
          editIcon.className = 'ic-edit  text-primary'
          editButton.appendChild(editIcon)
          editButton.addEventListener('click', event => {
            event.preventDefault();
            that.onEditClick(row)
          });
          td.appendChild(editButton);
        }
        if (column.buttons.some((el:any) => el == 'delete')) {
          const deletebutton = document.createElement('button');
          deletebutton.innerText = 'Delete ';
          deletebutton.className = 'btn btn-sm  btn-outline-danger m-1'
          const deleteIcon = document.createElement('i');
          deleteIcon.className = 'ic-delete text-danger'
          deletebutton.appendChild(deleteIcon)
          deletebutton.addEventListener('click', event => {
            event.preventDefault();
            // console.log(row)
            that.onDeleteClick(row)
          });
          td.appendChild(deletebutton);
        }
        if (column.buttons.some((el:any) => el == 'add')) {
          const addbutton = document.createElement('button');
          addbutton.innerText = 'Add ';
          addbutton.className = 'btn btn-sm btn-outline-success  m-1'
          const addIcon = document.createElement('i');
          addIcon.className = 'ic-add text-danger'
          addbutton.appendChild(addIcon)
          addbutton.addEventListener('click', event => {
            event.preventDefault();
            that.onAddClick(row)
          });
          td.appendChild(addbutton);
        }
        if (column.buttons.some((el:any) => el == 'managetable')) {
          const manageTablebutton = document.createElement('button');
          manageTablebutton.innerText = 'Manage Table ';
          manageTablebutton.className = 'btn btn-sm btn-outline-primary m-1'
          const manageTableIcon = document.createElement('i');
          manageTableIcon.className = 'ic-file text-primary'
          manageTablebutton.appendChild(manageTableIcon)
          manageTablebutton.addEventListener('click', event => {
            event.preventDefault();
            that.onManageTableClick(row)
          });
          td.appendChild(manageTablebutton);
        }
      }


      return td;
    }

  }

  onEditClick(row:any) {
    this.actionEdit.emit(this.data[row])
  }
  onDeleteClick(row:any) {
    this.actionDelete.emit(this.data[row])
  }
  onAddClick(row:any) {
    this.actionAdd.emit(this.data[row])
  }
  onManageTableClick(row:any) {
    this.actionManageTable.emit(this.data[row])
  }
  selectedRow(custFunc:any) {
    let that = this

    return (instance:any, td:any, row:any, col:any, prop:any, value:any, cellProperties:any) => {
      if (custFunc) {
        var thisData = this.data[row];
        return custFunc(instance, td, row, col, prop, value, cellProperties, thisData)
      }
      const span = document.createElement('p');
      span.style.height = '100%'
      // if (that.columns[col].keyValue == 'Icon' && value) {
      //   const i = document.createElement('i');
      //   i.className = value
      //   span.appendChild(i)
      // }else{
      span.innerText = value
      // }
      span.addEventListener('click', () => {
        // console.log(value, row)
        that.passSeletedRow(row)
        console.log(col)

      })
      td.innerText = ''
      td.appendChild(span)
    }
  }
  passSeletedRow(row:any) {
    this.getSelectedRow.emit(this.data[row])
  }
  Export(type = 'csv') {
    if (type == 'xlsx') {
      var dataToExcel : any= this.data;
      // debugger;
      if (this.excelColumns.length > 0) {
        var toExcelColumn:any = this.excelColumns
        dataToExcel = this.data.map(function(obj) {
          return Object.keys(obj)
            .filter(function(key) {
              return toExcelColumn.includes(key);
            })
            .reduce(function(filteredObj:any, key) {
              filteredObj[key] = obj[key];
              return filteredObj;
            }, {});
        });
      }
      let heading = [Object.keys(dataToExcel[0])]
      let worksheet = XLSX.utils.json_to_sheet(dataToExcel);
      XLSX.utils.sheet_add_aoa(worksheet, heading)
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });



      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

      const EXCEL_EXTENSION = '.xlsx';

      const blobData: Blob = new Blob([excelBuffer], {

        type: EXCEL_TYPE

      });

      saveAs(blobData, 'table' + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    else if (type == 'csv') {
      const replacer = (key:any, value:any) => value === null ? '' : value;
      const header = Object.keys(this.data[0]);
      let csv = this.data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      let csvArray = csv.join('\r\n');
      var blob = new Blob([csvArray], { type: 'text/csv' })
      saveAs(blob, 'table' + '_export_' + new Date().getTime() + ".csv");
    }

  }
  fetchRemoteData() {
    this.http.post<TableDataResponse<any>>(this.remoteUrl, {
      model: this.model,
      param: this.param
    }).subscribe(
      res => {
        this.data = res.data
        this.totalRecords = res.recordsFiltered
        this.ref.markForCheck()
      }
    )
  }
  getPageumber(): number {
    return (this.model.start / this.model.length) + 1
  }
  nextCheck(): boolean {
    if (!this.remoteUrl) {
      if ((this.data.length == 0) || (this.data.length < this.model.length)) {
        return true
      }
      return false
    }
    if (this.model.start == 0 && this.model.length < this.totalRecords) {
      return false
    } else if (
      (this.model.start + this.data.length) < this.totalRecords
    ) {
      return false
    }
    return true
  }
  nextClick() {
    this.model.start = this.model.start + this.model.length
    if (this.remoteUrl) {
      this.fetchRemoteData()
      return
    }
    this.rowChangeEmit.emit(this.model)

  }
  prevClick() {
    this.model.start = this.model.start - this.model.length
    this.rowChangeEmit.emit(this.model)
    if (this.remoteUrl) {
      this.fetchRemoteData()
      return
    }

  }
  printData() {
    var divToPrint:any = document.getElementById(this.id);
    let newWin:any = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
  copyTable() {
    var range:any = document.createRange();

    range.selectNode(document.getElementById(this.id));
    // window.getSelection().removeAllRanges(); // clear current selection
    // window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    // window.getSelection().removeAllRanges();
  }
}
