import { combineReducers } from "redux";
import productReducer from "./productsReducer";


const rootReducer = combineReducers({
    productsData: productReducer
})

export default rootReducer