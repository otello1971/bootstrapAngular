import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeroesModule } from './heroes/heroes.module';
import { ComposeMessageComponent } from './compose-message.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './errors/not-found.component';

import { DialogService } from './dialog.service';
// import { AdminModule } from './admin/admin.module';
// import { CrisisCenterModule } from './crisis-center/crisis-center.module';

import { baseURL } from './constants';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    // CrisisCenterModule,
    LoginRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [
    DialogService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [ AppComponent ]
  })

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
