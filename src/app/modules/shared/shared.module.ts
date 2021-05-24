import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { DialogModule } from '../dialog/dialog.module';
import { ValidateErrorModule } from '../validate-error/validate-error.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertModule,
    DialogModule,
    ValidateErrorModule
  ],
  exports: [
    ReactiveFormsModule,
    AlertModule,
    DialogModule,
    ValidateErrorModule
  ]
})
export class SharedModule { }
