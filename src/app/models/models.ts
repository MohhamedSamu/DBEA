export interface alumno{
    id?:string;
    apellidos?:string;
    nombres?:string;
}

export interface grupo {
    id?:string;
    grupo?:string;
    idAlumno?:string;
}

export interface nota {
    id?:string;
    nota?:number;
    idAlumno?:string;
    idgrupo?:string;
}