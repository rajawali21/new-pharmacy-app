export const checkMedicine = (currentData, newData) => {
    const existingCartItem = currentData.find(
        cartItem => cartItem.id === newData.id
    );

    if (existingCartItem) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data, ...newData }
                : data
        ))
    }

    return [...currentData, { ...newData }]
}

export const checkOptionMedicine = (currentData, newData) => {
    const existingOptionMedicine = currentData.find(
        medicine => medicine.id === newData.id
    );

    if (existingOptionMedicine) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data, value: newData.value, label: newData.label, quantity: newData.quantity }
                : data
        ))
    }

    return [...currentData, { ...newData }]
}

export const removeMedicine = (currentData, newData) => {
    const existingData = currentData.find(
        data => data.id === newData.id
    )

    if (existingData) {
        return currentData.filter(data => data.id !== newData.id)
    }
}