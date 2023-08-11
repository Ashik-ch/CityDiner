import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ILogin } from 'src/app/shared/models/Interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitState = false

  constructor(private fb: FormBuilder, private userServ: UserService, private route: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitState = true
    if (this.loginForm.invalid) {
      alert("Invalid Form")
    }

    if (this.loginForm.valid) {
      const user: ILogin = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      this.userServ.login(user).subscribe((res: any) => {
        localStorage.setItem("token", res.token)
        this.route.navigateByUrl('/')
      },
        (error) => { alert(error.error.msg) })
    }
  }
}


