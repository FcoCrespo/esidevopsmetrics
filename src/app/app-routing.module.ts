  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricsComponent } from './components/metrics/metrics.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards';

import { from } from 'rxjs';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'metrics', component: MetricsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }