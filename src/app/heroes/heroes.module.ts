import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

import { HeroService } from './hero.service';

import { HeroRoutingModule } from './heroes-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Restangular
// import { RestangularModule, Restangular } from 'ngx-restangular';
// import { RestangularConfigFactory } from '../restConfig';
// import { baseURL } from '../constants';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule
    // , BrowserAnimationsModule
    // , RestangularModule.forRoot(RestangularConfigFactory)
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [
    HeroService
    // ,
    // {provide: 'BaseURL', useValue: baseURL}
  ]
})
export class HeroesModule {}
