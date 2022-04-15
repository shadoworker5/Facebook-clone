import { UserTypes } from '../contants/user-types';

export const fecthUsers = (users) => {
    return {
        type : UserTypes.FETCH_USERS_REQUEST,
        payload: users
    }
}

export const selectedUser = (user) => {
    return {
        type : UserTypes.SELECTED_USER_REQUEST,
        payload: user
    }
}

export const removeSelectedUser = () => {
    return {
        type : UserTypes.REMOVE_SELECTED_USER_REQUEST
    }
}