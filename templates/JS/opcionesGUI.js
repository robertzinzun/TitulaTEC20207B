var op="";
function mostrarDiv(nombre){
    document.getElementById(nombre).style.display="block";
}
function ocultarDiv(nombre){
    document.getElementById(nombre).style.display="none";
}
function inicializarDivs(){
    mostrarDiv("listadoGeneral");
    ocultarDiv("listadoIndividual");
    consultaGeneral();
}
function nuevo(){
    op="c";
    ocultarDiv("listadoGeneral");
    document.getElementById("titulo").innerHTML="<h1>Registro de Opciones</h1>";
    reset();
    mostrarDiv("listadoIndividual");
    document.getElementById("notificaciones").innerHTML="";
    document.getElementById("eliminar").style.display="none";
    document.getElementById("guardar").style.display="block";
}
function realizarOperacion(){
    var obj;
    switch(op){
        case "c":
            obj=new Opcion(document.getElementById("id").value,
                document.getElementById("nombre").value,
                document.getElementById("descripcion").value,
            );
            obj.guardar();
            document.getElementById("notificaciones").innerHTML="Opción creada con exito";
            inicializarDivs();
            break;
        case "r":
            obj.consultar();
            break;
        case "u":
            obj=new Opcion(document.getElementById("id").value,
                document.getElementById("nombre").value,
                document.getElementById("descripcion").value,
            );
            obj.actualizar();   
            document.getElementById("notificaciones").innerHTML="Opción modificada con exito";     
            inicializarDivs();
            break;
        case "d":
            obj=new Opcion(document.getElementById("id").value,
                document.getElementById("nombre").value,
                document.getElementById("descripcion").value,
            );
            if(confirm('¿Estas seguro de eliminar la opcion:'+obj.getNombre())){
                obj.eliminar();   
                document.getElementById("notificaciones").innerHTML="Opción eliminada con exito";     
                inicializarDivs();
            }
            break;
    } 
}
function consultaGeneral(){
    limpiarTabla();
    if(arrayOpciones.length!=0){
        document.getElementById("notificaciones").innerHTML="";
        var table=document.getElementById("datos");
        for(i=0;i<arrayOpciones.length;i++){
            var tr=document.createElement("tr");
            var obj=arrayOpciones[i];
            for(p in obj){
                var td=document.createElement("td");
                var text=document.createTextNode(obj[p]);
                td.appendChild(text);
                tr.appendChild(td);
            }
            table.appendChild(tr);
            var link=crearlink(obj.id,"editar");
            var td=document.createElement("td");
            td.appendChild(link);
            tr.appendChild(td);
            link=crearlink(obj.id,"eliminar");
            td=document.createElement("td");
            td.appendChild(link);
            tr.appendChild(td);
        }
    }
    else{
        document.getElementById("notificaciones").innerHTML="No hay opciones registradas"; 
    }
}
function crearlink(id,operacion){
    var link=document.createElement("a");
    link.setAttribute("href","javascript:"+operacion+"("+id+")");
    var img=document.createElement("img");
    img.setAttribute("src","../Imagenes/"+operacion+".png");
    link.appendChild(img);
    return link;
}
function limpiarTabla(){
    var table=document.getElementById("datos");
    for(i=table.rows.length-1;i>0;i--){
        table.removeChild(table.rows[i]);
    }
}
function editar(id){
    op="u";
    var o=new Opcion(id,"","");
    o=o.consultar();
    document.getElementById("id").value=o.getId();
    document.getElementById("nombre").value=o.getNombre();
    document.getElementById("descripcion").value=o.getDescripcion();
    ocultarDiv("listadoGeneral");
    document.getElementById("titulo").innerHTML="<h1>Edición de Opciones</h1>";
    mostrarDiv("listadoIndividual");
    document.getElementById("id").setAttribute("readonly",true);
    document.getElementById("eliminar").style.display="none";
    document.getElementById("guardar").style.display="block";
}
function eliminar(id){
    op="d";
    var o=new Opcion(id,"","");
    o=o.consultar();
    document.getElementById("id").value=o.getId();
    document.getElementById("nombre").value=o.getNombre();
    document.getElementById("descripcion").value=o.getDescripcion();
    ocultarDiv("listadoGeneral");
    document.getElementById("titulo").innerHTML="<h1>Eliminación de Opciones</h1>";
    document.getElementById("id").setAttribute("readonly",true);
    mostrarDiv("listadoIndividual");
    document.getElementById("guardar").style.display="none";
    document.getElementById("eliminar").style.display="block";
}
function reset(){
    document.getElementById("id").value="";
    document.getElementById("nombre").value="";
    document.getElementById("descripcion").value="";
    document.getElementById("id").removeAttribute("readonly");
}