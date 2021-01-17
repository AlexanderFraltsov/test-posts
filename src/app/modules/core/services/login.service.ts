import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { paths } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public author$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public router: Router) { }

  public login(name: string): void {
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
    }
    this.author$.next('');
    return;
  }
}
