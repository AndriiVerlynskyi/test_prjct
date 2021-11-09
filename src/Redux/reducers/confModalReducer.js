import {
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_DENIED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_DENIED,
    HIDE_CONFIRMATION_MODAL
} from '../types';

const initialState = {
    confModalText: '',
    showConfModal: false
}

const confModalReducer = (state = initialState, action) => {
        switch (action.type) {
            case SAVE_PRODUCT_SUCCESS:
                return {
                    ...state,
                    confModalText: action.confModalText,
                    showConfModal: action.showConfModal
                }
            case SAVE_PRODUCT_DENIED:
                return {
                    ...state,
                    confModalText: action.confModalText,
                    showConfModal: action.showConfModal
                }

            case DELETE_PRODUCT_SUCCESS:
                return {
                    ...state,
                    confModalText: action.confModalText,
                    showConfModal: action.showConfModal
                }
            case DELETE_PRODUCT_DENIED:
                return {
                    ...state,
                    confModalText: action.confModalText,
                    showConfModal: action.showConfModal
                }

            case HIDE_CONFIRMATION_MODAL:
                return {
                    ...state,
                    showConfModal: action.showConfModal
                }
            default :
                return state
        }
}

export default confModalReducer