import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import history from '../../../utils/history';
import { URL } from '../../../constants/app'
import authHeader from "../../../services/auth-header.js";

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};
function* getProductListSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'product/getAllProduct'
		});
		yield put({
			type: "GET_PRODUCT_LIST_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_LIST_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* getProductNewListSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'product/listNewProduct'
		});
		yield put({
			type: "GET_PRODUCT_NEW_LIST_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_NEW_LIST_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* getProductMostListSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'product/getProductMostSold'
		});
		yield put({
			type: "GET_PRODUCT_MOST_LIST_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_MOST_LIST_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* getProductDetailSaga(actions) {
	try {
		const { id } = actions.payload;
		const result = yield axios({
			method: 'GET',
			url: URL + `product/getProductById/${id}`,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_PRODUCT_DETAIL_SUCCESS",
				payload: {
					data: result.data,
				},
			});
		} else {

			yield put({
				type: "GET_PRODUCT_DETAIL_FAIL",
				payload: {
					error: result.status
				},
			});
		}

	} catch (e) {
		yield put({
			type: "GET_PRODUCT_DETAIL_FAIL",
			payload: {
				error: 404
			},
		});
	}
}

function* orderProductSaga(actions) {
	const { address, city, district, name, note, phone, products, street } = actions.payload
	console.log("actions.payload 123: ", actions.payload)
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'order',
			data: {
				address: address,
				city: city,
				district: district,
				name: name,
				note: note,
				phone: phone,
				products: products,
				street: street
			},
			headers: authHeader()
		});
		if (result.status === 200) {
			yield put({
				type: "ORDER_PRODUCT_SUCCESS",
				payload: {
					data: true
				},
			});
			yield history.push('/order-success');
		}
	} catch (error) {
		if (error.response.status === 401) {
			yield openNotificationWithIcon('error', 'Đặt hàng thất bại')
		}
	}
}

function* getProductOrderHistorySaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'order/history',
			headers: authHeader()
		});
		console.log("result: ", result)
		yield put({
			type: "GET_PRODUCT_HISTORY_ORDER_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_HISTORY_ORDER_FAIL",
			payload: {
				error: "Lỗi"
			},
		});
	}
}

function* getProductCategorySaga(actions) {
	const { categoryName } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'product/getProductBySuppliers/' + categoryName,
			headers: authHeader()
		});
		console.log("result: ", result)
		yield put({
			type: "GET_PRODUCT_CATEGORY_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_CATEGORY_FAIL",
			payload: {
				error: "Lỗi"
			},
		});
	}
}



function* getProductSearchSaga(action) {
	const { search } = action.payload
	console.log("saga search: ", search.split(" ").join("_"))
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'search/' + search,
		});
		console.log("result search: ", result)
		yield put({
			type: "GET_PRODUCT_SEARCH_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_SEARCH_FAIL",
			payload: {
				error: "Lỗi"
			},
		});
	}
}

export default function* productSaga() {
	yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
	yield takeEvery('GET_PRODUCT_NEW_LIST_REQUEST', getProductNewListSaga)
	yield takeEvery('GET_PRODUCT_MOST_LIST_REQUEST', getProductMostListSaga)
	yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
	yield takeEvery('ORDER_PRODUCT_REQUEST', orderProductSaga);
	yield takeEvery('GET_PRODUCT_HISTORY_ORDER_REQUEST', getProductOrderHistorySaga)
	yield takeEvery('GET_PRODUCT_CATEGORY_REQUEST', getProductCategorySaga)
	yield takeEvery('GET_PRODUCT_SEARCH_REQUEST', getProductSearchSaga)
}
