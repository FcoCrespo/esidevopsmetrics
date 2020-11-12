  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricsComponent } from './components/metrics/metrics.component';
import { CommitsComponent } from './components/commits/commits.component';

import { CommitsmetricsComponent } from './components/commitsmetrics/commitsmetrics.component'
import { CommitsauthorComponent } from './components/commitsauthor/commitsauthor.component'
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'metrics', component: MetricsComponent, canActivate: [AuthGuard] },
  { path: 'commits', component: CommitsComponent, canActivate: [AuthGuard] },
  { path: 'commitsauthor', component: CommitsauthorComponent, canActivate: [AuthGuard] },
  { path: 'commitsmetrics', component: CommitsmetricsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }