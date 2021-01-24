import { ToastService } from '../../services/toast.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsComponent } from './toasts.component';

describe('ToastsComponent', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastsComponent ],
      imports: [
        NgbModule
      ],
      providers: [ToastService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not template on string', () => {
    expect(component.isTemplate({ textOrTpl: 'toast' })).toBeFalsy();
  });
});
