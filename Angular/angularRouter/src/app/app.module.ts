import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';
import { ContactModule } from './contact/contact.module';
import { ContactReactiveModule } from './contact-reactive/contact-reactive.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ContactModule,
    ContactReactiveModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
