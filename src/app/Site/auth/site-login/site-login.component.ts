import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './site-login.component.html',
  styleUrl: './site-login.component.css'
})
export class SiteLoginComponent {
loginForm:FormGroup = new FormGroup({
  email:new FormControl(null ,[Validators.required ,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.minLength(5) , Validators.maxLength(10)]),
})

loginSubmit():void{
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
  }
}
}
