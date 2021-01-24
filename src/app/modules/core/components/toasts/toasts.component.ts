import { Component, HostBinding, TemplateRef } from '@angular/core';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  @HostBinding('class.ngb-toasts') host = true;
  constructor(public toastService: ToastService) { }

  public isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
