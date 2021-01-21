import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    ToastsComponent,
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NotFoundComponent,
    ToastsComponent,
    HeaderComponent,
    AlertComponent
  ]
})
export class CoreModule { }
