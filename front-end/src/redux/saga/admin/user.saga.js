import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL } from '../../../constants/app'
import authHeaderAdmin from "../../../services/auth-header-admin.js";

function* getUserListAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'customer/getAllCustomer',
			headers: authHeaderAdmin()
		});
		yield put({
			type: "GET_USER_LIST_ADMIN_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_USER_LIST_ADMIN_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

function* getDataDashboardAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + 'baseboard',
		});
		console.log("result result: ", result)
		yield put({
			type: "GET_DATA_DASHBOARD_ADMIN_SUCCESS",
			payload: {
				data: result.data
			},
		});
	} catch (e) {
		yield put({
			type: "GET_DATA_DASHBOARD_ADMIN_FAIL",
			payload: {
				error: e.error
			},
		});
	}
}

export default function* userAdminSaga() {
	yield takeEvery('GET_USER_LIST_ADMIN_REQUEST', getUserListAdminSaga);
	yield takeEvery('GET_DATA_DASHBOARD_ADMIN_REQUEST', getDataDashboardAdminSaga)
}
