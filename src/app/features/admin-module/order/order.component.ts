import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [CommonModule],
})
export class OrderComponent {
  orderList: any; 

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getAllOrderList();
  }
  getAllOrderList() { 
    this.orderService.getOrder().subscribe(
      (response: any) => {
        this.orderList = response; 
      },
      (error) => {
        console.error('Error fetching food:', error);
      }
    );
  }
  updateOrderStatus(orderId: number, newStatus: string) {
    const data = {
      orderId: orderId,
      newStatus: newStatus
    };
    this.orderService.updateStatus(data).subscribe(
      (response: any) => {  
        this.getAllOrderList();
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }
 
}
