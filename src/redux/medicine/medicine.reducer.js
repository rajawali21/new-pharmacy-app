import medicineActionTypes from './medicine.types';
import { checkMedicine, removeMedicine, checkOptionMedicine } from './medicine.utils';
// import { checkMedicine } from './medicine.utils';

const INITIAL_STATE = {
    medicine: [],
    optionMedicine: [],
    stock: []
}

const medicineReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case medicineActionTypes.SET_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.concat(action.payload)
            }

        case medicineActionTypes.ADD_MEDICINE:
            return {
                ...state,
                medicine: checkMedicine(state.medicine, action.payload)
            }

        case medicineActionTypes.ADD_OPTION_MEDICINE:
            return {
                ...state,
                optionMedicine: checkOptionMedicine(state.optionMedicine, action.payload)
            }

        case medicineActionTypes.REMOVE_OPTION_MEDICINE:
            return {
                ...state,
                optionMedicine: removeMedicine(state.optionMedicine, action.payload)
            }

        case medicineActionTypes.REMOVE_MEDICINE:
            return {
                ...state,
                medicine: removeMedicine(state.medicine, action.payload)
            }

        case medicineActionTypes.ADD_STOCK:
            return {
                ...state,
                stock: checkMedicine(state.stock, action.payload)
            }

        case medicineActionTypes.REMOVE_STOCK:
            return {
                ...state,
                stock: removeMedicine(state.stock, action.payload)
            }

        default:
            return state;
    }
}

export default medicineReducer;