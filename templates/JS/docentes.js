
function ocultarDiv(id){
    var div=document.getElementById(id);
    div.style.display='none';
}
function mostrarDiv(id){
    var div=document.getElementById(id);
    div.style.display='block';
}
function mostrarYOcultarDiv(div){
    validarEmail();
    if(div=='datosLabores'){
        ocultarDiv('datosPersonales');
        mostrarDiv('datosLabores');
    }
    else{
        ocultarDiv('datosLabores');
        mostrarDiv('datosPersonales');
    }
}
function validarTelefono(cad){
    var patron=/\d{3}-\d{3}-\d{4}/;
    var res=patron.test(cad);
    if(res==false){
        return "Debes informar un numero de telefono valido <br>";
    }
    return '';
}
function validarEmail(cad){
    var patron=/[a-z]\w.*@\w+.\w+.*/;
    var res=patron.test(cad);
    if(res==false){
        return 'Debes informar una cuenta de correo valida';
    }
    return '';
}
function validar(){
    var tel=document.getElementById("telefono").value;
    var email=document.getElementById("email").value;
    //alert(tel);
    var mensaje=validarTelefono(tel);
    mensaje+=validarEmail(email);
    if(mensaje!=''){
        var div=document.getElementById("notificaciones");
        div.innerHTML='<p>'+mensaje +'</p>';;
        div.style.color="red";
    }
}
