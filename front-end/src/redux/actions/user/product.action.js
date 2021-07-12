export function getProductListAction(params) {
	return {
		type: 'GET_PRODUCT_LIST_REQUEST',
		payload: params,
	}
}

export function getProductNewAction(params) {
	return {
		type: 'GET_PRODUCT_NEW_LIST_REQUEST',
		payload: params,
	}
}

export function getProductMostAction(params) {
	return {
		type: 'GET_PRODUCT_MOST_LIST_REQUEST',
		payload: params,
	}
}

export function getProductDetailAction(params) {
	return {
		type: 'GET_PRODUCT_DETAIL_REQUEST',
		payload: params,
	}
}

export function getProductHistoryOrderAction(params) {
	return {
		type: 'GET_PRODUCT_HISTORY_ORDER_REQUEST',
		payload: params,
	}
}

export function getProductCategoryAction(params) {
	return {
		type: 'GET_PRODUCT_CATEGORY_REQUEST',
		payload: params,
	}
}

export function getProductSearchAction(params) {

	console.log("params search: ", params)
	return {
		type: 'GET_PRODUCT_SEARCH_REQUEST',
		payload: params,
	}
}