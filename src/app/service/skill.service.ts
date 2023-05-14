import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { skills } from '../model/skills.model'

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  URL: string = 'http://127.0.0.1:8080/BACKEND';
  constructor(private http: HttpClient) { }

  public getSkills(): Observable <skills[]>{
    return this.http.get<skills[]>(this.URL+'/Skill/ListarSkills');
  }

  public addSkills(skill : any): Observable <HttpResponse<skills>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.put<skills>(this.URL+'/Skill/CrearSkills', skill, {headers: headers, observe: 'response' });
  }

  public modificarSkills(skill : any): Observable <HttpResponse<skills>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<skills>(this.URL+'/Skill/ModificarSkills', skill, {headers: headers, observe: 'response' });
  }

  public eliminarSkills(id:number){
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.delete<skills>(this.URL+'/Skill/EliminarSkills/'+id, {headers: headers, observe: 'response' });
  }
}
