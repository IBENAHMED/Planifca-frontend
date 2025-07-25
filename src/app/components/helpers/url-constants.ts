export const URLS = {
  // CONST
  DEFAULT: '',
  NOTFOUND: '**',

  // AUTH
  // todo add account backend
  PASSWORD_RESET: 'reset-password',
  PASSWORD_FORGET: 'account/password-forget',
  ACTIVATE_ACCOUNT: 'activate-account',

  // ADMIN
  ADMIN: ':frontPath/club',
  PROFILE: ':frontPath/profile',

  // CLUB
  CLUB: ':frontPath/administration',

  // RESERVATION
  RESERVATION: ':frontPath/reservation',
  CREATE_RESERVATION: ':frontPath/reservation/new',
  RESERVATION_PROCESSING:':frontPath/reservation/processing',
  VIEW_RESERVATION:':frontPath/reservation/:reservationId',

  // STATISTICS
  STATISTICS: ':frontPath/statistics',
};
