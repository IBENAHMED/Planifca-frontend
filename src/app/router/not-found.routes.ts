import { Routes } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';

export const notfoundRoutes: Routes = [
  {
    path: URLS.NOTFOUND,
    loadComponent() {
      return import("../components/not-found/not-found.component").then((m) => m.NotFoundComponent)
    },
  },
];
