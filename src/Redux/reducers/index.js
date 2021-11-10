import { combineReducers } from "redux";
import commentsReducer from "./commentsReducer";
import confModalReducer from "./confModalReducer";
import productReducer from "./productsReducer";


const rootReducer = combineReducers({
    productsData: productReducer,
    commentsData: commentsReducer,
    confModal: confModalReducer
})

export default rootReducer