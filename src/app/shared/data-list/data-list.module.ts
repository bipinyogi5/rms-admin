import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';
import { HotColumnComponent, HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';


registerAllModules();

@NgModule({
  declarations: [
    DataListComponent,
  ],
  imports: [
    CommonModule,
    HotTableModule,
    FormsModule,
    ReactiveFormsModule,
    PanelComponent
  ],
  exports:[DataListComponent]
})
export class DataListModule { }
