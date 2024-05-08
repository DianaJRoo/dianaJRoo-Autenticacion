from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=True, nullable=True)
    salt = db.Column(db.String(90), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def __init__(self, first_name, last_name, email, salt, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.salt = salt

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            
            # do not serialize the password, its a security breach
        }