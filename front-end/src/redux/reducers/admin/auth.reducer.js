var infoAdmin = JSON.parse(sessionStorage.getItem("infoAdmin"));
const initialState = {
	infoAdmin: {
		data: infoAdmin ? infoAdmin : {},
		load: false,
		error: ''
	},
	lockAccount: {
		data: false,
		load: false,
		error: ''
	},
	unlockAccount: {
		data: false,
		load: false,
		error: ''
	}
}

export default function authAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'LOGIN_ADMIN_SUCCESS': {
			const { data } = action.payload;
			sessionStorage.setItem('infoAdmin', JSON.stringify(data));
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
				},
			}
		}

		case 'LOGIN_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: false,
					error: error,
				},
			};
		}
		// ----------------------------------

		case 'LOCK_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				lockAccount: {
					...state.lockAccount,
					load: true
				}
			}
		}

		case 'LOCK_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				lockAccount: {
					...state.lockAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'LOCK_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				lockAccount: {
					...state.lockAccount,
					load: false,
					error: error,
				},
			};
		}
		//  ------------------------------------

		case 'UNLOCK_ACCOUNT_ADMIN_REQUEST': {
			return {
				...state,
				unlockAccount: {
					...state.unlockAccount,
					load: true
				}
			}
		}

		case 'UNLOCK_ACCOUNT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				unlockAccount: {
					...state.unlockAccount,
					data: data,
					load: false,
				},
			}
		}

		case 'UNLOCK_ACCOUNT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				unlockAccount: {
					...state.unlockAccount,
					load: false,
					error: error,
				},
			};
		}
		default:
			return state
	}
}
