export const checkRequest = (currentData, newData) => {

    const existingRequestItem = currentData.find(data => data.id === newData.id);

    if (existingRequestItem) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data, ...newData }
                : data
        ));
    }

    return [...currentData, { ...newData }]
}

export const removeRequest = (currentData, newData) => {
    const existingData = currentData.find(
        data => data.id === newData.id
    )

    if (existingData) {
        return currentData.filter(data => data.id !== newData.id)
    }
}