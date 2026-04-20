import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload/upload').then((m) => m.UploadComponent),
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./features/job-list/job-list').then((m) => m.JobListComponent),
  },
  { path: '**', redirectTo: 'jobs' },
];