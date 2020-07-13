import { combineReducers } from 'redux';
import toggleReducer from './toggle/toggle.reducer';

export default combineReducers({
    toggle: toggleReducer
});