import distributionActionTypes from './distribution.types';
import { checkData, removeData } from './distribution.utils';

const INITIAL_STATE = {
    distribution: [],
    selectedDistribution: []
}

const departmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case distributionActionTypes.ADD_DISTRIBUTION:
            return {
                ...state,
                distribution: checkData(state.distribution, action.payload)
            }

        case distributionActionTypes.REMOVE_DISTRIBUTION:
            return {
                ...state,
                distribution: removeData(state.distribution, action.payload)
            }

        case distributionActionTypes.SELECT_DISTRIBUTION:
            return {
                ...state,
                selectedDistribution: checkData(state.selectedDistribution, action.payload)
            }


        default:
            return state;
    }
}

export default departmentReducer;