export const checkAdmin = (currentData, newData) => {
    const existingAdmin = currentData.find(
        admin => admin.id === newData.id
    );

    if (existingAdmin) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data.id, ...newData }
                : data
        ))
    }

    return [...currentData, { ...newData }]
}

export const checkOfficer = (currentData, newData) => {
    const existingOfficer = currentData.find(
        officer => officer.id === newData.id
    );

    if (existingOfficer) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data.id, ...newData }
                : data
        ))
    }

    return [...currentData, { ...newData }]
}

export const checkDistributor = (currentData, newData) => {
    const existingDistributor = currentData.find(
        distributor => distributor.id === newData.id
    );

    if (existingDistributor) {
        return currentData.map(data => (
            data.id === newData.id
                ? { ...data.id, ...newData }
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