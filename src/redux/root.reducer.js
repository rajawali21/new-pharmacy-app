import { combineReducers } from 'redux';
import toggleReducer from './toggle/toggle.reducer';
import userReducer from './user/user.reducer';
import medicineReducer from './medicine/medicine.reducer';

export default combineReducers({
    toggle: toggleReducer,
    user: userReducer,
    medicine: medicineReducer
});