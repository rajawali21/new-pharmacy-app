import departmentActionTypes from './department.types';

export const addDepartment = department => ({
    type: departmentActionTypes.ADD_DEPARTMENT,
    payload: department
})

export const removeDepartment = department => ({
    type: departmentActionTypes.REMOVE_DEPARTMENT,
    payload: department
})

export const addStock = department => ({
    type: departmentActionTypes.ADD_STOCK,
    payload: department
})

export const removeStock = department => ({
    type: departmentActionTypes.REMOVE_STOCK,
    payload: department
})
