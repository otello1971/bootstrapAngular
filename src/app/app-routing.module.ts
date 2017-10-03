import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './errors/not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { PreloadAllModules } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';


const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }
  },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy, // Otra opción: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
