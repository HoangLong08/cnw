import { put, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';

import history from '../../../utils/history';
import authHeader from "../../../services/auth-header.js";
import { URL } from '../../../constants/app'

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

function* loginUserSaga(action) {
	const { email, password } = action.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'customer/login',
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
			yield history.push('/');
			yield put({
				type: "LOGIN_USER_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield openNotificationWithIcon('error', 'Đăng nhập thất bại')
			yield delay(2000)
			yield put({
				type: "LOGIN_USER_FAIL",
				payload: {
					error: "Thông tin đăng nhập không chính xác"
				},
			});
		}

	} catch (error) {
		// console.log("error: ", error.response)
		const { data } = error.response;
		yield put({
			type: "LOGIN_USER_FAIL",
			payload: {
				error: data.message
			},
		});
		// if (error.response.status === 401) {
		// 	yield openNotificationWithIcon('error', 'Đăng nhập thất bại')
		// 	yield put({
		// 		type: "LOGIN_USER_FAIL",
		// 		payload: {
		// 			error: data.message
		// 		},
		// 	});
		// }
	}
}

function* forgotPasswordUserSaga(actions) {
	const { email } = actions.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'customer/forgotpassword',
			data: {
				email: email,
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		const { data } = result.data
		console.log("result forgotPasswordUserSaga: ", result)
		if (result.status === 200) {
			console.log("result 22: ", result.data.message)
			yield delay(2000);
			yield put({
				type: "AUTH_EMAIL_SUCCESS",
				payload: {
					data: {
						email: email,
						check: true,
					}
				},
			});
		} else {
			yield openNotificationWithIcon('error', 'Email không tồn tại hoặc chưa đăng ký')
			yield put({
				type: "AUTH_EMAIL_FAIL",
				payload: {
					error: data.message,
					check: false,
				},
			});
		}
	} catch (error) {
		if (error?.response?.status === 406) {
			const { data } = error.response;
			yield openNotificationWithIcon('error', 'Email không tồn tại hoặc chưa đăng ký')
			yield put({
				type: "AUTH_EMAIL_FAIL",
				payload: {
					error: data.message,
					check: false,
				},
			});
		}

		if (error?.response?.status === 503) {
			yield openNotificationWithIcon('error', 'Dịch vụ đang bảo trì')
			yield put({
				type: "AUTH_EMAIL_FAIL",
				payload: {
					data: {
						message: "Vui lòng kiểm tra mail của bạn, để nhận mã xác thực gồm 6 chữ số.",
						email: email,
						check: false,
					}
				},
			});
		}
	}
}

function* authOtpSaga(action) {
	const { optInput } = action.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'customer/checkCode',
			data: {
				code: optInput,
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		console.log("result opt user: ", result)
		if (result.status === 200) {
			// yield delay(5000);
			yield put({
				type: "AUTH_OTP_SUCCESS",
				payload: {
					data: {
						optInput: optInput,
						check: true,
					}
				},
			});
		} else {
			yield openNotificationWithIcon('error', "Mã xác minh không chính xác hoặc đã hết hiệu lực")
			yield put({
				type: "AUTH_OTP_FAIL",
				payload: {
					data: {
						optInput: optInput,
						check: false,
					}
				},
			});
		}
	} catch (error) {
		if (error.response.status !== 200) {
			yield openNotificationWithIcon('error', 'Mã xác minh không chính xác hoặc đã hết hiệu lực')
			yield put({
				type: "AUTH_OTP_FAIL",
				payload: {
					optInput: optInput,
					check: false,
				},
			});
		}
	}
}

function* changePasswordForgotSaga(action) {

	const { password, confirmPassword, code } = action.payload

	console.log("action.payload: ", password)

	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'customer/resetPassword',
			data: {
				newPass: password,
				confirmPass: confirmPassword,
				code: code
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		console.log("res: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield history.push('/login')
		} else {
			yield openNotificationWithIcon('error', 'Cập nhập thất bại')
		}
	} catch (error) {
		console.log("error.response: ", error.response)
		if (error.response.status === 406) {
			yield openNotificationWithIcon('error', "Cập nhật thất bại")
		} else {
			yield openNotificationWithIcon('error', "Cập nhật thất bại")
		}

	}
}

function* registerUserSage(action) {
	const { lastName, firstName, email, password } = action.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'customer/register',
			data: {
				lastName: lastName,
				firstName: firstName,
				email: email,
				password: password
			},
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		const { data } = result.data
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Đăng ký thành công')
			yield delay(1000);
			yield history.push('/login');
		} else {
			yield openNotificationWithIcon('error', data.message)
		}
	} catch (error) {
		const { data } = error.response;
		if (error.response.status !== 200) {
			yield openNotificationWithIcon('error', data.message)
		}
	}
}

