import medicineActionTypes from './medicine.types';

export const addMedicine = medicine => ({
    type: medicineActionTypes.ADD_MEDICINE,
    payload: medicine
})

export const addOptionMedicine = medicine => ({
    type: medicineActionTypes.ADD_OPTION_MEDICINE,
    payload: medicine
})
export const removeOptionMedicine = medicine => ({
    type: medicineActionTypes.REMOVE_OPTION_MEDICINE,
    payload: medicine
})

export const removeMedicine = medicine => ({
    type: medicineActionTypes.REMOVE_MEDICINE,
    payload: medicine
})
