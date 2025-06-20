import { catchError, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserContextService } from '../../components/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ResirvationServiceService {

  private http = inject(HttpClient);
  private readonly urlApi: string = `${environment.baseUrl}`;
  private UserContextService = inject(UserContextService);

  getAllResirvation(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.urlApi}/reservation?page=${page}&size=${pageSize}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  getStadiumsByType(type: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/stadium/${this.UserContextService.getUserContext().reference}/stadiums`,
      { typeSport: type },
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
