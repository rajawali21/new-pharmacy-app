export const checkData = (currentData, newData) => {
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

export const removeData = (currentData, newData) => {
    const existingData = currentData.find(
        data => data.id === newData.id
    )

    if (existingData) {
        return currentData.filter(data => data.id !== newData.id)
    }
}