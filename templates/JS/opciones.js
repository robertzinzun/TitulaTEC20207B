var arrayOpciones=[];
function Opcion(id,nombre,descripcion){
    this.id=id;
    this.nombre=nombre;
    this.descripcion=this.descripcion;
    this.getId=function(){
        return this.id;
    };
    this.getNombre=function(){
        return this.nombre;
    };
    this.getDescripcion=function(){
        return this.descripcion;
    };
    this.setId=function(id){
        this.id=id;
    };
    this.setNombre=function(nombre){
        this.nombre=nombre;
    };
    this.setId=function(descripcion){
        this.descripcion=descripcion;
    };
    this.guardar=function(){
        //Almacenara el objeto en un arreglo
        arrayOpciones.push(this);
    };
    this.actualizar=function(){
        //Actualizar algunas propiedad del objeto en un arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(arrayOpciones[i].id==this.id){
                arrayOpciones[i]=this;
            }
        }
    };
    this.eliminar=function(){
        //Elimina el objeto del arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(arrayOpciones[i].id==this.id){
                delete arrayOpciones[i];
            }
        }
    };
    this.consultar=function(){
        //Consultar un objecto en el arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(this.id==arrayOpciones[i].id){
                alert(this.nombre);
            }
        }
    }
}

function realizarOperacion(op){
    var obj=new Opcion(1,"Tesis","Presentación de un informe de tesis");
    switch(op){
        case "c":
            obj.guardar();
            break;
        case "r":
            obj.consultar();
            break;
        case "u":
            obj.actualizar();        
            break;
        case "d":
            obj.eliminar();
            break;
    } 
}