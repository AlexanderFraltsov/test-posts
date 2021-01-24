import { LoginComponent } from './../../auth/pages/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { loginErrors, paths } from '../../../constants/constants';
import { LoginService } from './login.service';
import { HomeComponent } from '../../main/pages/home/home.component';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: paths.AUTH, component: LoginComponent },
          { path: paths.MAIN, component: HomeComponent },
        ])
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should loginned', () => {
    const name = 'Paul';
    const password = 'Atreides';
    service.login(name, password);

    expect(service.author$.value).toBe(name);
    expect(localStorage.getItem('user')).toBe(name);
  });

  it('should not login with name errors', () => {
    const name = '';
    const password = 'Atreides';
    try {
      service.login(name, password);
    } catch (e) {
      expect(e.includes(loginErrors.NO_NAME));
      expect(e.includes(loginErrors.NAME_MIN_LENGTH));
    }
    expect(service.author$.value).toBe('');
  });

  it('should not login with password errors', () => {
    const name = 'Paul';
    const password = '';
    try {
      service.login(name, password);
    } catch (e) {
      expect(e.includes(loginErrors.NO_PASSWORD));
      expect(e.includes(loginErrors.PASSWORD_MIN_LENGTH));
    }
    expect(service.author$.value).toBe('');
  });

  it('should logged out', () => {
    const name = 'Paul';
    const password = 'Atreides';
    service.login(name, password);

    expect(service.author$.value).toBe(name);
    expect(localStorage.getItem('user')).toBe(name);

    service.logout();

    expect(service.author$.value).toBe('');
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should get login', fakeAsync(() => {

    expect(service.getLogin()).toBeUndefined();

    const name = 'Paul';
    const password = 'Atreides';
    service.login(name, password);

    tick(50);

    expect(service.author$.value).toBe(name);
    expect(service.getLogin()).toBe(name);
  }));

  it('should set author$ to empty on empty USER when get login', () => {

    service.logout();
    const name = 'Paul';
    service.author$.next(name);

    const gettedLogin = service.getLogin();

    expect(gettedLogin).toBeUndefined();
    expect(service.author$.value).toBe('');
  });

});
