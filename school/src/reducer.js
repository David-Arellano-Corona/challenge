import { combineReducers } from 'redux';
import {userForm,showUserForm} from './modules/users/reducers';

export default combineReducers({
    userForm,
    showUserForm
})