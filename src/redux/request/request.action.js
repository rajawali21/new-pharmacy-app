import requestActionTypes from './request.types';

export const addRequest = request => ({
    type: requestActionTypes.ADD_REQUEST,
    payload: request
})

export const removeRequest = request => ({
    type: requestActionTypes.REMOVE_REQUEST,
    payload: request
})