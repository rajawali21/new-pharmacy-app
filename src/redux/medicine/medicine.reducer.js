import medicineActionTypes from './medicine.types';
// import { checkMedicine } from './medicine.utils';

const INITIAL_STATE = {
    medicine: []
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
                medicine: [...state.medicine, action.payload]
            }

        default:
            return state;
    }
}

export default medicineReducer;