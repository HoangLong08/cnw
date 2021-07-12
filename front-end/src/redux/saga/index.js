	import { fork } from "redux-saga/effects";
	import authSaga from "./user/auth.saga";
	import productSaga from "./user/product.saga";

	import authAdminSaga from './admin/auth.saga';
	import productAdminSaga from './admin/product.saga';
	import userAdminSaga from "./admin/user.saga";
	import orderAdminSaga from './admin/order.saga'

	export default function* mySaga() {
		yield fork(productSaga);
		yield fork(authSaga);

		// admin
		yield fork(authAdminSaga)
		yield fork(productAdminSaga)
		yield fork(userAdminSaga)
		yield fork(orderAdminSaga)
	}
