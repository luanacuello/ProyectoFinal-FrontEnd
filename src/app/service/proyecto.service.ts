import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyectos } from '../model/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL: string = 'http://127.0.0.1:8080/BACKEND';
  constructor(private http: HttpClient) { }

  public getProyectos(): Observable <proyectos[]>{
    return this.http.get<proyectos[]>(this.URL+'/Proyectos/ListarProyectos');
  }

  public addProyecto(proy : any): Observable <HttpResponse<proyectos>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.put<proyectos>(this.URL+'/Proyectos/CrearProyectos', proy, {headers: headers, observe: 'response' });
  }

  public modificarProyecto(proy : any): Observable <HttpResponse<proyectos>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<proyectos>(this.URL+'/Proyectos/ModificarProyectos', proy, {headers: headers, observe: 'response' });
  }

  public eliminarProyecto(id:number){
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.delete<proyectos>(this.URL+'/Proyectos/EliminarProyectos/'+id, {headers: headers, observe: 'response' });
  }

}
