import { catchError, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserContextService } from '../../components/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private http = inject(HttpClient);
  private UserContextService = inject(UserContextService);
  private readonly urlApi: string = `${environment.baseUrl}`;

  createResirvation(reservationData: any, terrainId: String) {
    return this.http.post(
      `${this.urlApi}/reservation/new/${terrainId}`, reservationData)
  }

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

  getListTimeSlots(terrainId: String, startDate: any, endDate: any): Observable<any> {
    return this.http.get(`${this.urlApi}/reservation/timeslots/${terrainId}?startDate=${startDate}&endDate=${endDate}`)
  }

  downloadReceipt(reservationId: string) {
    return this.http.get(`${this.urlApi}/reservation/download-receipt/${reservationId}`, {
      responseType: 'blob' as 'json'
    });
  }

  cancelReservation(reservationId: string, cancelReason: string) {
    return this.http.put(`${this.urlApi}/reservation/cancel/${reservationId}`, { cancelReason })
  }

  startReservation(reservationId: string){
    return this.http.put(`${this.urlApi}/reservation/start/${reservationId}`,{})
  }
  
  getReservationById(rereservationId: string){
     return this.http.get(`${this.urlApi}/reservation/${rereservationId}`)
  }
}
