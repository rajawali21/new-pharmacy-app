import distributionActionTypes from './distribution.types';

export const addDistribution = distribution => ({
    type: distributionActionTypes.ADD_DISTRIBUTION,
    payload: distribution
})

export const removeDistribution = distribution => ({
    type: distributionActionTypes.REMOVE_DISTRIBUTION,
    payload: distribution
})

export const selectDistribution = distribution => ({
    type: distributionActionTypes.SELECT_DISTRIBUTION,
    payload: distribution
})