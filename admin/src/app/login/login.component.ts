import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servises/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

constructor(public authService: AuthService, public router: Router) {}

  login() {
    
    
   /* if(this.authService.login(this.email, this.password)){

      //this.router.navigate(['/main-screen']);
      console.log("correct"); 
    }
    else{
      alert("שם משתמש או ססמא שגויים");
    }*/
    /*this.authService.login(this.email, this.password)
    .then((res) => {
      console.log(res);
      this.router.navigate(['dashboard']);
    })
    .catch((err) => console.log('error: ' + err));*/
    //routerLink="/main-screen"
    // this.authService.login(this.email, this.password);
    this.authService.login(this.email, this.password)
    .then(value => {
      this.authService.userLoggin = true;
      this.router.navigate(['/main-screen']);
    })
    .catch(err => {
      alert("שם משתמש או ססמא שגויים"); 
      this.authService.userLoggin = false;
      this.email = this.password = '';
    })
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
  }

}
