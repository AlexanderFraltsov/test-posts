import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { MainRoutingModule } from './main.routing.module';
import { PostComponent } from './components/post/post.component';



@NgModule({
  declarations: [HomeComponent, PostComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
