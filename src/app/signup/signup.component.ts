import { Component, OnInit } from '@angular/core';
import { AuthService } from '../-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formdata = {
    name: "",
    email: "",
    password: ""
  }
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticated();
  }

  onSubmit() {
    console.log(this.formdata)
    this.loading = true;
    this.auth
      .register(this.formdata.name, this.formdata.email, this.formdata.password)
      .subscribe({
        next: data => {
          this.auth.storeToken(data.idToken);
          this.auth.canAuthenticated();
        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            this.errorMessage = "Invalid email!"
          } else if (data.error.error.message == "EMAIL_EXISTS") {
            this.errorMessage = "Email already registered!"
          }else{
            this.errorMessage = "Unknown Error!"
          }
        }
      }).add(()=>{
        this.loading=false;
      })
  }

  logout(){
    this.auth.removeToken();
    this.auth.canAccess();
  }

}
