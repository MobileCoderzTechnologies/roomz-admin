import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { PropertiesRoutingModule } from './properties-routing.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { FormatTimeModule } from 'src/app/modules/format-time/format-time.module';



@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PropertiesRoutingModule,
    CarouselModule,
    FormatTimeModule
  ],
  exports: [
    SharedModule,
    MaterialModule,
    PropertiesRoutingModule,
    CarouselModule,
    FormatTimeModule
  ]
})
export class PropertiesModule { }
