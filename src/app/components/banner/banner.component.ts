import { Component, Input } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { PersonaBanner, persona } from '../../model/persona.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() persona : persona = new persona(0,"","","","","","");

  selectedFile : File  | undefined = undefined;

  stringBannerData : string = 'data:image/jpg;charset=utf8;base64,';

  constructor(private PersonaService : PersonaService,) {}

  ngOnInit(): void {
    this.PersonaService.getPersona().subscribe(data => {
      this.persona = data;
      document.getElementById('banner')?.setAttribute('src', this.stringBannerData + this.persona.banner)
    });
  }

  cargarBanner(event : any){
    this.selectedFile = event.target.files[0];
}

 async enviarBanner(){
  if(this.selectedFile == undefined){
    let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersbanner")!;
    confirmacion.innerText = "No se cargo ninguna imagen";
    confirmacion.style.color = "red";
    return;
  }
  let arraybuffer : ArrayBuffer = null!;
  let promise = await this.selectedFile?.arrayBuffer().then((buffer : ArrayBuffer) => {arraybuffer = buffer}).catch(() => {});
  let arrstrbanner = this.arrayBufferToBase64(arraybuffer);
  
  let personabanner = new PersonaBanner(this.persona.id, arrstrbanner);
   this.PersonaService.onUploadBanner(personabanner).subscribe({
    next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersbanner")!;
        if(data.status === 200){
          confirmacion.innerText = "Todo funciono";
          confirmacion.style.color = "lightgreen";
          document.getElementById('banner')?.setAttribute('src', this.stringBannerData + arrstrbanner);
        } else {
          confirmacion.innerText = "Error inesperado";
          confirmacion.style.color = "magenta";
        }
     },
     error : (e) =>{
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionpersbanner")!;
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
