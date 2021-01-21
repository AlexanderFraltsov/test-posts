import { loginErrors } from '../../../../constants/constants';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;
  public errors: {[key: string]: boolean} = {};
  public possibleErrors = loginErrors;

  constructor(public loginService: LoginService) {
    this.authForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [])
    });
  }

  public ngOnInit(): void {
  }

  public submit(): void {
    const {name, password} = this.authForm.value;
    try {
      this.loginService.login(name, password);
    } catch (e) {
      this.errors = {};
      e.map((el: string) => {
        this.errors[el] = true;
      })
      console.log(this.errors);
    }
  }

  public closeOneOfAlerts(alert: string){
    this.errors[alert] = false;
  }
}
