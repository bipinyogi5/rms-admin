import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators, 
} from '@angular/forms';
import { LoginService } from './login.service'; 
import { Router, RouterModule } from '@angular/router'; 
import { environment } from 'src/app/environments/environment.development';
import { InvalidFormService } from 'src/app/services/invalid-form.service';
import { CurrentUserService } from 'src/app/services/current-user/current-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit { 
  formStructure: FormGroup; 
  constructor(
    private fb: FormBuilder,
    public formSrv$: InvalidFormService,
    private loginService: LoginService,
    private router: Router,
    private userservice: CurrentUserService
  ) {
    this.formStructure = this.fb.group({ 
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  } 
    ngOnInit(): void { 
    }
    userRole: any;
    onSubmit() {  
      this.loginService.userLogin(this.formStructure.value).subscribe((res: any) => {
        if(res.success){ 
          this.userservice.setToken(res.token);
          console.log(res);
          this.userRole = res.userRoles;
          console.log(this.userRole);
        }
        if (this.userRole == 'ADMIN') {
          this.router.navigate(['features','admin','dashboard']);
        } else if (this.userRole == 'USER') {
          this.router.navigate(['features','dashboard']);
          
        } else {
          console.log('error')
          
        }
      }); 
    }
  }
