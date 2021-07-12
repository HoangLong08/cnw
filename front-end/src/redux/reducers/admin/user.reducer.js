const initialState = {
	userListAdmin: {
		data: [],
		error: "",
		load: false
	},

	dataDashboard: {
		data: {},
		error: "",
		load: false
	}

}

export default function userAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_USER_LIST_ADMIN_REQUEST':
			return {
				...state,
				userListAdmin: {
					...state.userListAdmin,
					load: true
				}
			}
		case 'GET_USER_LIST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				userListAdmin: {
					...state.userListAdmin,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_USER_LIST_ADMIN_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				userListAdmin: {
					...state.userListAdmin,
					load: false,
					error: error,
				},
			}
		}

		// -------------------------------------

		case 'GET_DATA_DASHBOARD_ADMIN_REQUEST':
			return {
				...state,
				dataDashboard: {
					...state.dataDashboard,
					load: true
				}
			}
		case 'GET_DATA_DASHBOARD_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				dataDashboard: {
					...state.dataDashboard,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_DATA_DASHBOARD_ADMIN_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				dataDashboard: {
					...state.dataDashboard,
					load: false,
					error: error,
				},
			}
		}

		default:
			return state;
	}
}
