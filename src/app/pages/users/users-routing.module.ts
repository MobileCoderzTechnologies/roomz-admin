import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { USER_DETAIL_ROUTE, USER_LIST_ROUTE } from './constants/route.constant';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: USER_LIST_ROUTE.path,
    pathMatch: 'full',
  },
  {
    path: USER_LIST_ROUTE.path,
    component: UserListComponent
  },
  {
    path: `${USER_DETAIL_ROUTE.path}/:userId`,
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UsersRoutingModule { }
