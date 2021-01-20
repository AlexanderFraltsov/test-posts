import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastsComponent } from './components/toasts/toasts.component';



@NgModule({
  declarations: [NotFoundComponent, ToastsComponent],
  imports: [
    SharedModule
  ],
  exports: [
    NotFoundComponent,
    ToastsComponent
  ]
})
export class CoreModule { }
