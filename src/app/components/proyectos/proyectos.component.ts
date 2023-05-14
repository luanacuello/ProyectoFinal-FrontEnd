import { Component, Input, IterableDiffers } from '@angular/core';
import { proyectos } from '../../model/proyectos.model';
import { ProyectoService } from '../../service/proyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  @Input() proyectos : proyectos[] = new Array();
  proyectosLenght = 0;
  editarProy : any = 
  {
    id: '',
    titulo: '',
    descripcion: ''
  };

  puerta: boolean = true;
  form: FormGroup;
  iterablediffers: any;

  constructor(public ProyectoService : ProyectoService, fb: FormBuilder, private iterableDiffers: IterableDiffers) {
    this.form = fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(16)]],
      link: ['', [Validators.required]]
    });
    this.iterablediffers = this.iterableDiffers.find(this.proyectos).create();
  }

  ngOnInit(): void {
    this.ProyectoService.getProyectos().subscribe(data => {this.proyectos = data});
  }

  editar(item: any){
    this.editarProy = item;
  }

  proyEditar(){


    if(this.editarProy.titulo.trim() == '' || this.editarProy.descripcion.trim()  == '' || this.editarProy.link.trim()  == ''){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionproy")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    this.ProyectoService.modificarProyecto(this.editarProy).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionproy")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Todo funciono";
        confirmacion.style.color = "lightgreen";
        this.puerta = true;

      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
        
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionproy")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
        this.puerta = true;
      }});
  }

  addProy(){
    const Proyadd : proyectos = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      link: this.form.value.link
    }

    if(!this.puerta)
    {
      return
    }

    this.puerta = false;

    if(Proyadd.titulo.trim() == '' || Proyadd.descripcion.trim()  == '' || Proyadd.link.trim()  == ''){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoproy")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    this.ProyectoService.addProyecto(Proyadd).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoproy")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Elemento agregaado";
        confirmacion.style.color = "lightgreen";
        Proyadd.id = data.body?.id;
        this.proyectos.push(Proyadd);
        let time = setTimeout(() => { 
          let divest : HTMLElement | null = document.getElementById("proyectosdiv")!;
          var x = Array.from(divest.getElementsByClassName("btns") as HTMLCollectionOf<HTMLElement>);
          let y = x[x.length - 1]
          y.style.display = "inline";
          this.puerta = true;
        }, 1000);
      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
        this.puerta = true;
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmadoproy")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
        this.puerta = true;
      }});
  }

  proyEliminar(item: any){
    this.ProyectoService.eliminarProyecto(item.id).subscribe({
      next: (data) => {
      if(data.status === 200)
      {
        let idelem : number = 0;
        for(let i = 0; i < this.proyectos.length; i++){
          if(this.proyectos[i].id === item.id)
          {
            idelem = i;
            break;
          }
        }
        this.proyectos.splice(idelem, 1);
      }
      },
      error : (e) => 
      {
        console.log("Error");
      }
    });
}

trackById(index : number, exp : proyectos)
  {
    return exp.id;
  }

}
