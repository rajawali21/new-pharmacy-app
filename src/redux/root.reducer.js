import { combineReducers } from 'redux';
import toggleReducer from './toggle/toggle.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    toggle: toggleReducer,
    user: userReducer
});