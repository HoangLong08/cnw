const initialState = {
	productListAdmin: {
		data: [],
		error: "",
		load: false
	},

	productOrderHistoryListAdmin: {
		data: [],
		load: false,
		error: '',
	},

	deleteProduct: {
		data: false,
		load: false,
		error: ''
	},

	productDetail: {
		data: {
			productListImages: []
		},
		load: false,
		error: '',
	},

}

export default function productAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_PRODUCT_LIST_ADMIN_REQUEST':
			return {
				...state,
				productListAdmin: {
					...state.productListAdmin,
					load: true
				}
			}
		case 'GET_PRODUCT_LIST_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productListAdmin: {
					...state.productListAdmin,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_PRODUCT_LIST_ADMIN_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productListAdmin: {
					...state.productListAdmin,
					load: false,
					error: error,
				},
			}
		}

		//  -------------------------------------

		case 'DELETE_PRODUCT_ADMIN_REQUEST': {
			return {
				...state,
				deleteProduct: {
					...state.deleteProduct,
					load: true
				}
			}
		}

		case 'DELETE_PRODUCT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				deleteProduct: {
					...state.deleteProduct,
					data: data,
					load: false,
				},
			}
		}

		case 'DELETE_PRODUCT_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				deleteProduct: {
					...state.deleteProduct,
					load: false,
					error: error,
				},
			};
		}

		// -------------------------------------------------

		case 'GET_DETAIL_PRODUCT_ADMIN_REQUEST': {
			return {
				...state,
				productDetail: {
					...state.productDetail,
					load: true,
				},
			}
		}
		case 'GET_DETAIL_PRODUCT_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productDetail: {
					...state.productDetail,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_DETAIL_PRODUCT_ADMIN_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productDetail: {
					...state.productDetail,
					load: false,
					error: error,
				},
			}
		}

		default:
			return state;
	}
}

