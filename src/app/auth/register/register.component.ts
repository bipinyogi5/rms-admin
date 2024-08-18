import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { registerService } from './register.service';
import { CommonModule } from '@angular/common';
import { InvalidFormService } from 'src/app/services/invalid-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formStructure: FormGroup;
  constructor(
    private registerService: registerService,
    private fb: FormBuilder,
    public formSrv$: InvalidFormService,
    private router: Router
  ) {
    this.formStructure = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      repw: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.formStructure.value.password === this.formStructure.value.repw) {
      console.log(this.formStructure.getRawValue());
      this.registerService
        .register(this.formStructure.value)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['auth/login']);
        });
    }
  }
}
