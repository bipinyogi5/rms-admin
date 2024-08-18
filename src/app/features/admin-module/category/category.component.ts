import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvalidFormService } from 'src/app/services/invalid-form.service';
import { CategoryService } from './category.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addCategory',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AddCategoryComponent implements OnInit {
  categories: any[] = []; 
  selectedCategory: any = {};
  formStructure: FormGroup;
  Date: any;
  constructor(
    private fb: FormBuilder,
    public formSrv$: InvalidFormService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.formStructure = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.formStructure.get('name')?.value);
    formData.append('code', this.formStructure.get('code')?.value);
    formData.append('description', this.formStructure.get('description')?.value);
  
    // Append the image file if it exists
    const imageFile = this.formStructure.get('imageUrl')?.value;
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }
  
    this.categoryService.addCategory(formData).subscribe((res) => {
      console.log(res);
      this.toastr.success('Category Added Successfully', 'Success');
      this.getAllCategories();                   
    });
  }
  onImageChange(event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
        imagePreview.src = e.target?.result as string;
  
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


  getAllCategories() { 
    this.categoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.categories; 
        console.log('Categories:', this.categories); 
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  deleteCategory(id: any) {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (userConfirmed) {
      console.log('Deleting category with id:', id);
      this.categoryService.deleteCategory(id).subscribe(
        (response: any) => {
          this.toastr.success('Category Deleted Successfully', 'Success');
          console.log('Category deleted successfully:', response);
          this.getAllCategories();
        },
        (error) => {
          this.toastr.error('Error Deleting Category', 'Error');
          console.error('Error deleting category:', error);
        }
      );
    } else {
      console.log('Deletion canceled by the user.');
    }
  }

  onEdit(category: any) {
    // Set the selected category
    this.selectedCategory = category;

    // Populate form controls with selected category values
    this.formStructure.patchValue({
        name: this.selectedCategory.name,
        code: this.selectedCategory.code,
        description: this.selectedCategory.description,
        imageUrl: this.selectedCategory.imageUrl || '', 
    });
}

  
updateCategory() {
  const categoryId = this.selectedCategory.id;
  console.log('Updating category with id:', categoryId);

  const formData = new FormData();
  formData.append('name', this.formStructure.get('name')?.value);
  formData.append('code', this.formStructure.get('code')?.value);
  formData.append('description', this.formStructure.get('description')?.value);

  const imageFile = this.formStructure.get('imageUrl')?.value;
  // If no new image is uploaded, retain the existing image URL
  if (imageFile) {
      formData.append('imageUrl', imageFile); // Add new image
  } else {
      formData.append('imageUrl', this.selectedCategory.imageUrl); // Use existing image
  }

  console.log('Updated category data:', formData);

  this.categoryService.updateCategory(formData, categoryId).subscribe(
      (response: any) => {
        this.toastr.success('Category Updateded Successfully', 'Success');
          console.log('Category updated successfully:', response);
          this.getAllCategories();
      },
      (error) => {
          this.toastr.error('Error Updating Category', 'Error');
          console.error('Error updating category:', error);
      }
  );
}
}
