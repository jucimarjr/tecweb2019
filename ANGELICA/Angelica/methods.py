from flask import jsonify

def mensagem_feedback(success, message):

    message = {
        "sucess": success,
        "message": message
    }

    return jsonify(message)