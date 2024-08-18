 
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [CommonModule, RouterModule],
})
export class CustomerComponent implements OnInit {
  customer: any[] = [];

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomerList();
  }
  getAllCustomerList() {
    console.log('Getting all customer list...')
    this.customerService.getCustomer().subscribe(
      (response: any) => {
        this.customer = response.usersWithRoles;
        console.log('Customer:', this.customer);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

}
