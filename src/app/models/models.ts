export interface alumno{
    id?:string;
    apellidos?:string;
    nombres?:string;
    grupo?:string;
}

export interface nota {
    id?:string;
    nota?:number;
    idAlumno?:string;
    evaluacion?:string;
}

export interface asistencia{
    id?:string;
    idAlumno?:string;
    fecha?:string;
    llego?:boolean;
}

export interface usuario{
    id?:string;
    email?:string;
    firstname?:string;
    lastname?:string;
    role?:string;
}