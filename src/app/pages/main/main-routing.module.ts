import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'user-list'},
      { path: 'user-list',
        loadChildren: '../user-list/user-list.module#UserListModule'
      },
      {
        path: 'users/:id',
        loadChildren: '../user-page/user-page.module#UserPageModule'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainRoutingModule { }
