
function ocultarDivs(){
    alert("Ocultando los divs");
}
var miFuncion=ocultarDivs;
var alumno={
    "nombre":"Roberto Suárez Zinzún",
    "carrera":"ISC",
    "calificaciones":[100,80,70,75,90]
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
        promedio+=alumno.calificaciones[i];
    }
    promedio=promedio/alumno.calificaciones.length
    alert("Promedio "+promedio);
}