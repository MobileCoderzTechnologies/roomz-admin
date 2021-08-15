import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PROPERTY_DETAIL_ROUTE, PROPERTY_LIST_ROUTE } from './constants/route.constant';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: PROPERTY_LIST_ROUTE.path,
    pathMatch: 'full',
  },
  {
    path: PROPERTY_LIST_ROUTE.path,
    component: PropertyListComponent
  },
  {
    path: `${PROPERTY_DETAIL_ROUTE.path}/:userId`,
    component: PropertyDetailComponent
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

export class PropertiesRoutingModule { }
