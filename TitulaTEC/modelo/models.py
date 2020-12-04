from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,Integer,String,ForeignKey
from flask_login import UserMixin
#from app import db
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

db=SQLAlchemy()

class Edificio(db.Model):
    __tablename__='Edificios'
    idEdificio=Column(Integer,primary_key=True)
    nombre=Column(String,unique=True)
    salas=relationship('Sala',backref='edificio',lazy='dynamic')
    def insertar(self):
        db.session.add(self)
        db.session.commit()
    def consultaGeneral(self):
        edificios=self.query.all()
        return edificios
    def actualizar(self):
        db.session.merge(self)
        db.session.commit()
    def eliminar(self):
        edificio=self.consultaIndividual()
        db.session.delete(edificio)
        db.session.commit()
    def consultaIndividual(self):
        edificio=self.query.get(self.idEdificio)
        return edificio

class Sala(db.Model):
    __tablename__='Salas'
    idSala=Column(Integer,primary_key=True)
    nombre=Column(String,unique=True)
    idEdificio=Column(Integer,ForeignKey('Edificios.idEdificio'))
    def insertar(self):
        db.session.add(self)
        db.session.commit()
    def consultaGeneral(self):
        salas=self.query.all()
        return salas
    def actualizar(self):
        db.session.merge(self)
        db.session.commit()
    def eliminar(self):
        sala=self.consultaIndividual()
        db.session.delete(sala)
        db.session.commit()
    def consultaIndividual(self):
        sala=self.query.get(self.idSala)
        return sala

class Usuario(UserMixin,db.Model):
    __tablename__='Usuarios'
    idUsuario=Column(Integer,primary_key=True)
    nombre=Column(String,nullable=False)
    sexo=Column(String,nullable=False)
    telefono=Column(String,nullable=False)
    email=Column(String,nullable=False)
    password_hash=Column(String(128),nullable=False)
    tipo=Column(String,nullable=False)
    estatus=Column(String,nullable=False)

    def insertar(self):
        db.session.add(self)
        db.session.commit()
    def consultaGeneral(self):
        salas=self.query.all()
        return salas
    def actualizar(self):
        db.session.merge(self)
        db.session.commit()
    def eliminar(self):
        usuario=self.consultaIndividual()
        db.session.delete(usuario)
        db.session.commit()
    def consultaIndividual(self):
        usuario=self.query.get(self.idUsuario)
        return usuario
    @property
    def password(self):
        raise AttributeError('El atributo password no es de lectura')
    @password.setter
    def password(self,password):
        self.password_hash=generate_password_hash(password)
    def validarPassword(self,password):
        return check_password_hash(self.password_hash,password)

    def is_authenticated(self):
        return True
    def is_active(self):
        if self.estatus=='A':
            return True
        else:
            return False
    def is_anonymous(self):
        return False
    def get_id(self):
        return self.idUsuario
    def is_admin(self):
        if self.tipo=='A':
            return True
        else:
            return False
    def getTipo(self):
        return self.tipo
    def validar(self,email,password):
        user= Usuario.query.filter_by(email=email,estatus='A').first()
        if user!=None:
            if user.validarPassword(password):
                return user
        else:
             return None


class Carrera(db.Model):
    __tablename__='Carreras'
    idCarrera=Column(Integer,primary_key=True)
    nombre=Column(String,nullable=False)
    siglas = Column(String, nullable=False)
    creditos = Column(Integer, nullable=False)
    planEstudios = Column(String, nullable=False)
    especialidad = Column(String, nullable=False)
    noEmpleado = Column(Integer, ForeignKey('Administrativos.noEmpleado'))
    alumnos = relationship('Alumno', backref='carrera')
    def insertar(self):
        db.session.add(self)
        db.session.commit()
    def consultaGeneral(self):
        return self.query.all()
    def actualizar(self):
        db.session.merge(self)
        db.session.commit()
    def eliminar(self):
        db.session.delete(self.consultaIndividual())
        db.session.commit()
    def consultaIndividual(self):
        return self.query.get(self.idCarrera)


class Alumno(db.Model):
    __tablename__='Alumnos'
    nocontrol=Column(String,primary_key=True)
    anioEgreso=Column(Integer,nullable=False)
    creditos=Column(Integer,nullable=False)
    idUsuario=Column(Integer,ForeignKey('Usuarios.idUsuario'))
    idCarrera=Column(Integer,ForeignKey('Carreras.idCarrera'))
    usuario = relationship('Usuario', backref='alumno')
    def insertar(self):
        db.session.add(self)
        db.session.commit()
    def consultaGeneral(self):
        return self.query.all()
    def actualizar(self):
        db.session.merge(self)
        db.session.commit()
    def eliminar(self):
        db.session.delete(self.consultaIndividual())
        db.session.commit()
    def consultaIndividual(self):
        return self.query.get(self.nocontrol)

class Administrativo(db.Model):
    __tablename__='Administrativos'
    noEmpleado = Column(Integer, primary_key=True)
    puesto = Column(String, nullable=False)
    estatus = Column(String, nullable=False)
    idUsuario = Column(Integer, ForeignKey('Usuarios.idUsuario'))
    usuario = relationship('Usuario', backref='administrativo')
    def insertar(self):
        db.session.add(self)
        db.session.commit()

    def consultaGeneral(self):
        return self.query.all()

    def actualizar(self):
        db.session.merge(self)
        db.session.commit()

    def eliminar(self):
        db.session.delete(self.consultaIndividual())
        db.session.commit()

    def consultaIndividual(self):
        return self.query.get(self.noEmpleado)

