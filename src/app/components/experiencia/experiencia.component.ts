import { Component, DoCheck, Input, IterableDiffers} from '@angular/core';
import { experiencia } from '../../model/experiencia.model';
import { ExperienciaService } from '../../service/experiencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements DoCheck {

  @Input() experiencia : experiencia[] = new Array();
  experienciaLength : number = 0;
  editarExp : any = 
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

  
  
  constructor(private ExperienciaService : ExperienciaService, fb: FormBuilder, private iterableDiffers: IterableDiffers) {
    this.form = fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(16)]],
      desde: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      hasta: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    this.iterablediffers = this.iterableDiffers.find(this.experiencia).create();
  }

  ngOnInit(): void {
    this.ExperienciaService.getExperiencia().subscribe(data => {this.experiencia = data});
    this.experienciaLength = this.experiencia.length;
    // console.log(this.experiencia)
  }

  ngDoCheck(): void {
    // const expchange = this.iterablediffers.diff(this.experiencia);
    // if(expchange){
    //   let divexp : HTMLElement | null = document.getElementById("experienciadiv")!;
    //   var x = Array.from(divexp.getElementsByClassName("btns") as HTMLCollectionOf<HTMLElement>);
    //   x.forEach(element => {
    //     element.style.display = "inline"; 
    //   });
    //   this.experienciaLength = this.experiencia.length;
    // }
    // if(this.experienciaLength != this.experiencia.length)
    // {
      
    // }
  }

  editar(item: any){
    this.editarExp = item;
  }

  expEditar(){

    if(this.editarExp.titulo.trim() == '' || this.editarExp.descripcion.trim()  == '' || !this.editarExp.desde || !this.editarExp.hasta){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionexp")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    if(this.editarExp.hasta < this.editarExp.desde){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionexp")!;
        confirmacion.innerText = "Las fechas de ingreso no puede ser menor a la de salida";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }


    this.ExperienciaService.modificarExperiencia(this.editarExp).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionexp")!;
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
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionexp")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});
  }

  addExp(){ // aqui la funcion es void osea no tiene valor de retorno, si por ejemplo tuvieras que retonar un boolean seria boleean : addExp(), o un string  string : addEXp() y asi
    if(!this.puerta)
    {
      return //el return va aqui, empieza la funcion y si la puerta esta cerrada retorna
    }
    
    this.puerta = false; //si la puerta esta abierta osea es true, la cambia a false osea la cierra
    //asi mientras lo que viene se este ejecutando todos van a entrar en el if de arriba y van a retornar

    
    

    const Expadd: experiencia = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      desde: this.form.value.desde,
      hasta: this.form.value.hasta
    }

    // if(Expadd.titulo.trim() == '' || Expadd.descripcion.trim()  == '' || Expadd.desde < 1950 || Expadd.hasta < 1950){
    if(Expadd.titulo.trim() == '' || Expadd.descripcion.trim()  == '' || !Expadd.desde || !Expadd.hasta){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoexp")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    if(Expadd.hasta < Expadd.desde){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoexp")!;
        confirmacion.innerText = "Las fechas de ingreso no puede ser menor a la de salida";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }
    

    this.ExperienciaService.addExperiencia(Expadd).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmadoexp")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Elemento agregado";
        confirmacion.style.color = "lightgreen";
        Expadd.id = data.body?.id;
        this.experiencia.push(Expadd);
        // this.experiencia = [...this.experiencia, Expadd];
        let time = setTimeout(() => { 
          let divexp : HTMLElement | null = document.getElementById("experienciadiv")!;
          var x = Array.from(divexp.getElementsByClassName("btns") as HTMLCollectionOf<HTMLElement>);
          let y = x[x.length - 1]
          y.style.display = "inline"; 
          this.puerta = true; //una vez se ejecuto todo se abre la puerta, la coloco aqui por posibles bugs con el settimeout
        }, 250); //bajemos a 250 ms, creo que asi igual debe andar
       
      }
      else
      {
        confirmacion.innerText = "Error inesperado";
        confirmacion.style.color = "magenta";
        this.puerta = true; //y aqui tambien
      }
      },
      error : (e) => 
      {
        let confirmacion : HTMLElement | null = document.getElementById("confirmadoexp")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
        this.puerta = true; //si hubo un error desde el servidor, va a entrar aqui y no en el next, asi quela tengo que volver a abrir aqui
      }}); 
  }

  expEliminar(item: any){
    this.ExperienciaService.eliminarExperiencia(item.id).subscribe({
      next: (data) => {
      if(data.status === 200)
      {
        let idelem : number = 0;
        for(let i = 0; i < this.experiencia.length; i++){
          if(this.experiencia[i].id === item.id)
          {
            idelem = i;
            break;
          }
        }
        this.experiencia.splice(idelem, 1);
      }
      },
      error : (e) => 
      {
        console.log("Error");
      }
    });
}

trackById(index : number, exp : experiencia)
  {
    return exp.id;
  }
}
