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
            obj={nombre:document.getElementById("nombre").value,descripcion:document.getElementById("descripcion").value};
            json=JSON.stringify(obj);

            var url="/opciones/guardar/"+encodeURI(json);
            lanzarPerticion(url);
            break;
        case "r":
            obj.consultar();
            break;
        case "u":
             obj={idOpcion:document.getElementById("id").value,nombre:document.getElementById("nombre").value,descripcion:document.getElementById("descripcion").value};
            json=JSON.stringify(obj);
            var url="/opciones/modificar/"+encodeURI(json);
            lanzarPerticion(url);
            break;
        case "d":
            var id=document.getElementById("id").value;
            var nombre=document.getElementById("nombre").value;
            if(confirm('¿Estas seguro de eliminar la opcion:'+nombre+"?")){
                var url="/opciones/delete/"+id;
                lanzarPerticion(url);
            }
            break;
    } 
}
function lanzarPerticion(url){
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            alert(this.responseText);
            inicializarDivs();
        }
    };
    ajax.open("get",url,true);
    ajax.setRequestHeader("Content-Type","application/json")
    ajax.send();
}
function consultaGeneral(){
    limpiarTabla();
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            llenarTabla(this.responseText);
        }
    };
    ajax.open("Get","/opciones/consultaGeneral",true);
    //ajax.setRequestHeader("Content-Type","application/json")
    ajax.send();
}
function llenarTabla(respuesta){
    arrayOpciones=JSON.parse(respuesta);
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
            var link=crearlink(obj.idOpcion,"editar");
            var td=document.createElement("td");
            td.appendChild(link);
            tr.appendChild(td);
            link=crearlink(obj.idOpcion,"eliminar");
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
    img.setAttribute("src","static/Imagenes/"+operacion+".png");
    link.appendChild(img);
    return link;
}
function limpiarTabla(){
    var table=document.getElementById("datos");
    for(i=table.rows.length-1;i>0;i--){
        table.removeChild(table.rows[i]);
    }
}
function llenarCampos(respuesta,operacion){
    op=operacion;
    var o=JSON.parse(respuesta);
    document.getElementById("id").value=o.idOpcion;
    document.getElementById("nombre").value=o.nombre;
    document.getElementById("descripcion").value=o.descripcion;
    ocultarDiv("listadoGeneral");
    if(operacion=='u')
        document.getElementById("titulo").innerHTML="<h1>Edición de Opciones</h1>";
    else
        document.getElementById("titulo").innerHTML="<h1>Eliminación de Opciones</h1>";
    mostrarDiv("listadoIndividual");
    document.getElementById("id").setAttribute("readonly",true);
    document.getElementById("etID").style.display="block";
    document.getElementById("id").style.display="block";
    document.getElementById("eliminar").style.display="block";
    document.getElementById("guardar").style.display="block";
}
function editar(id){
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            llenarCampos(this.responseText,"u");
        }
    };
    ajax.open("get","/opciones/"+id,true);
    ajax.send();
}

function eliminar(id){
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            llenarCampos(this.responseText,"d");
        }
    };
    ajax.open("get","/opciones/"+id,true);
    ajax.send();

}
function reset(){
    document.getElementById("id").value="";
    document.getElementById("id").style.display="none";
    document.getElementById("etID").style.display="none";
    document.getElementById("nombre").value="";
    document.getElementById("descripcion").value="";
    document.getElementById("id").removeAttribute("readonly");
}