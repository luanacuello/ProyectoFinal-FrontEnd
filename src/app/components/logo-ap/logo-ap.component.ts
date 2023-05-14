import { Component, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaLogin } from 'src/app/model/persona.model';
import { PersonaService } from '../../service/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaData } from '../../model/persona.model';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoAPComponent {
  form: FormGroup;
  
  personadata : PersonaData | null = new PersonaData("");
  logged : boolean = false;

  constructor(private router:Router, fb: FormBuilder, private iterableDiffers: IterableDiffers, private PersonaService : PersonaService) {
    this.form = fb.group({
      user: [''],
      password: ['']
    });
  }


  
  InciarSesion(){

    let log : HTMLElement | null = document.getElementById("logg")!;
    let logg : HTMLElement | null = document.getElementById("loggout")!;
      
    const perslog: PersonaLogin = {
      user: this.form.value.user,
      password: this.form.value.password
    }

    this.PersonaService.Login(perslog).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmadopers")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Todo funciono";
        confirmacion.style.color = "lightgreen";

        let x = document.getElementsByClassName("btns");
        let y = document.getElementsByClassName("btns-agregar");

        this.personadata = data.body;

        let miToken = this.personadata?.token!;
        localStorage.setItem('token', miToken);



        this.logged = true;
          for (let i = 0; i < x.length; i++) {
            const button = x[i] as HTMLElement;
              if (button.style.display == "none") {
                button.style.display = "inline";
              } else { 
                button.style.display = "none";
              }
          }
          for (let i = 0; i < y.length; i++) {
            const button = y[i] as HTMLElement;
              if (button.style.display == "none") {
                button.style.display = "inline";
              } else { 
                button.style.display = "none";
              }
          }

          log!.style.display = "none";
          logg!.style.display = "inline-block";


      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmadopers")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});


        
        // let btn : HTMLElement | null = document.getElementById("loginspan")!;
        // let btn = document.getElementById("btnlogin") as HTMLElement;
        

        // if(this.logged)
        // {
          
        // }
        //  else
        //  {
        //   this.logged = true;
        //   // btn.innerText = "Cerrar Sesion";
        //   for (let i = 0; i < x.length; i++) {
        //     const button = x[i] as HTMLElement;
        //       if (button.style.display == "none") {
        //         button.style.display = "inline";
        //       } else { 
        //         button.style.display = "none";
        //       }
        //   }
          
        //   for (let i = 0; i < y.length; i++) {
        //     const button = y[i] as HTMLElement;
        //       if (button.style.display == "none") {
        //         button.style.display = "inline";
        //       } else { 
        //         button.style.display = "none";
        //       }
        //   }
         
        // }

        

        return;
  }

  CerrarSesion(){

    let log : HTMLElement | null = document.getElementById("logg")!;
    let logg : HTMLElement | null = document.getElementById("loggout")!;


    let x = document.getElementsByClassName("btns");
    let y = document.getElementsByClassName("btns-agregar");

    this.logged = false;
          for (let i = 0; i < x.length; i++) {
            const button = x[i] as HTMLElement;
              if (button.style.display == "none") {
                button.style.display = "inline";
              } else { 
                button.style.display = "none";
              }
          }
          
          for (let i = 0; i < y.length; i++) {
            const button = y[i] as HTMLElement;
              if (button.style.display == "none") {
                button.style.display = "inline";
              } else { 
                button.style.display = "none";
              }
          }

          localStorage.removeItem("token");
         
          log!.style.display = "inline-block";
          logg!.style.display = "none";
          return
  }

  
}
