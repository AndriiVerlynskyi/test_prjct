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
    FETCH_PRODUCT_BY_ID_DENIED,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_DENIED,
    SORT_PRODUCTS_BY_ALPHABET,
    SORT_PRODUCTS_BY_COUNT
} from '../types';

const initialState = {
    isLoading: false,
    products: [],
    sortedBy: '',
    singleProduct: {
        size:{
            width:'',
            height:''
        }
    },
    errors:{
        getError: null,
        saveError: null,
        deleteError: null,
        getByIdError: null,
        editEroor: null
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

        case FETCH_PRODUCT_BY_ID_REQUEST:
            return{
                ...state,
                isLoading: action.isLoading
            }
        case FETCH_PRODUCT_BY_ID_SUCCESS:
            return{
                ...state,
                isLoading: action.isLoading,
                singleProduct: {
                    ...state.singleProduct,
                    ...action.payload
                }

            }
        case FETCH_PRODUCT_BY_ID_DENIED:
            return{
                ...state,
                isLoading: action.isLoading,
                errors:{
                    ...state.errors,
                    getByIdError: action.error
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

        case EDIT_PRODUCT_REQUEST:
            return{
                ...state,
                isLoading: action.isLoading
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case EDIT_PRODUCT_DENIED:
            return {
                ...state,
                isLoading: action.isLoading,
                errors:{
                    ...state.errors,
                    editError: action.error
                }
            }

        
        
        case SORT_PRODUCTS_BY_ALPHABET:
            return {
                ...state,
                sortedBy: action.sortedBy
            } 
        case SORT_PRODUCTS_BY_COUNT: 
            return {
                ...state,
                sortedBy: action.sortedBy
            }

        default:
            return state
    }
}

export default productReducer