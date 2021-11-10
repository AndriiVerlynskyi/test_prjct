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

export const fetchProducts = (sortBySelector = '') => {
  return (dispatch) => {
      dispatch(fetchProductsRequest());
      fetch("http://localhost:3000/products"+sortBySelector)
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
            'Content-type': 'application/json; charset=UTF-8' 
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

export const fetchProductById = id => {
    return (dispatch) => {
        dispatch(fetchProductByIdRequest());
        fetch(`http://localhost:3000/products/${id}`)
          .then(res => {
              if (!res.ok){
                  throw Error('Fetch request is denied')
              } else {
                  return res.json()
              }
          })
          .then(product => {
              dispatch(fetchProductByIdSuccess(product))
          })
          .catch(err => {
              dispatch(fetchProductByIdDenied(err.message))
          })
    }  
  }


const editProductRequest = () => {
    return {
        type: EDIT_PRODUCT_REQUEST,
        isLoading: true
    }
}

const editProductSuccess = () => {
    return {
        type: EDIT_PRODUCT_SUCCESS,
        isLoading: false
    }
}

const editProductDenied = err => {
    return {
        type: EDIT_PRODUCT_DENIED,
        isLoading: false,
        error: err
    }
}

export const editProduct = (product, editedProduct) => {
    return (dispatch) => {
        dispatch(editProductRequest())
        fetch('http://localhost:3000/products/'+product.id, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json; charset=UTF-8'  
            },
            body: JSON.stringify(editedProduct)
        })
            .then( res => {
                if(res.ok){
                    dispatch(editProductSuccess())
                    dispatch(fetchProductById(product.id))
                }
            })
            .catch( err => dispatch(editProductDenied(err)))
    }
}


const sortProductsByAlphabetAction = () => {
    return {
        type: SORT_PRODUCTS_BY_ALPHABET,
        sortedBy: 'alphabet'
    }
}

const sortProductsByCountAction = () => {
        return {
            type: SORT_PRODUCTS_BY_COUNT,
            sortedBy: 'count'
        }
}

export const sortProductsByAlphabet = () => {
    return (dispatch) => {
        dispatch(fetchProducts('?_sort=name&_order=asc'));
        dispatch(sortProductsByAlphabetAction())
    }
}

export const sortProductsByCount = () => {
    return (dispatch) => {
        dispatch(fetchProducts('?_sort=count&_order=asc'))
        dispatch(sortProductsByCountAction())
    }
}