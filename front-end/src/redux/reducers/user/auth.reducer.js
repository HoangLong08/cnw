import { notification } from 'antd';
var infoUser = JSON.parse(sessionStorage.getItem("infoUser"));

const initialState = {
	infoUser: {
		data: infoUser ? infoUser : {},
		load: false,
		error: ''
	},

	resetPassword: {
		data: {},
		load: false,
		error: ''
	},

	optUser: {
		data: {},
		load: false,
		error: '',
	}
}

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_USER_REQUEST': {
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: true
				}
			}
		}

		case 'LOGIN_USER_SUCCESS': {
			const { data } = action.payload;
			sessionStorage.setItem('infoUser', JSON.stringify(data));
			return {
				...state,
				infoUser: {
					...state.infoUser,
					data: data,
					load: false,
				},
			}
		}

		case 'LOGIN_USER_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error)
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: false,
					error: error,
				},
			};
		}

		case 'AUTH_EMAIL_REQUEST': {
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					load: true
				}
			};
		}

		case 'AUTH_EMAIL_SUCCESS': {
			const { data } = action.payload;
			console.log("data reducer resetpassword: ", data)
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					data: data,
					load: false,
				},
			}
		}

		case 'AUTH_EMAIL_FAIL': {
			const { error } = action.payload
			return {
				...state,
				resetPassword: {
					...state.resetPassword,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------------------

		case 'AUTH_OTP_REQUEST': {
			return {
				...state,
				optUser: {
					...state.optUser,
					load: true
				}
			};
		}

		case 'AUTH_OTP_SUCCESS': {
			const { data } = action.payload;
			console.log("data reducer optUser: ", data)
			return {
				...state,
				optUser: {
					...state.optUser,
					data: data,
					load: false,
				},
			}
		}

		case 'AUTH_OTP_FAIL': {
			const { error } = action.payload
			return {
				...state,
				optUser: {
					...state.optUser,
					load: false,
					error: error,
				},
			};
		}


		case 'CHANGE_INFO_USER_REQUEST': {
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: true
				}
			}
		}

		case 'CHANGE_INFO_USER_SUCCESS': {
			const { data } = action.payload;
			console.log("dataaaaaaaaaaaaa: ", data);
			sessionStorage.setItem('infoUser', JSON.stringify({ account: data.account, token: data.token }));
			return {
				...state,
				infoUser: {
					...state.infoUser,
					data: { account: data.account, token: data.token },
					load: false,
				},
			}
		}

		case 'CHANGE_INFO_USER_FAIL': {
			const { error } = action.payload
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: false,
					error: error,
				},
			};
		}

		// ----------

		case 'CHANGE_IMAGE_USER_REQUEST': {
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: true
				}
			}
		}

		case 'CHANGE_IMAGE_USER_SUCCESS': {
			const { data } = action.payload;
			console.log("data: ", data);
			sessionStorage.setItem('infoUser', JSON.stringify(data));
			return {
				...state,
				infoUser: {
					...state.infoUser,
					data: data,
					load: false,
				},
			}
		}

		case 'CHANGE_IMAGE_USER_FAIL': {
			const { error } = action.payload
			return {
				...state,
				infoUser: {
					...state.infoUser,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state;
	}
}