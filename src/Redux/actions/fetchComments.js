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
import {
    changeConfModalOnSuccessProductDelete,
    changeConfModalOnDeniedProductDelete
} from './confModal'

const fetchCommentsRequest = () => {
    return {
        type: FETCH_COMMENTS_REQUEST,
        isLoading:true
    }
}
const fetchCommentsSuccess = comments => {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        isLoading:false,
        payload: comments
    }
}
const fetchCommentsDenied = error => {
    return {
        type: FETCH_COMMENTS_DENIED,
        isLoading:false,
        payload: error
    }
}

export const fetchComments = () => {
  return (dispatch) => {
      dispatch(fetchCommentsRequest());
      fetch("http://localhost:3000/comments")
        .then(res => {
            if (!res.ok){
                throw Error('Fetch request is denied')
            } else {
                return res.json()
            }
        })
        .then(comments => {
            dispatch(fetchCommentsSuccess(comments))
        })
        .catch(err => {
            dispatch(fetchCommentsDenied(err.message))
        })
  }  
}

const addCommentToProductRequest = () => {
    return {
        type: ADD_COMMENT_TO_PRODUCT_REQUEST,
        isLoading: true
    }
}
const addCommentToProductSuccess = () => {
    return {
        type: ADD_COMMENT_TO_PRODUCT_SUCCESS,
        isLoading: false
    }
}
const addCommentToProductDenied = err => {
    return {
        type: ADD_COMMENT_TO_PRODUCT_DENIED,
        isLoading: false,
        error: err
    }
}

export const addCommentToProduct = (productId, comment) => {
    return (dispatch) => {
        dispatch(addCommentToProductRequest);
        fetch('http://localhost:3000/products/'+productId+'/comments', {
            method: 'POST',
            body: JSON.stringify(comment), 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then( resp => {
                if(resp.status === 201){
                    dispatch(addCommentToProductSuccess());
                    dispatch(fetchComments())
                }
            })
            .catch( err => {
                dispatch(addCommentToProductDenied(err));
            })
    }
}

const deleteCommentSuccess = () =>{
    return {
        type: DELETE_COMMENT_FOR_PRODUCT_SUCCESS,

    }
}
const deleteCommentDenied = err =>{
    return {
        type: DELETE_COMMENT_FOR_PRODUCT_DENIED,
        error: err
    }
}

export const deleteComment = (productId, commentId) => {
    return (dispatch) => {
        fetch('http://localhost:3000/products/'+productId+'/comments/'+commentId,{
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json; charset=UTF-8' 
            },
        })
            .then(
                resp => {
                    if (resp.ok) {
                        dispatch(deleteCommentSuccess())
                        dispatch(changeConfModalOnSuccessProductDelete(true, commentId));
                        setTimeout(() => {
                            dispatch(changeConfModalOnSuccessProductDelete(false, commentId));
                        }, 2000)
                        dispatch(fetchComments())
                    } else {
                        throw Error("Delete wasn't successful")
                    }
                }
            )
            .catch(
                (err) => {
                    dispatch(deleteCommentDenied(err));
                    dispatch(changeConfModalOnDeniedProductDelete(commentId))
                }
            )
    }
}