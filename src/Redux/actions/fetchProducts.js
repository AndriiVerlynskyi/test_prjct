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
import { 
    changeConfModalOnDeniedProductDelete,
    changeConfModalOnSuccessProductDelete,
    changeConfModalOnDeniedProductSave,
    changeConfModalOnSuccessProductSave
} from './confModal';

const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
        isLoading:true
    }
}
const fetchProductsSuccess = products => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        isLoading:false,
        payload: products
    }
}
const fetchProductsDenied = error => {
    return {
        type: FETCH_PRODUCTS_DENIED,
        isLoading:false,
        payload: error
    }
}

export const fetchProducts = () => {
  return (dispatch) => {
      dispatch(fetchProductsRequest());
      fetch("http://localhost:3000/products")
        .then(res => {
            if (!res.ok){
                throw Error('Fetch request is denied')
            } else {
                return res.json()
            }
        })
        .then(products => {
            dispatch(fetchProductsSuccess(products))
        })
        .catch(err => {
            dispatch(fetchProductsDenied(err.message))
        })
  }  
}


const saveProductRequest = () => {
    return {
        type: SAVE_PRODUCT_REQUEST,
        isLoading:true
    }
}
const saveProductSuccess = () => {
    return {
        type: SAVE_PRODUCT_SUCCESS,
        isLoading: false
    }
}
const saveProductDenied = err => {
    return {
        type: SAVE_PRODUCT_DENIED,
        isLoading: false,
        error: err
    }
}

export const saveProduct = product => {
    return (dispatch) => {
        dispatch(saveProductRequest());
        fetch('http://localhost:3000/products', {
            method: 'POST',
            body: JSON.stringify(product), 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then( resp => {
                if(resp.status === 201){
                    dispatch(saveProductSuccess());
                    dispatch(changeConfModalOnSuccessProductSave(product.name));
                    dispatch(fetchProducts());
                }
            })
            .catch( err => {
                dispatch(saveProductDenied(err));
                dispatch(changeConfModalOnDeniedProductSave(product.name))
            })
    }
}

const deleteProductSuccess = () =>{
    return {
        type: DELETE_PRODUCT_SUCCESS
    }
}
const deleteProductDenied = err =>{
    return {
        type: DELETE_PRODUCT_DENIED,
        error: err
    }
}

export const deleteProduct = (id, name) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/products/${id}`,{
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
        })
            .then(
                resp => {
                    if (resp.status === 200) {
                        dispatch(deleteProductSuccess())
                        dispatch(changeConfModalOnSuccessProductDelete(true, name));
                        setTimeout(() => {
                            dispatch(changeConfModalOnSuccessProductDelete(false, name));
                        }, 2000)
                        dispatch(fetchProducts())
                    } else {
                        throw Error("Delete wasn't successful")
                    }
                }
            )
            .catch(
                (err) => {
                    dispatch(deleteProductDenied(err));
                    dispatch(changeConfModalOnDeniedProductDelete(name))
                }
            )
    }
}



const fetchProductByIdRequest = () => {
    return {
        type: FETCH_PRODUCT_BY_ID_REQUEST,
        isLoading: true
    }
}

const fetchProductByIdSuccess = product => {
    return {
        type: FETCH_PRODUCT_BY_ID_SUCCESS,
        isLoading: false,
        payload: product
    }
}

const fetchProductByIdDenied = err => {
    return {
        type: FETCH_PRODUCT_BY_ID_DENIED,
        isLoading: false,
        error: err
    }
}

