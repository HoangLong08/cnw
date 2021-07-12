export function loginAdminAction(params) {
	return {
		type: 'LOGIN_ADMIN_REQUEST',
		payload: params
	}
}

export function lockAccountAdminAction(params) {
	console.log("aciton lock account: ", params)
	return {
		type: 'LOCK_ACCOUNT_ADMIN_REQUEST',
		payload: params
	}
}

export function unlockAccountAdminAction(params) {
	console.log("unlock account: ", params)
	return {
		type: 'UNLOCK_ACCOUNT_ADMIN_REQUEST',
		payload: params
	}
}
