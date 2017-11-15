import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// **************   Local Modules  ********************
import { WorkoutModule } from './workout/workout.module';
import { HeroesModule } from './heroes/heroes.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login-routing.module';
// ****************************************************

import { ComposeMessageComponent } from './compose-message.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './errors/not-found.component';
import { DialogService } from './dialog.service';

// Restangular
import { RestangularModule } from 'ngx-restangular';
import { RestangularConfigFactory } from './restConfig';
import { baseURL } from './constants';

// FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFirestoreModule,
    FormsModule,
    WorkoutModule,
    HeroesModule,
    LoginRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    LoginComponent,
    PageNotFoundComponent,
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
