import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const userContext = localStorage.getItem('userContext');

    let headers: { [key: string]: string } = {};

    const excludedTokenUrls = [
      '/api/internal/club/front/'
    ];

    if (token && !excludedTokenUrls.some(url => req.url.includes(url)) && !req.url.includes('/auth/login')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const excludedClubRefUrls = [
      'club/newClub'
    ];

    const shouldAddClubRef = !excludedClubRefUrls.some(url => req.url.includes(url));

    if (shouldAddClubRef && userContext) {
      const contextObj = JSON.parse(userContext);
      if (contextObj.reference) {
        headers['clubRef'] = contextObj.reference;
      }
    }

     if (!req.headers.has('Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }

    const clonedRequest = req.clone({
      setHeaders: headers
    });

    return next(clonedRequest);
  }

  return next(req);
};

