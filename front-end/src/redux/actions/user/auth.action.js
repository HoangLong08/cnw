export function loginUserAction(params) {
	return {
		type: 'LOGIN_USER_REQUEST',
		payload: params
	}
}

export function registerUserAction(params) {
	return {
		type: 'REGISTER_USER_REQUEST',
		payload: params
	}
}

export function authEmailAction(params) { // auth email to get password
	return {
		type: 'AUTH_EMAIL_REQUEST',
		payload: params
	}
}

export function authOtpAction(params) {
	return {
		type: 'AUTH_OPT_REQUEST',
		payload: params
	}
}

export function changePasswordForgotAction(params) {
	console.log("changePasswordForgotAction: ", params)
	return {
		type: 'CHANGE_PASSWORD_FORGOT_REQUEST',
		payload: params
	}
}

export function changeInfoUserAction(params) {
	return {
		type: 'CHANGE_INFO_USER_REQUEST',
		payload: params
	}
}

export function changeImageUserAction(params) {
	console.log("params image: ", params)
	return {
		type: 'CHANGE_IMAGE_USER_REQUEST',
		payload: params
	}
}


export function changePasswordUserAction(params) {
	console.log("params: ", params)
	return {
		type: 'CHANGE_PASSWORD_USER_REQUEST',
		payload: params
	}
}



