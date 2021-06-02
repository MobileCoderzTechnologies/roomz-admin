import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MaterialModule } from 'src/app/modules/material/material.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    SharedModule,
    MaterialModule
  ]
})
export class UsersModule { }
