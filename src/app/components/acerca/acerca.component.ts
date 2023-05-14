import { Component, Input } from '@angular/core';
import { persona, PersonaImg } from '../../model/persona.model';
import { PersonaService } from '../../service/persona.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent {
  @Input() persona : persona = new persona(0,"","","","","","");
  

  selectedFile : File  | undefined = undefined;

  stringImgData : string = 'data:image/jpg;charset=utf8;base64,';

  constructor(private PersonaService : PersonaService) {}

  ngOnInit(): void {
    this.PersonaService.getPersona().subscribe(data => {
      this.persona = data;
      document.getElementById('fotoperfil')?.setAttribute('src', this.stringImgData + this.persona.imagen)
    });
  }

  persEditar(){

    if(this.persona.titulo.trim() == '' || this.persona.nombre.trim()  == ''){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpers")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }


    this.PersonaService.modificarPersona(this.persona).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpers")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Todo funciono";
        confirmacion.style.color = "lightgreen";
      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionpers")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});
  }


  persEditarDescrip(){

    if(this.persona.descripcion.trim()  == ''){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersdesc")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }


    this.PersonaService.modificarPersona(this.persona).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersdesc")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Todo funciono";
        confirmacion.style.color = "lightgreen";
      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersdesc")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});
  }

  cargarImagen(event : any){
      this.selectedFile = event.target.files[0];
  }

   async enviarImagen(){
    if(this.selectedFile == undefined){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersimg")!;
      confirmacion.innerText = "No se cargo ninguna imagen";
      confirmacion.style.color = "red";
      return;
    }
    let arraybuffer : ArrayBuffer = null!;
    let promise = await this.selectedFile?.arrayBuffer().then((buffer : ArrayBuffer) => {arraybuffer = buffer}).catch(() => {});
    let arrstr = this.arrayBufferToBase64(arraybuffer);
    
    let personaimg = new PersonaImg(this.persona.id, arrstr);
     this.PersonaService.onUpload(personaimg).subscribe({
      next : (data) => {
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersimg")!;
          if(data.status === 200){
            confirmacion.innerText = "Todo funciono";
            confirmacion.style.color = "lightgreen";
            document.getElementById('fotoperfil')?.setAttribute('src', this.stringImgData + arrstr);
          } else {
            confirmacion.innerText = "Error inesperado";
            confirmacion.style.color = "magenta";
          }
       },
       error : (e) =>{
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersimg")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
       }
      });

     }

     arrayBufferToBase64(buffer : ArrayBuffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
  }



  }


