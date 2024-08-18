import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule, 
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { inventoryService } from './inventory.service';
import { FoodDetailService } from '../food-detail/foodDetail.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FormsModule],
})
export class InventoryComponent implements OnInit {

  constructor(private inventoryService: inventoryService, private foodDetailService: FoodDetailService) {}

  ngOnInit() {
    this.getIngredient();
  }

  items: any[] = [];
  newItem: any = {};
  editingIndex: number = -1;
  headers: string[] = [];
  inventory: any;
  food: any; 
  errorMessage: string | null = null;

  addItem() {
    if (this.editingIndex > -1) {
      this.items[this.editingIndex] = { ...this.newItem };
      this.editingIndex = -1;
    } else {
      this.items.push({ ...this.newItem });
    }
    this.clearInputs();
  }

  editItem(index: number) {
    this.newItem = { ...this.items[index] };
    this.editingIndex = index;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  clearInputs() {
    this.newItem = {};
    for (let header of this.headers) {
      this.newItem[header] = '';
    }
  }

  addHeader(headerName: string) {
    if (headerName && !this.headers.includes(headerName)) {
      this.headers.push(headerName);
    }
  }

  submitData() {
    const foodItemId = localStorage.getItem('foodItemId'); 
    const ingredientId = localStorage.getItem('ingredientId'); // Get the ingredientId from local storage if it exists
  
    // Log the retrieved values for debugging
    console.log('Ingredient ID:', ingredientId);
    console.log('Food Item ID:', foodItemId);
  
    const data = {
      headers: this.headers,
      values: this.items.map(item => this.headers.map(header => item[header])),
      foodItemId: foodItemId,
    };  
    if (ingredientId !== null && ingredientId !== undefined && ingredientId !== '') {
      // Ask for confirmation before updating
      if (confirm("Are you sure you want to update this inventory item?")) {
        // Perform update if ingredientId exists
        console.log('Updating inventory...');
        this.updateInventory(data, +ingredientId); 
        this.getIngredient();
      }
    } else {
      // Ask for confirmation before creating
      if (confirm("Are you sure you want to create this inventory item?")) {
        // Perform create if ingredientId does not exist
        console.log('Creating inventory...');
        this.createInventory(data); 
        this.getIngredient();
      }
    }
  }
   
  getInventory() {
    this.inventoryService.getInventory().subscribe(
      (response: any) => {
        console.log('Inventory:', response);
        this.inventory = response;
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      }
    );
  }

  createInventory(data: any) {
    this.inventoryService.addInventory(data).subscribe(
      (response: any) => {
        console.log('Inventory created:', response);
        window.location.reload();
        this.getInventory();
      },
      (error) => {
        console.error('Error creating inventory:', error);
      }
    );
  }

  updateInventory(data: any, id: number) {
    this.inventoryService.updateInventory(data, id).subscribe(
      (response: any) => {
        console.log('Inventory updated:', response);
        window.location.reload();
        this.getInventory();
      },
      (error) => {
        console.error('Error updating inventory:', error);
      }
    );
  }

  delete() {
     const ingredientId = localStorage.getItem('ingredientId');
    if (confirm("Are you sure you want to delete this inventory item?")) {
      this.inventoryService.deleteInventory(ingredientId).subscribe(
        (response: any) => {  
          window.location.reload();
          localStorage.removeItem('ingredientId');
          console.log('Inventory delete:', response);
        },
        (error) => {
          console.error('Error deleting inventory:', error);
        }
      );
    }
  }
  

  getIngredient() {
    const foodItemId = localStorage.getItem('foodItemId');
    if (foodItemId) {
      this.foodDetailService.getFood(foodItemId).subscribe(
        (response) => {
          if (response.success) { 
            this.food = response.foodItem;
            this.inventory = this.food.inventory; 
            localStorage.setItem('ingredientId', this.inventory.id); 
           
            if (this.inventory) {
              this.headers = this.inventory.headers;
              this.items = this.inventory.values.map((valueArray: any[]) => {
                let item: any = {};
                this.headers.forEach((header, index) => {
                  item[header] = valueArray[index];
                });
                return item;
              });
            }
            console.log("Loaded inventory:", this.inventory); // For debugging purposes
          } else {
            this.errorMessage = 'Failed to load food item';
            console.error(this.errorMessage);
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
}
