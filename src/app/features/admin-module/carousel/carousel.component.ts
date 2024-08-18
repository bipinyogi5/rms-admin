import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { carouselService } from './carousel.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CarouselComponent implements OnInit {

  carouselForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  carousels: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carouselService: carouselService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carouselList();
  }

  initForm() {
    this.carouselForm = this.formBuilder.group({
      title: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.carouselForm.patchValue({ image: file }); // Set the image file in 'image' form control
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
  
  onSubmit() {
    const formData = new FormData();
    console.log('Adding carousel:', this.carouselForm.value);
    formData.append('title', this.carouselForm.value.title);
    formData.append('imgUrl', this.carouselForm.value.image); // Add the image file
    this.carouselService.addCarousel(formData).subscribe(
      (response: any) => {
        console.log('Carousel added successfully:', response);
        this.carouselForm.reset();
        this.imageUrl = null;
        this.carouselList(); // Refresh carousel list after adding
      },
      (error) => {
        console.error('Error adding Carousel:', error);
      }
    );
  }

  deleteCarousel(id: any) {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this carousel?'
    );
    if (userConfirmed) {
      console.log('Deleting carousel with id:', id);
      this.carouselService.deleteCarousel(id).subscribe(
        (response: any) => {
          console.log('Carousel deleted successfully:', response);
          this.carouselList(); // Refresh carousel list after deleting
        },
        (error) => {
          console.error('Error deleting Carousel:', error);
        }
      );
    } else {
      console.log('Deletion canceled by the user.');
    }
  }

  carouselList() {
    console.log('Getting carousel list...');
    this.carouselService.getCarousel().subscribe(
      (response: any) => {
        this.carousels = response.carousels;
        console.log('Carousel:', this.carousels);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
