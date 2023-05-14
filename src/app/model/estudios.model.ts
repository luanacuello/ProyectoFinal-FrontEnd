export class estudios{

    id?: number;
    titulo: string;
    descripcion: string;
    desde: number;
    hasta: number;

    constructor(titulo: string, descripcion: string, desde: number,hasta: number) {

        this.titulo = titulo;
        this.descripcion = descripcion;
        this.desde = desde;
        this.hasta = hasta;
    }
}