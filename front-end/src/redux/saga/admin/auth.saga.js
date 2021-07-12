import { put, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';
import history from '../../../utils/history';
import { URL } from '../../../constants/app'

import authHeaderAdmin from "../../../services/auth-header-admin.js";

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


function* loginAdminSaga(action) {
	const { email, password } = action.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'admin/login',
			data: {
				email: email,
				password: password
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});

		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Đăng nhập thành công')
			yield delay(2000)
			yield history.push('/area-admin/dashboard');
			yield put({
				type: "LOGIN_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield openNotificationWithIcon('error', 'Đăng nhập thất bại')
			yield delay(2000)
			yield put({
				type: "LOGIN_ADMIN_FAIL",
				payload: {
					error: "Thông tin đăng nhập không chính xác"
				},
			});
		}

	} catch (error) {
		console.log("error: ", error.response)
		const { data } = error.response;
		if (error.response.status === 401) {
			yield openNotificationWithIcon('error', 'Đăng nhập thất bại')
			yield put({
				type: "LOGIN_ADMIN_FAIL",
				payload: {
					error: data.message
				},
			});
		}
	}
}

function* lockAccountAdminAction(actions) {
	console.log("producer lock: ", actions.payload)
	const { idUser } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'customer/lock/' + idUser,
			headers: authHeaderAdmin()
		});
		console.log("res: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "LOCK_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: true
				},

			});
		} else {
			yield openNotificationWithIcon('error', 'Cập nhật thất bại')
			yield put({
				type: "LOCK_ACCOUNT_ADMIN_FAIL",
				payload: {
					data: false
				},

			});
		}
	} catch (error) {

		yield openNotificationWithIcon('error', 'Cập nhật thất bại')
		yield put({
			type: "LOCK_ACCOUNT_ADMIN_FAIL",
			payload: {
				data: false
			},

		});
	}
}

function* unlockAccountAdminAction(actions) {
	console.log("producer lock: ", actions.payload)

	console.log("producer lock: ", actions.payload)
	const { idUser } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'customer/unlock/' + idUser,
			headers: authHeaderAdmin()
		});
		console.log("res: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "UNLOCK_ACCOUNT_ADMIN_SUCCESS",
				payload: {
					data: true
				},

			});
		} else {
			yield openNotificationWithIcon('error', 'Cập nhật thất bại')
			yield put({
				type: "UNLOCK_ACCOUNT_ADMIN_FAIL",
				payload: {
					data: false
				},

			});
		}
	} catch (error) {

		yield openNotificationWithIcon('error', 'Cập nhật thất bại')
		yield put({
			type: "UNLOCK_ACCOUNT_ADMIN_FAIL",
			payload: {
				data: false
			},

		});
	}

}

export default function* authAdminSaga() {
	yield takeEvery('LOGIN_ADMIN_REQUEST', loginAdminSaga);
	yield takeEvery('LOCK_ACCOUNT_ADMIN_REQUEST', lockAccountAdminAction);
	yield takeEvery('UNLOCK_ACCOUNT_ADMIN_REQUEST', unlockAccountAdminAction);
}
