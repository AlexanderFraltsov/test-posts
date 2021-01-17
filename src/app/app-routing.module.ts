import { paths } from './constants/constants';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: paths.MAIN
  },
  {
    path: paths.MAIN,
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canLoad: [],
  },
  {
    path: paths.AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
