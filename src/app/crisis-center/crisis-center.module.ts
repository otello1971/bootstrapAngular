import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CrisisService } from './crisis.service';

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisListComponent } from './crisis-list.component';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisDetailComponent } from './crisis-detail.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Restangular
// import { RestangularModule, Restangular } from 'ngx-restangular';
// import { RestangularConfigFactory } from '../restConfig';
// import { baseURL } from '../constants';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule,
    // BrowserAnimationsModule,
    // RestangularModule.forRoot(RestangularConfigFactory)
  ],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisDetailComponent
  ],
  providers: [
    CrisisService
    // ,
    // {provide: 'BaseURL', useValue: baseURL}
  ]
})
export class CrisisCenterModule {}
