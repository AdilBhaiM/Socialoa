import { postActionTypes } from "../constants/Post.ActionTypes";

const initialState = {
  posts: [],
};

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case postActionTypes.ALL_POSTS:
      console.log("case--ALL_POSTS");
      return {
        ...state,
        posts: action.payload,
      };
    case postActionTypes.POST_BY_ID:
      console.log("case--POST_BY_ID");
      return {
        ...state,
        authUser: action.payload,
      };
    case postActionTypes.CREATE_POST:
      console.log("case--CREATE_POST");
      return {
        ...state,
        authUser: action.payload,
      };
    case postActionTypes.UPDATE_POST:
      console.log("case--UPDATE_POST");
      return {
        ...state,
        authUser: null,
      };
    case postActionTypes.DELETE_POST:
      console.log("case--DELETE_POST");
      return {
        ...state,
        authUser: null,
      };
    default:
      return state;
  }
};
