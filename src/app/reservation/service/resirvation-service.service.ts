import { catchError, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResirvationServiceService {

  private http = inject(HttpClient);
  private readonly urlApi: string = `${environment.baseUrl}`;

  getAllResirvation(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.urlApi}/reservation?page=${page}&size=${pageSize}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };
}
