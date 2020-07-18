import medicineActionTypes from './medicine.types';
import { checkMedicine, removeMedicine } from './medicine.utils';
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
                medicine: checkMedicine(state.medicine, action.payload)
            }

        case medicineActionTypes.REMOVE_MEDICINE:
            return {
                ...state,
                medicine: removeMedicine(state.medicine, action.payload)
            }

        case medicineActionTypes.SEARCH_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.filter(data => data.name.toLowerCase().includes(action.payload))
            }

        default:
            return state;
    }
}

export default medicineReducer;