function* changeInfoUserSaga(actions) {
	console.log("action:  : ", actions.payload)
	const { token, image, email, lastName, firstName, gender, birthDay, phone, city, district, street, address } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'customer',
			data: {
				image: image,
				email: email,
				lastName: lastName,
				firstName: firstName,
				gender: gender,
				birthDay: birthDay,
				phone: phone,
				city: city,
				district: district,
				street: street,
				address: address
			},
			headers: authHeader()
		});
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "CHANGE_INFO_USER_SUCCESS",
				payload: {
					data: {
						account: {
							image: image,
							email: email,
							lastName: lastName,
							firstName: firstName,
							gender: gender,
							birthDay: birthDay,
							phone: phone,
							city: city,
							district: district,
							street: street,
							address: address
						},
						token: token
					}
				},
			});
		} else {
			yield openNotificationWithIcon('error', 'Cập nhập thất bại')
			yield put({
				type: "CHANGE_INFO_USER_FAIL",
				payload: {
					error: "Cập nhật thất bại"
				},
			});
		}
	} catch (error) {
		if (error.response.status !== 200) {
			yield openNotificationWithIcon('error', "Vui lòng đăng nhập lại. Để cập nhật")
		}
	}
}

function* changeImageUserSaga(actions) {
	const user = JSON.parse(sessionStorage.getItem("infoUser"));
	const { type } = actions.payload;
	let formData = new FormData();
	formData.append('file', type);
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + 'customer/upload_image',
			data: formData,
			headers: authHeader()
		});
		const { data } = result.data
		console.log("resulttttt: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')
			yield put({
				type: "CHANGE_IMAGE_USER_SUCCESS",
				payload: {
					data: {
						account: result.data,
						token: user.token
					}
				},
			});
		} else {
			yield openNotificationWithIcon('error', data.message)
			yield put({
				type: "CHANGE_IMAGE_USER_FAIL",
				payload: {
					error: "Cập nhật thất bại"
				},
			});
		}
	} catch (error) {
		const { data } = error.response;
		if (error.response.status !== 200) {
			yield openNotificationWithIcon('error', data.message)
			yield put({
				type: "CHANGE_IMAGE_USER_FAIL",
				payload: {
					error: "Cập nhật thất bại"
				},
			});
		}
	}
}

function* changePassUserSaga(actions) {
	console.log("action:  : ", actions.payload)
	const { passwordOld, passwordNew, confirmPassword } = actions.payload
	try {
		const result = yield axios({
			method: 'PUT',
			url: URL + 'customer',
			data: {
				passwordOld: passwordOld,
				passwordNew: passwordNew,
				confirmPassword: confirmPassword,
			},
			headers: authHeader()
		});
		console.log("res: ", result)
		if (result.status === 200) {
			yield openNotificationWithIcon('success', 'Cập nhật thành công')

		} else {
			yield openNotificationWithIcon('error', 'Cập nhập thất bại')

		}
	} catch (error) {
		console.log("error.response: ", error.response)
		if (error.response.status === 406) {
			yield openNotificationWithIcon('error', "Cập nhật thất bại. Kiểm tra lại mật khẩu cũ")
		} else {
			yield openNotificationWithIcon('error', "Vui lòng đăng nhập lại. Để cập nhật")
		}

	}
}

export default function* authSaga() {
	yield takeEvery('LOGIN_USER_REQUEST', loginUserSaga);
	yield takeEvery('AUTH_EMAIL_REQUEST', forgotPasswordUserSaga);
	yield takeEvery('AUTH_OPT_REQUEST', authOtpSaga)
	yield takeEvery('CHANGE_PASSWORD_FORGOT_REQUEST', changePasswordForgotSaga)
	yield takeEvery('REGISTER_USER_REQUEST', registerUserSage);
	yield takeEvery('CHANGE_INFO_USER_REQUEST', changeInfoUserSaga);
	yield takeEvery('CHANGE_PASSWORD_USER_REQUEST', changePassUserSaga);
	yield takeEvery('CHANGE_IMAGE_USER_REQUEST', changeImageUserSaga);
}
