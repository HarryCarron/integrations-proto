import { Routes } from '@angular/router';
import { Page1Component } from '../pages/page1/page1.component';
import { Page2Component } from '../pages/page2/page2.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'page-1',
    pathMatch: 'full',
  },
  {
    path: 'page-1',
    component: Page1Component,
    pathMatch: 'full',
  },
  {
    path: 'page-2',
    component: Page2Component,
    pathMatch: 'full',
  },
];
