from flask import Flask,render_template,abort,request,redirect,url_for
from flask_login import LoginManager, login_user
from flask_sqlalchemy import SQLAlchemy
from modelo.models import db, Edificio, Sala, Alumno, Usuario

app=Flask(__name__)
app.secret_key='TitulaT3C'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://titulatec_user:hola.123@localhost/Titulatec2020'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
#Configuración para el manejo de la sesion de los usuarios
loginManager=LoginManager()
loginManager.init_app(app)
loginManager.login_view="login"

@loginManager.user_loader
def load_user(id):
    return Usuario.query.get(int(id))

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/otraRuta')
def otra_ruta():
    return 'Otra cosa'

@app.route('/login',methods=['POST'])
def login():
    u=Usuario()
    u=u.validar(request.form['email'],request.form['password'])
    if u!=None:
        login_user(u)
        return render_template('Comunes/principal.html')
    else:
        return 'Usuario invalido'

@app.route('/alumno/<string:nocontrol>')# Eliminar al alumno
@app.route('/alumno')# Agregar un alumno con los datos que vendrian en el mensaje de la peticion POST
def consultarAlumno(nocontrol=None):
    if nocontrol==None:
        return 'Agregando alumno'
    else:
        return 'Eliminando al alumno con noControl:'+nocontrol
#Rutas para el CRUD de la tabla Docentes
@app.route('/docentes/new')
def agregarDocente():
    saludo="hola mundo"
    return render_template('Docentes/altaDocente.html',msg=saludo)
@app.route('/docentes/edit/<id>')
def editarDocente(id):
    print(id)
    return render_template('Docentes/modificarDocente.html')
@app.route('/docentes/delete/<id>')
def eliminarDocente(id):
    #abort(404)
    return render_template('Docentes/eliminarDocente.html',idDocente=id)

@app.route('/docentes')
def consultarDocentes():
    return render_template('Docentes/consultaDocentes.html')

@app.route('/docentes/save',methods=['post'])
def guardarDocente():
    print(request.method+':'+request.url)
    nombre='Sin nombre'
    nombre = request.form['nombre']
    # try:
    #     nombre=request.form['nombre']
    # except:
    #     abort(500)
    # print(nombre)
    return nombre
#fin del CRUD de la tabla Docentes
#inicio del crud de Edificios
@app.route('/edificios/new')
def nuevoEdificio():
    return render_template('Edificios/nuevoEdificio.html')
@app.route('/edificios/save',methods=['POST'])
def guardarEdificio():
    try:
        edificio=Edificio()
        edificio.nombre=request.form['nombre']
        edificio.insertar()
        return redirect(url_for('consultaGeneralEdificios'))
    except:
        abort(500)
@app.route('/edificios')
def consultaGeneralEdificios():
    edificio = Edificio()
    edificios=edificio.consultaGeneral()
    return render_template('Edificios/consultaGeneral.html',edificios=edificios)
@app.route('/edificios/<int:id>')
def consultarEdificio(id):
    edificio=Edificio()
    edificio.idEdificio=id
    edificio=edificio.consultaIndividual()
    return render_template('Edificios/editarEdificio.html',edificio=edificio)
@app.route('/edificios/modificar',methods=['POST'])
def actualizarEdificio():
    edificio=Edificio()
    edificio.idEdificio=request.form['id']
    edificio.nombre=request.form['nombre']
    edificio.actualizar()
    return redirect(url_for('consultaGeneralEdificios'))
@app.route('/edificios/delete/<int:id>')
def eliminarEdificio(id):
    edificio=Edificio()
    edificio.idEdificio=id
    edificio.eliminar()
    return redirect(url_for('consultaGeneralEdificios'))
#fin del crud de edificios
#CRUD para Salas
@app.route('/salas')
def consultarSalas():
    s=Sala()
    salas=s.consultaGeneral()
    return  render_template('Salas/ConsultaSala.html',salas=salas)
@app.route('/salas/new')
def nuevaSala():
    e=Edificio()
    return render_template('Salas/altaSala.html',edificios=e.consultaGeneral())
@app.route('/salas/save',methods=['POST'])
def guardarSala():
    s=Sala()
    s.nombre=request.form['nombre']
    s.idEdificio=request.form['idEdificio']
    s.insertar()
    return redirect(url_for('consultarSalas'))
#fin de CRUD salas
#CRUD Alumnos
@app.route('/alumnos')
def cosultarAlumnos():
    a=Alumno()
    return render_template('Alumnos/ConsultaAlumnos.html',alumnos=a.consultaGeneral())

@app.route('/usuarios/registrar')
def registrarUsuario():
    return render_template('Usuarios/registrarUsuario.html')
@app.route('/usuarios/guardar',methods=['post'])
def guardarUsuario():
    u=Usuario()
    u.nombre=request.form['nombre']
    print(request.form['sexo'])
    u.sexo = request.form['sexo']
    u.telefono = request.form['telefono']
    u.email=request.form['email']
    u.password = request.form['password']
    u.tipo = request.form['tipo']
    u.estatus = request.form['estatus']
    u.insertar()
    return redirect(url_for("inicio"))
@app.errorhandler(404)
def error_404(e):
    return render_template('Comunes/error.html',mensaje='Error'),404

@app.errorhandler(500)
def error_500(e):
    return render_template('Comunes/error.html',mensaje='Error'),500

if __name__=='__main__':
    db.init_app(app)
    app.run(debug=True)