import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Login } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsaService } from '../service/msa.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  error!: string
  mailValidation = true;
  validationBoolean = true;
  passwordValidation = true;
  mailRegex = new RegExp('[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+([\.][a-zA-Z]+)+');
  passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*');
  mailMin = 15;
  mailMax = 30;
  pwdMin = 8;
  pwdMax = 20;
  login = '';
  mail = '';
  pwd = '';

  constructor(private route: Router, private service: MsaService) { }

  ngOnInit(): void {
  }

  loginUser() {
    const loginObj = {
      emailId: this.mail,
      password: this.pwd
    } 
    // if(this.validation(loginObj)) {
      this.service.login(loginObj).subscribe({
        next: () => {
          this.login = 'success';
          this.route.navigate(['home']);
        }, 
        error: () => {
          this.login = 'failed';
          this.error = 'Provide valid credentials';
        }         
    })
  // }
}

  validation(loginObj: Login) {
    if(loginObj.emailId != undefined) {
      const foundmail = loginObj.emailId.match(this.mailRegex);
      if( foundmail != null && foundmail[0].length === loginObj.emailId.length && foundmail[0].length >= this.mailMin && foundmail[0].length <= this.mailMax) {
        this.mailValidation = true;
        this.validationBoolean = this.validationBoolean && true;
      } else {
        this.mailValidation = false;
        this.validationBoolean = this.validationBoolean && false;
      } 
    } else {
      this.mailValidation = false;
      this.validationBoolean = this.validationBoolean && false;
    }
    
    if(loginObj.password != undefined) {
      const foundPassword = loginObj.password.match(this.passwordRegex);
      if( foundPassword != null && foundPassword[0].length === loginObj.password.length && foundPassword[0].length >= this.pwdMin && foundPassword[0].length <= this.pwdMax) {
          this.passwordValidation = true;
          this.validationBoolean = this.validationBoolean && true;
      } else {
        this.passwordValidation = false;
        this.validationBoolean = this.validationBoolean && false;
      } 
    } else {
      this.passwordValidation = false;
      this.validationBoolean = this.validationBoolean && false;
    }
  return this.validationBoolean;
  }

}
