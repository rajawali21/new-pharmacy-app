export const checkMedicine = (currentData, newData) => {
    const existingData = currentData.find(
        currentData => currentData.id === newData.id
    );

    if (existingData) {
        return currentData.map(data => (
            data.id !== newData.id && [...currentData, newData]
        ))
    }

    return [...currentData, newData]
}
