export class proyectos{

    id?: number;
    titulo: string;
    descripcion: string;
    link: string;

    constructor(titulo: string, descripcion: string, link: string) {

        this.titulo = titulo;
        this.descripcion = descripcion;
        this.link = link;
    }
}