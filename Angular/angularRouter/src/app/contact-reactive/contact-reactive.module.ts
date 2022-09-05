import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactReactiveComponent } from './contact-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ContactReactiveComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [HttpClientModule],
})
export class ContactReactiveModule {}
