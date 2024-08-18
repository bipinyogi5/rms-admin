import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: any;
  constructor(private dashboardService: dashboardService) {
  }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.dashboardService.getReports().subscribe(
      (response: any) => {
        this.reports = response;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

}
