import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InvalidFormService } from 'src/app/services/invalid-form.service';
import { CurrentUserService } from 'src/app/services/current-user/current-user.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
    public invalidForm:InvalidFormService,
    private loginService:LoginService, 
    private toastService:ToastrService,
    private router:Router,
    private authService:AuthService,
    private userservice: CurrentUserService,
    private ttl : Title
    ){
      //Set title 
    this.loginForm = this.fb.group({
      ClientCode: [environment.client_code, Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      FCMToken: [''],
      DeviceID: ['']
    })
  }
  filteredClients = environment.loginDetails.filter((client) => client.clientcode === environment.client_code);


  loginFormSubmit(){
    if(this.loginForm.invalid){
      this.invalidForm.displayInvalidFormControls(this.loginForm);
      this.invalidForm.validateAllFormFields(this.loginForm);
      return;
    }
    this.loginService.userLogin(this.loginForm.value).subscribe((res:any)=>{
      this.userservice.setToken(res.token); // yo chai agi maile ref service banaideko ma pathaune ho  eyy login ma garne kaam yeti ho tmro tyo banako service ma kae kaam lagen cha bhane rakha aru chai maile rakhdeklo 
      // this.router.navigate(['/features/category']);
      // this.toastService.success("Logged in successfully");
    //   if(this.loginForm.getRawValue().ClientCode == 'kmc-dc'){
    //     this.router.navigate(['/features/category']).then(res => {
    //       window.location.reload();
    //     });
    //     // this.toastService.success("Logged in successfully");
    //   }
    //   else if(this.loginForm.getRawValue().ClientCode == 'pbg'){
    //     this.router.navigate(['/features/category']).then(res => {
    //       window.location.reload();
    //     });
    //     // this.toastService.success("Logged in successfully");
    //   }
    //   else if(this.loginForm.getRawValue().ClientCode == 'kage'){
    //     this.router.navigate(['/features/category']).then(res => {
    //       window.location.reload();
    //     });   
    //     // this.toastService.success("Logged in successfully");
    //   }
    })
  }

}
// tyo code chai client code bata kun dashboard ma lane bhanera ho