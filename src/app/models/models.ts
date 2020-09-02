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
    evaluacion?:string;
}
export interface asistencia{
    id?:string;
    idGrupo?:string;
    idAlumno?:string;
    fecha?:Date;
    llego?:boolean;
}