import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';

@Component({
  selector: 'app-admin-module',
  standalone: true,
  imports: [RouterModule, LayoutsComponent],
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.scss']
})
export class AdminModuleComponent {

}
