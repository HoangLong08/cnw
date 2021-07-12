import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import { URL } from '../../../constants/app'
import authHeaderAdmin from "../../../services/auth-header-admin.js";

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

function* getProductListAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'product/getAllProduct'
		});
		yield put({
			type: "GET_PRODUCT_LIST_ADMIN_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_PRODUCT_LIST_ADMIN_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* deleteProductAdminSaga(actions) {
	console.log("producer lock: ", actions.payload)
	const { idProduct } = actions.payload
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + 'product/' + idProduct,
			headers: authHeaderAdmin()
		});
		console.log("res: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Xóa sản phẩm thành công')
			yield put({
				type: "DELETE_PRODUCT_ADMIN_SUCCESS",
				payload: {
					data: true
				},

			});
		} else {
			yield openNotificationWithIcon('error', 'Xóa sản phẩm thất bại')
			yield put({
				type: "DELETE_PRODUCT_ADMIN_FAIL",
				payload: {
					data: false
				},

			});
		}
	} catch (error) {

		yield openNotificationWithIcon('error', 'Xóa sản phẩm thất bại')
		yield put({
			type: "DELETE_PRODUCT_ADMIN_FAIL",
			payload: {
				data: false
			},

		});
	}
}

function* getProductDetailAdminSaga(actions) {
	const { id } = actions.payload;
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + `product/getProductById/${id}`,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_DETAIL_PRODUCT_ADMIN_SUCCESS",
				payload: {
					data: result.data,
				},
			});
		} else {

			yield put({
				type: "GET_DETAIL_PRODUCT_ADMIN_FAIL",
				payload: {
					error: "lỗi"
				},
			});
		}

	} catch (e) {
		yield put({
			type: "GET_DETAIL_PRODUCT_ADMIN_FAIL",
			payload: {
				error: 404
			},
		});
	}
}


export default function* productAdminSaga() {
	yield takeEvery('GET_PRODUCT_LIST_ADMIN_REQUEST', getProductListAdminSaga);
	yield takeEvery('DELETE_PRODUCT_ADMIN_REQUEST', deleteProductAdminSaga);
	yield takeEvery('GET_DETAIL_PRODUCT_ADMIN_REQUEST', getProductDetailAdminSaga)
}
