import { combineReducers } from "redux";
import { userReducer, selectedUserReducer } from "./userReducer";
import { postReducer, SelectedPostReducer } from "./postReducer";

const reducers = combineReducers({
    allUsers    : userReducer,
    user        : selectedUserReducer,
    allPosts    : postReducer,
    post        : SelectedPostReducer
});

export default reducers;