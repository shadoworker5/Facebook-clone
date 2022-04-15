import { PostTypes } from '../contants/post-types';

export const fecthPosts = (posts) => {
    return {
        type : PostTypes.FETCH_POSTS_REQUEST,
        payload: posts
    }
}

export const selectedPost = (post) => {
    return {
        type : PostTypes.SELECTED_POST_REQUEST,
        payload: post
    }
}

export const removeSelectedPost = () => {
    return {
        type : PostTypes.REMOVE_SELECTED_POST_REQUEST
    }
}