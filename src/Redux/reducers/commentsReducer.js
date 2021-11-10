import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_DENIED,
    ADD_COMMENT_TO_PRODUCT_REQUEST,
    ADD_COMMENT_TO_PRODUCT_SUCCESS,
    ADD_COMMENT_TO_PRODUCT_DENIED,
    DELETE_COMMENT_FOR_PRODUCT_SUCCESS,
    DELETE_COMMENT_FOR_PRODUCT_DENIED
} from '../types';

const initialState = {
    isLoading: false,
    comments:[],
    errors:{
        fetchCommentsError: null,
        addCommentError: null,
        deleteCommentError: null
    }
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_COMMENTS_REQUEST:
            return {
            ...state,
            isLoading: action.isLoading
        }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                comments: action.payload
            }
        case FETCH_COMMENTS_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                errors:{
                    ...state.errors,
                    getError: action.payload
                }
            }
        case ADD_COMMENT_TO_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case ADD_COMMENT_TO_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case ADD_COMMENT_TO_PRODUCT_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                errors: {
                    ...state.errors,
                    addCommentError: action.error
                }
            }

        case DELETE_COMMENT_FOR_PRODUCT_SUCCESS:
            return state

        case DELETE_COMMENT_FOR_PRODUCT_DENIED:
            return {
                ...state,
                errors:{
                    ...state.errors,
                    deleteCommentError: action.error
                }
            }
        default:
            return state
}}

export default commentsReducer