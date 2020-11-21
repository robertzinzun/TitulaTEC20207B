from flask import Flask,render_template

app=Flask(__name__)

@app.route('/')
def inicio():
    #return '<b>Hola mundo</b>' \
    #       '<br>' \
    #       '<button>Saludar</button>';
    return render_template('index.html')
@app.route('/otraRuta')
def otra_ruta():
    return 'Otra cosa'

@app.route('/login')
def login():
    return 'procesando credenciales'

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
@app.route('/docentes/edit')
def editarDocente():
    return render_template('Docentes/modificarDocente.html')
@app.route('/docentes/delete')
def eliminarDocente():
    return render_template('Docentes/eliminarDocente.html')
@app.route('/docentes')
def consultarDocentes():
    return render_template('Docentes/consultaDocentes.html')
#fin del CRUD de la tabla Docentes


if __name__=='__main__':
    app.run(debug=True)