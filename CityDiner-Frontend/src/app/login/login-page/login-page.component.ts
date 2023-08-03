import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  submitState = false

  constructor(private fb: FormBuilder, private userServ: UserService, private route: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  email: any;
  onSubmit() {
    this.submitState = true
    // if (this.loginForm.invalid) console.log(":invalid");
    // return;

    if (this.loginForm.valid) {
      this.userServ.login({ email: this.loginForm.value.email, password: this.loginForm.value.password })
        .subscribe(() => {
          this.route.navigateByUrl('/')
          alert("Login Successfull")
        },
          (error) => {
            alert(error.error.msg)
          })
    }
  }
}


