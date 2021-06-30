import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { DialogModule } from '../dialog/dialog.module';
import { ValidateErrorModule } from '../validate-error/validate-error.module';
import { SearchModule } from '../search/search.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertModule,
    DialogModule,
    ValidateErrorModule,
    SearchModule
  ],
  exports: [
    ReactiveFormsModule,
    AlertModule,
    DialogModule,
    ValidateErrorModule,
    SearchModule
  ]
})
export class SharedModule { }
