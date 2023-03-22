import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ObservableHttpComponent } from './observable-http.component';
import { GetDataService } from './get-data.service';

@NgModule({
  declarations: [ObservableHttpComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule, ObservableHttpComponent],
})
export class ObservableHttpModule {}
