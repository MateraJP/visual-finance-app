import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnlyLoggedUsersGuard } from './resources/auth-guards/only-logged-users.guard';
import { AuthGuard } from './resources/auth-guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ViewsModule } from './views/views.module';
import { httpInterceptorsProviders } from './resources/http-interceptors/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ViewsModule,
	BrowserAnimationsModule
  ],
  providers: [OnlyLoggedUsersGuard, AuthGuard, AuthService, httpInterceptorsProviders], 
  bootstrap: [AppComponent]
})
export class AppModule { }
