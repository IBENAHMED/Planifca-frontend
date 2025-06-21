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

  private userContextKey = 'userContext';
  private userContext: any = localStorage.getItem(this.userContextKey);

  getAllResirvation(page: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'clubRef': JSON.parse(this.userContext).reference,

    });
    return this.http.get(`${this.urlApi}/reservation?page=${page}&size=${pageSize}`, { headers }).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };
}
