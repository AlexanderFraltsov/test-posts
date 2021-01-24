import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLoginService: Partial<LoginService>;

  beforeEach(async () => {
    mockLoginService = {
      author$: new BehaviorSubject(''),
      logout(): void {
        this.author$?.next('');
      }
    };
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{provide: LoginService, useValue: mockLoginService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username', () => {
    const name = 'Paul';
    mockLoginService.author$?.next('Paul');
    fixture.detectChanges();

    const span: DebugElement = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent.includes(name)).toBeTruthy();
  });

  it('should logout', () => {
    const name = 'Paul';
    mockLoginService.author$?.next('Paul');
    fixture.detectChanges();

    const { debugElement } = fixture;
    const span = debugElement.query(By.css('span')).nativeElement;
    const buttonLogOut = debugElement.query(By.css('button'));

    buttonLogOut.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(span.textContent.includes(name)).toBeFalsy();
  });
});
