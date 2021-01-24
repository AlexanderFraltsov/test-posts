import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { paths, loginErrors } from '../../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public author$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public router: Router) { }

  public login(name: string, password: string): void {
    const errors = [];
    if (!name) {
      errors.push(loginErrors.NO_NAME);
    }
    if (!password) {
      errors.push(loginErrors.NO_PASSWORD);
    }
    if (name.trim().length < 3) {
      errors.push(loginErrors.NAME_MIN_LENGTH);
    }
    if (password.trim().length < 8) {
      errors.push(loginErrors.PASSWORD_MIN_LENGTH);
    }

    if (errors.length) {
      throw errors;
    }

    this.author$.next(name);
    localStorage.setItem('user', name);
    this.router.navigate([paths.MAIN]);
  }

  public logout(): void {
    this.author$.next('');
    localStorage.clear();
    this.router.navigate([paths.AUTH]);
  }

  public getLogin(): string | undefined {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.author$.next(user);
      return user;
    } else {
      this.author$.next('');
      return;
    }
  }
}
