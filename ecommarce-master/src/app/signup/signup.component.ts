import { Component, OnInit } from '@angular/core';
import {Validators,FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  constructor() {   }
 name=new FormControl('',[Validators.required,Validators.minLength(3)]);
 email = new FormControl('', [Validators.required, Validators.email]);
 password=new FormControl('',);
 ErrorMessage() {
  return this.name.hasError('required')?'You must enter a value' :
      this.name.hasError('minlength')?'Not a valid name' :'';
 }
 getErrorMessage() {
  return this.email.hasError('required')?'You must enter a value' :
        this.email.hasError('email')?'Not a valid email' :
          '';
}
}
