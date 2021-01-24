import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raises the alert event when clicked', () => {
    const alert = 'alert';
    component.alert = alert;
    component.closeAlert.subscribe((generatedAlert: string) => expect(generatedAlert).toBe(alert));
    component.close();
  });
});
