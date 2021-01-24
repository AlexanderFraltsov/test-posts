import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { loginErrors } from '../../../../constants/constants';
import { LoginService } from '../../../core/services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: Partial<LoginService>;

  beforeEach(async () => {
    mockLoginService = {
      author$: new BehaviorSubject(''),
      login(name: string, password: string): void {
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
        this.author$?.next(name);
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: LoginService, useValue: mockLoginService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const name = 'Paul';
    const password = 'Atreides';

    component.authForm.patchValue({ name, password });
    component.submit();
    expect(mockLoginService.author$?.value).toBe('Paul');
  });
  it('should throw errors', () => {
    const name = '';
    const password = 'Atreides';

    component.authForm.patchValue({ name, password });
    component.submit();
    expect(component.errors).toEqual({
      [loginErrors.NO_NAME]: true,
      [loginErrors.NAME_MIN_LENGTH]: true
    });
  });
  it('should close alert', () => {
    component.errors = {
      [loginErrors.NO_NAME]: true,
      [loginErrors.NAME_MIN_LENGTH]: true
    };

    component.closeOneOfAlerts(loginErrors.NO_NAME);

    expect(component.errors).toEqual({
      [loginErrors.NO_NAME]: false,
      [loginErrors.NAME_MIN_LENGTH]: true
    });
  });
});
