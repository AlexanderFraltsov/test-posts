import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main.routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './components/post/post.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MarkedMapPipe } from './pipes/marked-map.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    SearchBarComponent,
    MarkedMapPipe
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class MainModule { }
