var arrayOpciones=[];
class Opcion{
    constructor(id,nombre,descripcion){    
    this.id=id;
    this.nombre=nombre;
    this.descripcion=descripcion;
    }
    getId(){
        return this.id;
    }
    getNombre(){
        return this.nombre;
    }
    getDescripcion(){
        return this.descripcion;
    }
    setId(){
        this.id=id;
    }
    setNombre(nombre){
        this.nombre=nombre;
    }
    setDescripcion(descripcion){
        this.descripcion=descripcion;
    }
    guardar(){
        //Almacenara el objeto en un arreglo
        arrayOpciones.push(this);
    }
    actualizar(){
        //Actualizar algunas propiedad del objeto en un arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(arrayOpciones[i].id==this.id){
                arrayOpciones[i]=this;
            }
        }
    }
    eliminar(){
        //Elimina el objeto del arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(arrayOpciones[i].id==this.id){
                //delete arrayOpciones[i];
                arrayOpciones.splice(i,1);
            }
        }
    }
    consultar(){
        //Consultar un objecto en el arreglo
        for(i=0;i<arrayOpciones.length;i++){
            if(this.id==arrayOpciones[i].id){
                return arrayOpciones[i];
            }
        }
    }
}

