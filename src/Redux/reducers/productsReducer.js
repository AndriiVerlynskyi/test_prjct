import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_DENIED,
    SAVE_PRODUCT_REQUEST,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_DENIED
} from '../types';

const initialState = {
    isLoading: false,
    products: [],
    error: null,
    isSaved: null,
    saveError: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_PRODUCTS_REQUEST:
            return {
            ...state,
            isLoading: action.isLoading
        }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                products: action.payload
            }
        case FETCH_PRODUCTS_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                error: action.payload
            }
        case SAVE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                isSaved: action.isSaved
            }
        case SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                isSaved: action.isSaved
            }
        case SAVE_PRODUCT_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                isSaved: action.isSaved
            }
        default:
            return state
    }
}

export default productReducer