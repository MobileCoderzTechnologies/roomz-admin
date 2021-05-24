import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './components/static/static.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';



@NgModule({
  declarations: [
    StaticComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  exports: [
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
