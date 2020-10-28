
function ocultarDivs(){
    alert("Ocultando los divs");
}
var miFuncion=ocultarDivs;
var alumno={
    "nombre":"Roberto Suárez Zinzún",
    "carrera":"ISC",
    "calificaciones":[
        {
            "nombre_materia":"FP",
            "calificacion":100,
            "semestre":1
        },
        {
            "nombre_materia":"Mate 1",
            "calificacion":80,
            "semestre":1
        },
        {
            "nombre_materia":"Quimica",
            "calificacion":70,
            "semestre":1
        },
        {
            "nombre_materia":"POO",
            "calificacion":75,
            "semestre":2
        },
        {
            "nombre_materia":"Mate 2",
            "calificacion":90,
            "semestre":2
        }
    ]
};
function mostrarDatosGenerales(){
    alert("Nombre:"+alumno.nombre+", carrera:"+alumno.carrera);
}
function mostrarCalificaciones(){
    for(i=0;i<alumno.calificaciones.length;i++){
        alert("Calificación "+(i+1)+":"+alumno.calificaciones[i]);
    } 
}
function promedioCalificaciones(){
    var promedio=0;
    for(i=0;i<alumno.calificaciones.length;i++){
        promedio+=alumno.calificaciones[i].calificacion;
    }
    promedio=promedio/alumno.calificaciones.length
    alert("Promedio "+promedio);
}
function califMaxima(){
    indice=0;
    for(i=0;i<alumno.calificaciones.length;i++){
        if(alumno.calificaciones[i].calificacion>=alumno.calificaciones[indice].calificacion){
            indice=i;
        }
    }
    alert("La calificacion maxima es "+alumno.calificaciones[indice].calificacion+" de la materia "+alumno.calificaciones[indice].nombre_materia)
}
function califMinima(){
    indice=0;
    for(i=0;i<alumno.calificaciones.length;i++){
        if(alumno.calificaciones[i].calificacion<=alumno.calificaciones[indice].calificacion){
            indice=i;
        }
    }
    alert("La calificacion minima es "+alumno.calificaciones[indice].calificacion+" de la materia "+alumno.calificaciones[indice].nombre_materia)

}
