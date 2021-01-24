import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });
  afterEach(() => {
    service.toasts = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add toast to toasts', () => {
    const toast = {textOrTpl: 'message1'};
    service.show(toast.textOrTpl);
    expect(service.toasts).toEqual([toast]);
  });
  it('should remove toast from toasts', () => {
    const toast1 = {textOrTpl: 'message1'};
    const toast2 = {textOrTpl: 'message2'};
    const toast3 = {textOrTpl: 'message3'};

    service.show(toast1.textOrTpl);
    service.show(toast2.textOrTpl);
    service.show(toast3.textOrTpl);

    service.remove(toast2);
    expect(service.toasts).toEqual([toast1, toast3]);
  });
});
