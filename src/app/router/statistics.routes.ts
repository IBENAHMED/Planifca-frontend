import { Routes } from '@angular/router';
import constants from '../components/constants';
import { guardsGuard } from '../auth/guards/guards.guard';
import { URLS } from '../components/helpers/url-constants';
import { StatisticsComponent } from '../statistics/statistics/statistics.component';

export const statisticsRoutes: Routes = [
  {
    path: URLS.STATISTICS,
    component: StatisticsComponent,
  },
];
