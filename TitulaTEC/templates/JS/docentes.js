
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
    var patron=/^[a-zA-Z].*@\w+[a-zA-Z].\w{1,3}.?\w{1,3}/;
    var res=patron.test(cad);
    if(res==false){
        return 'Debes informar una cuenta de correo valida <br>';
    }
    return '';
}
function validar(form){
    var tel=form.telefono.value;
    var email=form.email.value;
    var mensaje=validarTelefono(tel);
    mensaje+=validarEmail(email);
    mensaje+=validarPassword(form.password.value,form.rpassword.value);
    mensaje+=validarEscolaridad(form.escolaridad.options.selectedIndex);
    mensaje+=validarCedula(form.cedula.value);
    mensaje+=validarCarrera(form.carrera.options[form.carrera.options.selectedIndex].value);
    if(mensaje!=''){
        var div=document.getElementById("notificaciones");
        div.innerHTML='<p>'+mensaje +'</p>';;
        div.style.color="red";
        return false;
    }
    else{
        return true;
    }
}
function validarPassword(pwd1,pwd2){
    if(pwd1!=pwd2){
        return 'Las contraseñas no coinciden <br>';
    }
    if(pwd1.length<8 || pwd1==pwd1.toLowerCase()
    || pwd1==pwd1.toUpperCase() ||!isNaN(pwd1)){
        return 'Contraseña Debil <br>';
    }
    return '';
}
function validarEscolaridad(indice){
    if(indice==0){
        return "Debes elegir una escolaridad <br>";
    }
    return "";
}
function validarCedula(cad){
    var patron=/\d{5,10}/;
    if(cad.length<5){
       return "La cedula es de al menos 5 diditos";
    }
    else{
        if(cad.length<=10){
            if(!patron.test(cad)){
                return 'La cedula solo debe incluir digitos <br>' 
             }
            else{
                return "";
            } 
        }
        else{
            return "La cedula excede de 10 digitos <br>"
        }
    }
    return '';
}
function validarCarrera(valor){
    if(valor==0){
        return "Debes elegir una carrera <br>";
    }
    return "";
}
