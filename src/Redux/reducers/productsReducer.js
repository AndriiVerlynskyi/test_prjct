import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_DENIED,
    SAVE_PRODUCT_REQUEST,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_DENIED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_DENIED,
    FETCH_PRODUCT_BY_ID_REQUEST,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_DENIED
} from '../types';

const initialState = {
    isLoading: false,
    products: [],
    errors:{
        getError: null,
        saveError: null,
        deleteError: null,
        getByIdError: null
    }
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
                errors:{
                    ...state.errors,
                    getError: action.payload
                }
            }
        case SAVE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SAVE_PRODUCT_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                errors:{
                    ...state.errors,
                    saveError: action.error
                }
            }
        case DELETE_PRODUCT_SUCCESS:
            return state



        case DELETE_PRODUCT_DENIED:
            return {
                ...state,
                errors:{
                    ...state.errors,
                    deleteError: action.error
                }
            }
        default:
            return state
    }
}

export default productReducer