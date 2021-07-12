import { combineReducers } from "redux";
import authReducer from "./user/auth.reducer";
import cartReducer from "./user/cart.reducer";
import productReducer from "./user/product.reducer";

import authAdminReducer from "./admin/auth.reducer";
import productAdminReducer from "./admin/product.reducer"
import userAdminReducer from './admin/user.reducer'
import orderAdminReducer from './admin/order.reducer'

export default combineReducers({
	productReducer: productReducer,
	cartReducer: cartReducer,
	authReducer: authReducer,

	// admin
	authAdminReducer: authAdminReducer,
	productAdminReducer: productAdminReducer,
	userAdminReducer: userAdminReducer,
	orderAdminReducer: orderAdminReducer,
})