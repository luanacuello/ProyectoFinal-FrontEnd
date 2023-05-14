import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { experiencia } from '../model/experiencia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  URL: string = 'http://127.0.0.1:8080/BACKEND';
  constructor(private http: HttpClient) { }

  public getExperiencia(): Observable <experiencia[]>{
    return this.http.get<experiencia[]>(this.URL+'/trabajo/ListarTrabajo');
  }

  public addExperiencia(exp : any): Observable <HttpResponse<experiencia>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<experiencia>(this.URL+'/trabajo/CrearTrabajo', exp, {headers: headers, observe: 'response' });
  }

  public modificarExperiencia(exp : any): Observable <HttpResponse<experiencia>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.put<experiencia>(this.URL+'/trabajo/ModificarTrabajo', exp, {headers: headers, observe: 'response' });
  }

  public eliminarExperiencia(id:number){
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.delete<experiencia>(this.URL+'/trabajo/EliminarTrabajo/'+id, {headers: headers, observe: 'response' });
  }
}

//para el eliminar hay que poner id

