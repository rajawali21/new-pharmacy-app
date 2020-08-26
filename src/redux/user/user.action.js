import userActionTypes from './user.types';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})

export const addAdmin = user => ({
    type: userActionTypes.ADD_ADMIN,
    payload: user
})

export const addOfficer = user => ({
    type: userActionTypes.ADD_OFFICER,
    payload: user
})

export const addDistributor = user => ({
    type: userActionTypes.ADD_DISTRIBUTOR,
    payload: user
})

export const deleteDistributor = user => ({
    type: userActionTypes.DELETE_DISTRIBUTOR,
    payload: user
})

export const addSelectedUser = user => ({
    type: userActionTypes.ADD_SELECTED_USER,
    payload: user
})