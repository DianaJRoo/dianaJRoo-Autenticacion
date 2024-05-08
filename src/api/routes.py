"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email == None or password == None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    user = User.query.filter_by(email=email).one_or_none() 

    if user != None:
        if password == user.password:
         access_token = create_access_token(identity=email)
         return jsonify(access_token=access_token)
        
    return jsonify({"msg": "User not found"}), 404  

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).one_or_none()
    return jsonify(user.serialize()), 200 



@api.route('/register', methods=['POST'])
def create_user():
    request_body = request.get_json()

    # Verificar si se proporcionaron datos en la solicitud
    if not request_body:
        return jsonify({"msg": "No data provided"}), 400

    email = request_body.get('email')
    password = request_body.get('password')
    first_name = request_body.get('first_name')
    last_name = request_body.get('last_name')

    # Verificar si se proporcionaron correo electrónico, contraseña, first_name y last_name
    if not email:
        return jsonify({'msg': 'Email required'}), 400

    if not password:
        return jsonify({'msg': 'Password required'}), 400

    if not first_name or not last_name:
        return jsonify({'msg': 'First name and last name required'}), 400

    # Verificar si el correo electrónico ya está registrado
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'msg': 'Email already exists'}), 409

    try:
        # Generar sal y hash de la contraseña
        salt = bcrypt.gensalt()
        hash_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        # Crear un nuevo usuario
        new_user = User(email=email, password=hash_password.decode('utf-8'), salt=salt.decode('utf-8'), first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()

        # Devolver la respuesta con los detalles del nuevo usuario
        return jsonify({"msg": "User registered successfully", "user": new_user.serialize()}), 201
    except Exception as e:
        # Revertir la transacción en caso de error
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 400


      
