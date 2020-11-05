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
    };
    this.actualizar=function(){
        //Actualizar algunas propiedad del objeto en un arreglo
    };
    this.eliminar=function(){
        //Elimina el objeto
    };
    this.consultar=function(){
        //Consultar un objeto
    }
}