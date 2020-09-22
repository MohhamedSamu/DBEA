export interface alumno{
    id?:string;
    apellidos?:string;
    nombres?:string;
    grupo?:string;
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
    evaluacion?:string;
}

export interface asistencia{
    id?:string;
    idAlumno?:string;
    fecha?:Date;
    llego?:boolean;
}

export interface usuario{
    email?:string;
    password?:string;
}