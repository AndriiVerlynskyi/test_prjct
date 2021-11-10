import {
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_DENIED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_DENIED,
    HIDE_CONFIRMATION_MODAL,
    DELETE_COMMENT_FOR_PRODUCT_SUCCESS,
    DELETE_COMMENT_FOR_PRODUCT_DENIED
} from '../types';

export const changeConfModalOnSuccessProductSave = name => {
    return {
        type: SAVE_PRODUCT_SUCCESS,
        confModalText: `${name} was successfully added!`,
        showConfModal: true
    }
}

export const changeConfModalOnDeniedProductSave = name => {
    return {
        type: SAVE_PRODUCT_DENIED,
        confModalText: `${name} wasn't added :(`,
        showConfModal: true
    }
}

export const changeConfModalOnSuccessProductDelete = (toShow, name) => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        confModalText: `${name} was successfully deleted`,
        showConfModal: toShow
    }
}

export const changeConfModalOnDeniedProductDelete = name => {
    return {
        type: DELETE_PRODUCT_DENIED,
        confModalText: `${name} wasn't deleted`,
        showConfModal:true
    }
}

export const changeConfModalOnSuccessCommentDelete = id => {
    return {
        type: DELETE_COMMENT_FOR_PRODUCT_SUCCESS,
        confModalText: `${id} was deleted`,
        showConfModal:true
    } 
}

export const changeConfModalOnDeniedCommentDelete = id => {
    return {
        type: DELETE_COMMENT_FOR_PRODUCT_DENIED,
        confModalText: `${id} wasn't deleted`,
        showConfModal:true
    } 
}


export const hideConfirmationModal = () => {
    return {
        type: HIDE_CONFIRMATION_MODAL,
        showConfModal: false
    }
}
