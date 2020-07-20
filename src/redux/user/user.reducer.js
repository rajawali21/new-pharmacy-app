import userActionTypes from './user.types';
import { checkAdmin, checkOfficer, checkDistributor } from './user.utils';

const INITIAL_STATE = {
    currentUser: null,
    admin: [],
    officer: [],
    distributor: [],
    selectedUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        case userActionTypes.ADD_ADMIN:
            return {
                ...state,
                admin: checkAdmin(state.admin, action.payload)
            }

        case userActionTypes.ADD_OFFICER:
            return {
                ...state,
                officer: checkOfficer(state.officer, action.payload)
            }

        case userActionTypes.ADD_DISTRIBUTOR:
            return {
                ...state,
                distributor: checkDistributor(state.distributor, action.payload)
            }

        case userActionTypes.ADD_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;