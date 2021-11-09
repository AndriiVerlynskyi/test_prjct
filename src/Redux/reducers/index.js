import { combineReducers } from "redux";
import confModalReducer from "./confModalReducer";
import productReducer from "./productsReducer";


const rootReducer = combineReducers({
    productsData: productReducer,
    confModal: confModalReducer
})

export default rootReducer