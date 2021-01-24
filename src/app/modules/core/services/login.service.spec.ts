import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { loginErrors } from '../../../constants/constants';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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
    expect(localStorage.getItem('user')).toBe(null);
  });

  it('should get login', () => {

    expect(service.getLogin()).toBe(undefined);

    const name = 'Paul';
    const password = 'Atreides';
    service.login(name, password);

    expect(service.author$.value).toBe(name);
    expect(localStorage.getItem('user')).toBe(name);

    expect(service.getLogin()).toBe(name);
  });

  it('should set author$ to empty on empty USER when get login', () => {

    service.logout();
    const name = 'Paul';
    service.author$.next(name);

    const gettedLogin = service.getLogin();

    expect(gettedLogin).toBe(undefined);
    expect(service.author$.value).toBe('');
  });

});
