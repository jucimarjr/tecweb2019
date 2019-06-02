from flask import jsonify

from .messages import (
    MSG_INVALID_DATA,
    MSG_DOES_NOT_EXIST,
    MSG_EXCEPTION,
    MSG_ALREADY_EXISTS,
    MSG_DOES_NOT_EXIST,
    MSG_REFUSED_CREDENTIALS,
    MSG_DATA_ERROR,
    MSG_INVALIDI_REQUEST_ERROR
)


def resp_data_invalid(resource: str, errors: dict, msg: str = MSG_INVALID_DATA):
    '''
    Responses 422 Unprocessable Entity
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': msg,
        'errors': errors,
        'status': 422
    })

    return resp


def resp_refused_credentials(resource: str, errors: dict, msg: str = MSG_REFUSED_CREDENTIALS):
    '''
    Responses 401 authorization has been refused for those credentials.
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': msg,
        'errors': errors,
        'status': 401
    })

    return resp


def resp_exception(resource: str, description: str = ''):
    '''
    Responses 500
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': MSG_INVALIDI_REQUEST_ERROR.format(description),
        'status': 500
    })

    return resp


def resp_already_exists(resource: str, description: str):
    '''
    Responses 400
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': MSG_ALREADY_EXISTS.format(description),
        'status': 400
    })

    return resp


def resp_not_exist(resource: str, description: str):
    '''
    Responses 404
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': MSG_DOES_NOT_EXIST.format(description),
        'status': 404
    })

    return resp


def resp_data_error(resource: str, description: str = ''):
    '''
    Responses 422
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': MSG_DATA_ERROR.format(description),
        'status': 422
    })

    return resp


def resp_invalid_request_error(resource: str, description: str = ''):
    '''
    Responses 500
    '''

    if not isinstance(resource, str):
        raise ValueError('O recurso precisa ser uma string.')

    resp = jsonify({
        'resource': resource,
        'message': MSG_INVALIDI_REQUEST_ERROR.format(description),
        'status': 500
    })

    return resp


def resp_ok(resource: str, message: str, data=None, **extras):
    '''
    Responses 200
    '''

    response = {'status': 200, 'message': message, 'resource': resource}

    if data:
        response['data'] = data

    response.update(extras)

    resp = jsonify(response)

    return resp
