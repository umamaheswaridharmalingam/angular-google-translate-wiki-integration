import { DynamicContentComponent } from './pages/dynamic-content/dynamic-content.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticContentComponent } from './pages/static-content/static-content.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'static',
    component: StaticContentComponent
  },
  {
    path: 'wiki',
    component: DynamicContentComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'wiki' },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
