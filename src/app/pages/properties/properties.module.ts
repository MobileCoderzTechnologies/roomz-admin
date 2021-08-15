import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { PropertiesRoutingModule } from './properties-routing.module';



@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PropertiesRoutingModule
  ],
  exports: [
    SharedModule,
    MaterialModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
