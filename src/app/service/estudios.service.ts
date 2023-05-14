import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { estudios } from '../model/estudios.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  URL: string = 'http://127.0.0.1:8080/BACKEND';
  constructor(private http: HttpClient) { }

  public getEstudios(): Observable <estudios[]>{
    return this.http.get<estudios[]>(this.URL+'/Estudio/ListarEstudio');
  }

  public addEstudio(est : any): Observable <HttpResponse<estudios>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.put<estudios>(this.URL+'/Estudio/CrearEstudio', est, {headers: headers, observe: 'response' });
  }

  public modificarEstudio(est : any): Observable <HttpResponse<estudios>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<estudios>(this.URL+'/Estudio/ModificarEstudio', est, {headers: headers, observe: 'response' });
  }

  public eliminarEstudio(id:number){
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.delete<estudios>(this.URL+'/Estudio/EliminarEstudio/'+id, {headers: headers, observe: 'response' });
  }
}
