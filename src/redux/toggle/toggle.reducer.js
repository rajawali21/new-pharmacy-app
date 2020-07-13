import toggleActionTypes from './toggle.types';

const INITIAL_STATE = {
    toggleOverlay: false
}

const toggleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toggleActionTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                toggleOverlay: !state.toggleOverlay
            }

        default:
            return state;
    }
}
export default toggleReducer;