import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidFormService } from 'src/app/services/invalid-form.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FoodService } from './food.service';
import { CategoryService } from '../category/category.service';
@Component({
  selector: 'app-food',
  standalone: true,
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class FoodComponent implements OnInit {

  selectedFood: any = {};
  food: any;
  categories: any; 
  ngOnInit() {
    this.getAllFoodList();
    this.getAllCategories();
    this.clearLocalStorage();
  }
  clearLocalStorage() {
    localStorage.removeItem('ingredientId');
    localStorage.removeItem('foodItemId');
  }
  formStructure: FormGroup;
  Date: any;
  constructor(
    private CategoryService: CategoryService,
    private fb: FormBuilder,
    public formSrv$: InvalidFormService,
    private foodService: FoodService,
    private router: Router
  ) {
    this.formStructure = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      label: ['', Validators.required],
    });
  }
  
  onImageChangeAdd(event: any) {
    debugger;
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreviewAdd = document.getElementById('imagePreviewAdd') as HTMLImageElement;
        imagePreviewAdd.src = e.target?.result as string;
  
        // Set the imageUrl field in the form
        this.formStructure.patchValue({
          imageUrl: input.files[0],
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onImageChangeEdit(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set the imageUrl in the form as the file object
            this.formStructure.patchValue({
                imageUrl: file // Keep it as a file object
            });
            const imagePreview = document.getElementById('imagePreviewEdit') as HTMLImageElement;
            if (imagePreview) {
                imagePreview.src = e.target.result; // Show the preview
            }
        };
        reader.readAsDataURL(file);
    }
}


  
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.formStructure.get('name')?.value);
    formData.append('categoryId', this.formStructure.get('categoryId')?.value);
    formData.append('description', this.formStructure.get('description')?.value);
    formData.append('price', this.formStructure.get('price')?.value);
    formData.append('label', this.formStructure.get('label')?.value);

    // Append the image file if it exists
    const imageFile = this.formStructure.get('imageUrl')?.value;
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }
    this.getAllCategories();
    console.log('Form Data:', this.formStructure.value);
    this.foodService.addFood(formData).subscribe((res) => {
      this.getAllFoodList(); 
    });
  }


  getAllCategories() {
    this.CategoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.categories ;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  getAllFoodList() { 
    this.foodService.getFood().subscribe(
      (response: any) => {
        this.food = response.foodItems;
      },
      (error) => {
        console.error('Error fetching food:', error);
      }
    );
  }

  deleteFoodItems(id: any) {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (userConfirmed) {
      console.log('Deleting food with id:', id);
      this.foodService.deleteFood(id).subscribe(
        (response: any) => {
          console.log('Food deleted successfully:', response);
          this.getAllFoodList();
        },
        (error) => {
          console.error('Error deleting food:', error);
        }
      );
    } else {
      console.log('Deletion canceled by the user.');
    }
  }

  onEdit(foods: any) { 
    this.selectedFood = foods;
    console.log('Selected food:', this.selectedFood); 
    this.formStructure.patchValue({
        name: this.selectedFood.name,
        categoryId: this.selectedFood.categoryId,  
        description: this.selectedFood.description,
        price: this.selectedFood.price, 
        label: this.selectedFood.label,  
        imageUrl: this.selectedFood.imageUrl,
    });
}

updateFood() { 
  const foodId = this.selectedFood.id;
  const formData = new FormData();

  // Append all form data
  formData.append('name', this.formStructure.get('name')?.value);
  formData.append('categoryId', this.formStructure.get('categoryId')?.value);
  formData.append('description', this.formStructure.get('description')?.value);
  formData.append('price', this.formStructure.get('price')?.value);
  formData.append('label', this.formStructure.get('label')?.value);

  const imageFile = this.formStructure.get('imageUrl')?.value;
  
  // If no new image is uploaded, keep the existing one
  if (imageFile) {
      formData.append('imageUrl', imageFile); // New image
  } else {
      formData.append('imageUrl', this.selectedFood.imageUrl); // Existing image URL
  }

  console.log('Updating food with id:', foodId); 
  console.log('Updated food data:', formData);
  
  this.foodService.updateFood(formData, foodId).subscribe(
      (response: any) => {
          console.log('Food updated successfully:', response);
          this.getAllFoodList();
      },
      (error) => {
          console.error('Error updating food:', error);
      }
  );
}


redirectToFoodDetail(foodItem: any) {
  const foodItemId = foodItem.id;
  localStorage.setItem('foodItemId', foodItemId);
  this.router.navigate(['/features/admin/food-detail']);
}


}
