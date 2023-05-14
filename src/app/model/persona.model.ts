export class persona{

    id: number;
    nombre: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    banner: string;
    token: string;

    constructor (id : number, nombre: string, titulo: string, descripcion: string, imagen : string, banner: string, token: string) {
        this.id = id;
        this.nombre = nombre;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.banner = banner; 
        this.token = token;
    }

}

export class PersonaImg{
    id: number;
    imagen: string;
    constructor (id: number, imagen: string) {
        this.id = id;
        this.imagen = imagen;
    }

}

export class PersonaBanner{
    id: number;
    banner: string;
    constructor (id: number, banner: string) {
        this.id = id;
        this.banner = banner;
    }
}

export class PersonaLogin{
    user: String;
    password: String;
    constructor(user: String, password: String) {
        this.user = user;
        this.password = password;
    }
}

export class PersonaData{
    token: string;
    constructor(token: string) {
        this.token = token;
    }
    
}