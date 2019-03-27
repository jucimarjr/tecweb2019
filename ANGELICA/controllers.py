import os
from app import app, db
from models import User
from flask import redirect
from flask import render_template
from flask import request, session, make_response, jsonify

@app.route('/lista',methods=["GET"])
def home2():
    users = User.query.all()

    output = []

    for user in users:
        user_data = {'cpf': user.usu_cpf, 'nome': user.usu_nome, 'status': user.usu_status}
        output.append(user_data)
    response = make_response(jsonify(output))
    return response

    #return render_template("home.html", users=output)


@app.route('/create', methods=["POST"])
def create_user():
    data = request.get_json()

    user = User(
        usu_cpf=data['cpf'], usu_nome=data['nome'], usu_status=data['status'], 
        usu_senha=data['senha']
    )

    db.session.add(user)
    db.session.commit()

    response = make_response(jsonify({'message': 'Usuario created!'}))
    return response



@app.route("/update", methods=["POST"])
def update():
    try:
        newName = request.form.get("newName")
        oldName = request.form.get("oldName")
        user = User.query.filter_by(title=oldName).first
        user.usu_nome = newName
        db.session.commit()
    except Exception as e:
        print(e)

    return redirect("/")

@app.route("/delete", methods=["POST"])
def delete():
    cpf = request.form.get("cpf")
    user = User.query.filter_by(title=cpf).first()
    db.session.delete(user)
    db.session.commit()
    return redirect("/")


