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

if __name__=='__main__':
    app.run(debug=True)