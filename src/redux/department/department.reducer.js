import departmentActionTypes from './department.types';
import { checkData, removeData } from './department.utils';

const INITIAL_STATE = {
    department: [],
    stock: []
}

const departmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case departmentActionTypes.ADD_DEPARTMENT:
            return {
                ...state,
                department: checkData(state.department, action.payload)
            }


        case departmentActionTypes.REMOVE_DEPARTMENT:
            return {
                ...state,
                department: removeData(state.department, action.payload)
            }

        case departmentActionTypes.ADD_STOCK:
            return {
                ...state,
                stock: checkData(state.stock, action.payload)
            }

        case departmentActionTypes.REMOVE_STOCK:
            return {
                ...state,
                stock: removeData(state.stock, action.payload)
            }

        default:
            return state;
    }
}

export default departmentReducer;