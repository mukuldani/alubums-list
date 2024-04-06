import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages_component/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages_component/list/list.module').then((m) => m.ListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
