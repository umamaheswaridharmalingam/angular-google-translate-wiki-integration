import { DynamicContentComponent } from './pages/dynamic-content/dynamic-content.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticContentComponent } from './pages/static-content/static-content.component';

export const routes: Routes = [
  {
    path: 'static',
    component: StaticContentComponent
  },
  {
    path: 'wiki',
    component: DynamicContentComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'wiki' },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
