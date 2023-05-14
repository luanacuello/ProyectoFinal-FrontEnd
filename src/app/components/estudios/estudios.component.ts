import { Component, Input, IterableDiffers } from '@angular/core';
import { estudios } from 'src/app/model/estudios.model';
import { EstudiosService } from '../../service/estudios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent {

  @Input()  estudios : estudios[] = new Array();
  estudiosLenght = 0;
  editarEst : any = 
  {
    id: '',
    titulo: '',
    descripcion: '',
    desde: '',
    hasta: ''
  };

  puerta: boolean = true;

  form: FormGroup;
  iterablediffers: any;

  constructor(public EstudiosService : EstudiosService, fb: FormBuilder, private iterableDiffers: IterableDiffers) {
    this.form = fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(16)]],
      desde: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      hasta: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    this.iterablediffers = this.iterableDiffers.find(this.estudios).create();
  }

  ngOnInit(): void {
    this.EstudiosService.getEstudios().subscribe(data => {this.estudios = data});
    this.estudiosLenght= this.estudios.length;
    // console.log(this.experiencia)
  }

  editar(item: any){
    this.editarEst = item;
  }

  estEditar(){

    if(this.editarEst.titulo.trim() == '' || this.editarEst.descripcion.trim()  == '' || !this.editarEst.desde || !this.editarEst.hasta){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionest")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    if(this.editarEst.hasta < this.editarEst.desde){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionest")!;
        confirmacion.innerText = "Las fechas de ingreso no puede ser menor a la de salida";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    this.EstudiosService.modificarEstudio(this.editarEst).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionest")!;
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
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionest")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});
  }

  addEst(){

    if(!this.puerta)
    {
      return
    }

    this.puerta = false;

    const Estadd: estudios = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      desde: this.form.value.desde,
      hasta: this.form.value.hasta
    }

    if(Estadd.titulo.trim() == '' || Estadd.descripcion.trim()  == '' || !Estadd.desde || !Estadd.hasta){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoest")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    if(Estadd.hasta < Estadd.desde){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoest")!;
        confirmacion.innerText = "Las fechas de ingreso no puede ser menor a la de salida";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    this.EstudiosService.addEstudio(Estadd).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoest")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Elemento agregaado";
        confirmacion.style.color = "lightgreen";
        Estadd.id = data.body?.id;
        this.estudios.push(Estadd);
        // this.experiencia = [...this.experiencia, Expadd];
        let time = setTimeout(() => { 
          let divest : HTMLElement | null = document.getElementById("estudiosdiv")!;
          var x = Array.from(divest.getElementsByClassName("btns") as HTMLCollectionOf<HTMLElement>);
          let y = x[x.length - 1]
          y.style.display = "inline"; 
          this.puerta = true;
        }, 250);
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
        let confirmacion : HTMLElement | null = document.getElementById("confirmadoest")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
        this.puerta = true;
      }});
  }

  estEliminar(item: any){
    this.EstudiosService.eliminarEstudio(item.id).subscribe({
      next: (data) => {
      if(data.status === 200)
      {
        let idelem : number = 0;
        for(let i = 0; i < this.estudios.length; i++){
          if(this.estudios[i].id === item.id)
          {
            idelem = i;
            break;
          }
        }
        this.estudios.splice(idelem, 1);
      }
      },
      error : (e) => 
      {
        console.log("Error");
      }
    });
}

trackById(index : number, exp : estudios)
  {
    return exp.id;
  }

  }

  