import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingModule'
  },
  { path: 'users',
    loadChildren: './pages/user-list/user-list.module#UserListModule'
  },
  {
    path: 'transactions',
    loadChildren: './pages/transactions/transactions.module#TransactionsModule'
  },
  { path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule'
  },
  { path: 'feedback',
    loadChildren: './pages/feedback/feedback.module#FeedbackModule'
  },
  {
    path: 'user/:id',
    loadChildren: './pages/user-page/user-page.module#UserPageModule'
  },
  {
    path: 'store-item/:id',
    loadChildren: './pages/store-item-edit/store-item-edit.module#StoreItemEditModule'
  },
  {
    path: 'store',
    loadChildren: './pages/store/store.module#StoreModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'})
  ],
  declarations: []
})
export class AppRoutingModule { }
