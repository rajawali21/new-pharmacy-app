import toggleActionTypes from './toggle.types';

const INITIAL_STATE = {
    toggleOverlay: false,
    toggleRightDetail: false
}

const toggleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toggleActionTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                toggleOverlay: !state.toggleOverlay
            }

        case toggleActionTypes.TOGGLE_RIGHT_DETAIL:
            return {
                ...state,
                toggleRightDetail: action.payload ? true : !state.toggleRightDetail
            }

        default:
            return state;
    }
}
export default toggleReducer;