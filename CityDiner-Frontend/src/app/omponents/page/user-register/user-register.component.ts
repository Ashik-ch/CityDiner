import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { IUserRegister } from 'src/app/shared/models/food';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userRegisterForm!: FormGroup;
  submitState = false

  constructor(private fb: FormBuilder, private userServ: UserService) { }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ['', [Validators.required,]],
      email: ['', [Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  onRegister() {
    this.submitState = true

    const user: IUserRegister = {
      name: this.userRegisterForm.value.name,
      email: this.userRegisterForm.value.email,
      confirmPassword: this.userRegisterForm.value.confirmPassword,
      password: this.userRegisterForm.value.password,
      address: this.userRegisterForm.value.address
    }



    if (this.userRegisterForm.valid) {
      this.userServ.register(user).subscribe(res => {
        console.log("res", res);
        alert("Regeterd")
      },
        (error) => {
          alert(error.error)
        })
    }
  }
}