import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TestPromiseComponent } from './test-promise/test-promise.component';
import { TestObservableComponent } from './test-observable/test-observable.component';
import { ObservableHttpModule } from './observable-http/observable-http.module';

@NgModule({
  declarations: [AppComponent, TestPromiseComponent, TestObservableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    ObservableHttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
