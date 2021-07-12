import { delay, put, takeEvery } from 'redux-saga/effects';
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

function* getOrderListAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'orderAll',
			headers: authHeaderAdmin()
		});
		yield put({
			type: "GET_ORDER_LIST_ADMIN_SUCCESS",
			payload: {
				data: result.data
			},

		});
	} catch (e) {
		yield put({
			type: "GET_ORDER_LIST_ADMIN_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* changeStatusOrderSaga(actions) {
	const { id, status } = actions.payload;
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'order/status',
			data: {
				id: id,
				status: status
			},
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "CHANGE_STATUS_ORDER_ADMIN_SUCCESS",
				payload: {
					data: true
				},

			});
		} else {
			yield delay(3000);
			yield openNotificationWithIcon('error', result.data.message)
			yield put({
				type: "CHANGE_STATUS_ORDER_ADMIN_FAIL",
				payload: {
					data: false
				},
			});
		}
	} catch (error) {
		console.log("aaaa: ", error.response.data.message)
		yield put({
			type: "CHANGE_STATUS_ORDER_ADMIN_FAIL",
			payload: {
				error: error.response.data.message
			},

		});
	}
}

export default function* orderAdminSaga() {
	yield takeEvery('GET_ORDER_LIST_ADMIN_REQUEST', getOrderListAdminSaga);
	yield takeEvery('CHANGE_STATUS_ORDER_ADMIN_REQUEST', changeStatusOrderSaga)
}
