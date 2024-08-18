import { Component, OnInit } from '@angular/core';
import { FoodDetailService } from './foodDetail.service';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class FoodDetailComponent implements OnInit {
  food: any;
  inventory: any;
  errorMessage: string | null = null;

  constructor(private foodDetailService: FoodDetailService, private router: Router) { }

  ngOnInit(): void {
    this.displayFood();
  }

  displayFood() {
    const foodItemId = localStorage.getItem('foodItemId');
    if (foodItemId) {
      this.foodDetailService.getFood(foodItemId).subscribe(
        (response) => {
          if (response.success) { 
            this.food = response.foodItem;  
            this.inventory = this.food.inventory;  
          }
        },
        (error) => {
          this.errorMessage = 'Error fetching food item';
          console.error(this.errorMessage, error);
        }
      );
    } else {
      this.errorMessage = 'No food item ID found in local storage.';
      console.error(this.errorMessage);
    }
  }

  redirectToRoute() {
    this.router.navigate(['/features/admin/ingredients']);
  }
}
