import { notification } from 'antd';

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};

const initialState = {
	orderListAdmin: {
		data: [],
		error: "",
		load: false
	},

	changeStatusOrder: {
		data: false,
		load: false,
		error: ''
	},
}

export default function orderAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_ORDER_LIST_ADMIN_REQUEST':
			return {
				...state,
				orderListAdmin: {
					...state.orderListAdmin,
					load: true
				}
			}
		case 'GET_ORDER_LIST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				orderListAdmin: {
					...state.orderListAdmin,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_ORDER_LIST_ADMIN_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				orderListAdmin: {
					...state.orderListAdmin,
					load: false,
					error: error,
				},
			}
		}

		// -------------------------------------

		case 'CHANGE_STATUS_ORDER_ADMIN_REQUEST': {
			return {
				...state,
				changeStatusOrder: {
					...state.changeStatusOrder,
					load: true
				}
			}
		}

		case 'CHANGE_STATUS_ORDER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				changeStatusOrder: {
					...state.changeStatusOrder,
					data: data,
					load: false,
				},
			}
		}

		case 'CHANGE_STATUS_ORDER_ADMIN_FAIL': {
			const { error } = action.payload
			openNotificationWithIcon('error', error)
			return {
				...state,
				changeStatusOrder: {
					...state.changeStatusOrder,
					load: false,
					error: error,
				},
			};
		}
		default:
			return state;
	}
}
