import { Component, OnInit } from '@angular/core';
import { AuthService } from '../-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   userName:string = '';
data:any;

  formdata = {
    email:"",
    password:""
  }
  submit=false;
  errorMessage="";
  loading=false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  this.auth.canAuthenticated();
  }

  onSubmit(){
    this.loading=true;
    this.auth.login(this.formdata.email,this.formdata.password)
              .subscribe({
                next:data=>{
                    this.auth.storeToken(data.idToken);
                    this.auth.canAuthenticated();
                },
                error:data=>{
                  if (data.error.error.message == "INVALID_EMAIL" || data.error.error.message=="INVALID_PASSWORD") {
                    this.errorMessage = "Invalid credentials!"
                }else{
                    this.errorMessage = "Unknown Error!"
                }
                }
              }).add(()=>{
                this.loading=false;
        
              })
  }
 

}
