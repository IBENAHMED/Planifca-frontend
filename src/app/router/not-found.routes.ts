import { Routes } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';
import { NotFoundComponent } from '../components/not-found/not-found.component';

export const notfoundRoutes: Routes = [
  {
    path: URLS.NOTFOUND,
    component: NotFoundComponent,
  },
];
