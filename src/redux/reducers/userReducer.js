import { UserTypes } from '../contants/user-types';

const initialState = {
    loading: false,
    users: []
};

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case UserTypes.FETCH_USERS_REQUEST:
            return {...state, users: payload, loading: true };
            
        default:
            return state;
    }
}

export const selectedUserReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case UserTypes.SELECTED_USER_REQUEST:
            return {...state, ...payload, loading: true };
        
        case UserTypes.REMOVE_SELECTED_USER_REQUEST:
        return { };
            
        default:
            return state;
    }
}