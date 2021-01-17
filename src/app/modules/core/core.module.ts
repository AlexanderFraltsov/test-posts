import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule
  ],
  exports: [NotFoundComponent]
})
export class CoreModule { }
