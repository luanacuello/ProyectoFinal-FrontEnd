import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona, PersonaBanner, PersonaData, PersonaImg, PersonaLogin } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL: string = 'http://127.0.0.1:8080/BACKEND';

  constructor(private http: HttpClient) {
    
  }
  
  public getPersona(): Observable <persona>{
    return this.http.get<persona>(this.URL+'/persona/BuscarPersona/1');
  }

  public modificarPersona(pers : persona): Observable <HttpResponse<persona>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<persona>(this.URL+'/persona/ModificarPersonas', pers, {headers: headers, observe: 'response'});
  }

  public onUpload(persimg : PersonaImg): Observable<HttpResponse<PersonaImg>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    
    return this.http.post<any>(this.URL+'/persona/ModificarPersonas/imagen', persimg, {headers: headers, observe: 'response' });
  }

  public onUploadBanner(persbanner : PersonaBanner): Observable<HttpResponse<PersonaBanner>>{
    let token = '';
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };
    return this.http.post<any>(this.URL+'/persona/ModificarPersonas/banner', persbanner, {headers: headers, observe: 'response' });
  }

  public Login(PersonaLog : PersonaLogin): Observable<HttpResponse<PersonaData>>{
    return this.http.post<PersonaData>(this.URL+'/login', PersonaLog, { observe: 'response' });
  }
}
