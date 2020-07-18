import medicineActionTypes from './medicine.types';

export const addMedicine = medicine => ({
    type: medicineActionTypes.ADD_MEDICINE,
    payload: medicine
})

export const removeMedicine = medicine => ({
    type: medicineActionTypes.REMOVE_MEDICINE,
    payload: medicine
})

export const searchMedicine = medicine => ({
    type: medicineActionTypes.SEARCH_MEDICINE,
    payload: medicine
})