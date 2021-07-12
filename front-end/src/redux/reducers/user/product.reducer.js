const initialState = {
	productList: {
		data: [],
		error: "",
		load: false
	},

	productNewList: {
		data: [],
		error: "",
		load: false
	},

	productMostList: {
		data: [],
		error: "",
		load: false
	},

	productDetail: {
		data: {
			productListImages: []
		},
		load: false,
		error: '',
	},

	orderProduct: {
		data: false
	},

	productOrderHistoryList: {
		data: [],
		load: false,
		error: '',
	},

	productSearchList: {
		data: [],
		load: false,
		error: '',
	}
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_PRODUCT_LIST_REQUEST':
			return {
				...state,
				productList: {
					...state.productList,
					load: true
				}
			}
		case 'GET_PRODUCT_LIST_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productList: {
					...state.productList,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_PRODUCT_LIST_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productList: {
					...state.productList,
					load: false,
					error: error,
				},
			}
		}
		// -------------------------------------------------

		case 'GET_PRODUCT_NEW_LIST_REQUEST':
			return {
				...state,
				productNewList: {
					...state.productNewList,
					load: true
				}
			}
		case 'GET_PRODUCT_NEW_LIST_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productNewList: {
					...state.productNewList,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_PRODUCT_NEW_LIST_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productNewList: {
					...state.productNewList,
					load: false,
					error: error,
				},
			}
		}

		// -------------------------------------------------

		case 'GET_PRODUCT_MOST_LIST_REQUEST':
			return {
				...state,
				productMostList: {
					...state.productMostList,
					load: true
				}
			}
		case 'GET_PRODUCT_MOST_LIST_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productMostList: {
					...state.productMostList,
					data: data,
					load: false,
				},
			}
		}
		case 'GET_PRODUCT_MOST_LIST_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productMostList: {
					...state.productMostList,
					load: false,
					error: error,
				},
			}
		}

		// -------------------------------------------------
		case 'GET_PRODUCT_DETAIL_REQUEST': {
			return {
				...state,
				productDetail: {
					...state.productDetail,
					load: true,
				},
			}
		}
		case 'GET_PRODUCT_DETAIL_SUCCESS': {
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

		case 'GET_PRODUCT_DETAIL_FAIL': {
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

		case 'GET_PRODUCT_HISTORY_ORDER_REQUEST': {
			return {
				...state,
				productOrderHistoryList: {
					...state.productOrderHistoryList,
					load: true,
				},
			}
		}

		case 'GET_PRODUCT_HISTORY_ORDER_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productOrderHistoryList: {
					...state.productOrderHistoryList,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_PRODUCT_HISTORY_ORDER_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productOrderHistoryList: {
					...state.productOrderHistoryList,
					load: false,
					error: error,
				},
			}
		}
		// -------------------------------------

		case 'GET_PRODUCT_CATEGORY_REQUEST': {
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					load: true,
				},
			}
		}

		case 'GET_PRODUCT_CATEGORY_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_PRODUCT_CATEGORY_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					load: false,
					error: error,
				},
			}
		}

		// ----------------------------------------

		case 'GET_PRODUCT_SEARCH_REQUEST': {
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					load: true,
				},
			}
		}

		case 'GET_PRODUCT_SEARCH_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					data: data,
					load: false,
				},
			}
		}

		case 'GET_PRODUCT_SEARCH_FAIL': {
			const { error } = action.payload;
			return {
				...state,
				productSearchList: {
					...state.productSearchList,
					load: false,
					error: error,
				},
			}
		}
		default:
			return state;
	}
}
