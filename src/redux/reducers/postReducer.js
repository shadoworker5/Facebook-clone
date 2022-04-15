import { PostTypes } from '../contants/post-types';

const initialState = {
    loading: true,
    posts: []
};

export const postReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case PostTypes.FETCH_POSTS_REQUEST:
            return {...state, posts: payload, loading: false };
        default:
            return state;
    }
}

export const SelectedPostReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case PostTypes.SELECTED_POST_REQUEST:
            return {...state, ...payload, loading: false };
        case PostTypes.REMOVE_SELECTED_POST_REQUEST:
            return {};
        default:
            return state;
    }
}