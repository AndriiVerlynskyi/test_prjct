import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_DENIED,
    SAVE_PRODUCT_REQUEST,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_DENIED
} from '../types';

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
        isLoading:true,
        isSaved: null
    }
}

const saveProductSuccess = () => {
    return {
        type: SAVE_PRODUCT_SUCCESS,
        isLoading: false,
        isSaved: true
    }
}

const saveProductDenied = err => {
    return {
        type: SAVE_PRODUCT_DENIED,
        isLoading: false,
        isSaved: false,
        saveError: err
    }
}

export const savePost = post => {
    return (dispatch) => {
        dispatch(saveProductRequest());
        fetch('http://localhost:3000/products', {
            method: 'POST',
            body: JSON.stringify(post), 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then( resp => {
                if(resp.status === 201){
                    dispatch(saveProductSuccess())
                }
            })
            .catch( err => {
                dispatch(saveProductDenied(err))
            })
    }
}