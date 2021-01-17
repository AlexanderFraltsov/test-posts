import { paths } from '../../../constants/constants';
import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  UrlSegment,
  Route
} from '@angular/router';


@Injectable({
  providedIn: null
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router
  ) {}

  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigate([paths.AUTH]);
      return false;
    }
  }
}
