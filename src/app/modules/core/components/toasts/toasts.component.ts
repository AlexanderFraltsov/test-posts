import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent {
  constructor(public toastService: ToastService) { }

  public isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
