import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { MainRoutingModule } from './main.routing.module';
import { PostComponent } from './components/post/post.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [HomeComponent, PostComponent, SearchBarComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
