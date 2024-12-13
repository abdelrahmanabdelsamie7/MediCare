import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './site-register.component.html',
  styleUrl: './site-register.component.css'
})
export class SiteRegisterComponent {
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null ,[Validators.required ,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.confirmPassword);
  registerSubmit():void{
if(this.registerForm.valid){
  console.log(this.registerForm.value)
}
  }
// custom validation function---->g:registerForm
confirmPassword(g:AbstractControl){
  if(g.get('password')?.value ===g.get('rePassword')?.value ){
    return null
  }else{
    return {
      mismatch:true
    }
  }

}
}
