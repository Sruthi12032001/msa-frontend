import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MsaService } from '../service/msa.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  error!: string
  validaionBoolean = true;
  nameRegex = new RegExp('[A-Za-z\\s]+');
  pinCodeRegex = new RegExp('[0-9]+');
  mailRegex = new RegExp('[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+([\.][a-zA-Z]+)+');
  passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*');
  addressRegex = new RegExp('[0-9A-Za-z,\\s\.:]+');
  mailMin = 10;
  mailMax = 30;
  firstNameMin =  3;
  firstNameMax = 20;
  lastNameMin =  3;
  lastNameMax = 20;
  employeeTypeMin = 10;
  employeeTypeMax = 30;
  passwordMin = 8;
  passwordMax = 16;
  pinMin = 5;
  pinMax = 6;
  addressMin = 10;
  addressMax = 100;
  firstNameValidation = true;
  lastNameValidation = true;
  ageValidation = true;
  mailValidation = true;
  passwordValidation = true;
  addressValidation = true;
  pinCodeValidation = true;
  stateValidation = true;
  minAge = 19;
  maxAge = 100;
  signedIn = '';
  l_name = '';
  f_name = '';
  pwd = '';
  inputMail = '';
  age!: number;
  add = '';
  pin = '';
  state = '';

  constructor(private router :Router, private service: MsaService) { }

  ngOnInit(): void {
  }

  signUp() {
    const user: User = {
      firstName: this.f_name,
      lastName: this.l_name,
      age: this.age,
      emailId: this.inputMail,
      password: this.pwd,
      address: this.add,
      pinCode: this.pin,
      state: this.state
    }

    if(this.validation(user)) {
      this.service.create(user).subscribe({
        next: () => {
          this.signedIn = 'signed';
          this.router.navigate(['home']);
        }, 
        error: () => {
          this.signedIn = 'failed';
        }
      })
    }
  }

  validation(user: User) {

    if(user.firstName != undefined) {
      const foundFirstName = user.firstName.match(this.nameRegex);
      if( foundFirstName != null && foundFirstName[0].length === user.firstName.length && foundFirstName[0].length >= this.firstNameMin && foundFirstName[0].length <= this.firstNameMax) {
          this.firstNameValidation = true;
          this.validaionBoolean = true;
      } else {
        this.firstNameValidation = false;
        this.validaionBoolean = false;
      } 
    } else {
      this.firstNameValidation = false;
      this.validaionBoolean = false;
    }
    
    if(user.lastName != undefined) {
      const foundLastName = user.lastName.match(this.nameRegex);
      if( foundLastName != null && foundLastName[0].length === user.lastName.length && foundLastName[0].length >= this.lastNameMin && foundLastName[0].length <= this.lastNameMax) {
        this.lastNameValidation = true;
        this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.lastNameValidation = false;
        this.validaionBoolean = this.validaionBoolean &&  false;
      } 
    } else{
        this.lastNameValidation = false;
        this.validaionBoolean = this.validaionBoolean &&  false;
    } 
    
    if(user.age === undefined &&!(user.age > this.minAge && user.age < this.maxAge)) {
      this.ageValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    } else {
      this.ageValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
  
   
    if(user.pinCode != undefined) {
      const foundPin= user.pinCode.match(this.pinCodeRegex);
      if( foundPin != null && foundPin[0].length === user.pinCode.length && foundPin[0].length >= this.pinMin && foundPin[0].length <= this.pinMax) {
          this.pinCodeValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.pinCodeValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      } 
    } else {
      this.pinCodeValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
    
    if(user.state != undefined) {
      const foundState= user.state.match(this.nameRegex);
      if( foundState != null && foundState[0].length === user.state.length && foundState[0].length >= this.firstNameMin && foundState[0].length <= this.firstNameMax) {
          this.stateValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.stateValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      } 
    } else {
      this.stateValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
    if(user.address != undefined) {
      const foundAddress= user.address.match(this.addressRegex);
      if( foundAddress != null && foundAddress[0].length === user.address.length && foundAddress[0].length >= this.addressMin && foundAddress[0].length <= this.addressMax) {
          this.addressValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.addressValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      } 
    } else {
      this.addressValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
    
      if(user.emailId != undefined) {
        const foundmail = user.emailId.match(this.mailRegex);
        if( foundmail != null && foundmail[0].length === user.emailId.length && foundmail[0].length >= this.mailMin && foundmail[0].length <= this.mailMax) {
          this.mailValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
        } else {
          this.mailValidation = false;
          this.validaionBoolean = this.validaionBoolean && false;
        } 
      } else {
        this.mailValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      }
      
      if(user.password != undefined) {
        const foundPassword = user.password.match(this.passwordRegex);
        if( foundPassword != null && foundPassword[0].length === user.password.length && foundPassword[0].length >= this.passwordMin && foundPassword[0].length <= this.passwordMax) {
            this.passwordValidation = true;
            this.validaionBoolean = this.validaionBoolean && true;
        } else {
          this.passwordValidation = false;
          this.validaionBoolean = this.validaionBoolean && false;
        } 
      } else {
        this.passwordValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      }
    return this.validaionBoolean;
  }

}
