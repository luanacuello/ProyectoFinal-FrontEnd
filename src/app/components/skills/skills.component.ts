import { Component, Input, IterableDiffers } from '@angular/core';
import { skills } from '../../model/skills.model';
import { SkillService } from '../../service/skill.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  @Input() skills : skills[] = new Array();
  skillLength = 0;
  editarSkill : any = 
  {
    id: '',
    titulo: '',
    porcentaje: '',
  };

  puerta: boolean = true;
  form: FormGroup;
  iterablediffers: any;

  constructor(public SkillService : SkillService, fb: FormBuilder, private iterableDiffers: IterableDiffers) {
    this.form = fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      porcentaje: ['', [Validators.required, Validators.minLength(16)]]
    });
    this.iterablediffers = this.iterableDiffers.find(this.skills).create();
  }

  ngOnInit(): void {
    this.SkillService.getSkills().subscribe(data => {this.skills = data});
    // console.log(this.experiencia)
  }

  editar(item: any){
    this.editarSkill = item;
  }

  skEditar(){

    if(this.editarSkill.titulo.trim() == '' || !this.editarSkill.porcentaje){
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionsk")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }


    this.SkillService.modificarSkills(this.editarSkill).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmacionsk")!;
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
        let confirmacion : HTMLElement | null = document.getElementById("confirmacionsk")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
      }});
  }

  addSk(){

    if(!this.puerta)
    {
      return
    }

    this.puerta = false;


    const skadd: skills = {
      titulo: this.form.value.titulo,
      porcentaje: this.form.value.porcentaje
    }

    if(skadd.titulo.trim() == '' || !skadd.porcentaje){
      let confirmacion : HTMLElement | null = document.getElementById("confirmadosk")!;
        confirmacion.innerText = "Los campos no pueden estar vacios";
        confirmacion.style.color = "magenta";
        this.puerta = true;
        return //se supone que si hay un campo vacio tiene que abrir la puerta y retornar, no continuar ejecutando la funcion y escribir en base de datos, si no para que hacemos este if desde un principio
    }

    this.SkillService.addSkills(skadd).subscribe({
      next : (data) => {
      let confirmacion : HTMLElement | null = document.getElementById("confirmadosk")!;
      if(data.status === 200)
      {
        confirmacion.innerText = "Elemento agregaado";
        confirmacion.style.color = "lightgreen";
        skadd.id = data.body?.id;
        this.skills.push(skadd);
        // this.experiencia = [...this.experiencia, Expadd];
        let time = setTimeout(() => { 
          let divest : HTMLElement | null = document.getElementById("skilldiv")!;
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
        let confirmacion : HTMLElement | null = document.getElementById("confirmadosk")!;
        confirmacion.innerText = "Nada funciono";
        confirmacion.style.color = "magenta";
        this.puerta = true;
      }});
  }


  skEliminar(item: any){
    this.SkillService.eliminarSkills(item.id).subscribe({
      next: (data) => {
      if(data.status === 200)
      {
        let idelem : number = 0;
        for(let i = 0; i < this.skills.length; i++){
          if(this.skills[i].id === item.id)
          {
            idelem = i;
            break;
          }
        }
        this.skills.splice(idelem, 1);
      }
      },
      error : (e) => 
      {
        console.log("Error");
      }
    });
}

trackById(index : number, sk : skills)
  {
    return sk.id;
  }

  
}
