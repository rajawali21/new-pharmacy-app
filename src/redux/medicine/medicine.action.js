import medicineActionTypes from './medicine.types';

export const setMedicine = medicine => ({
    type: medicineActionTypes.SET_MEDICINE,
    payload: medicine
})

export const addMedicine = medicine => ({
    type: medicineActionTypes.ADD_MEDICINE,
    payload: medicine
})