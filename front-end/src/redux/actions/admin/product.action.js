export function getProductListAdminAction() {
	return {
		type: 'GET_PRODUCT_LIST_ADMIN_REQUEST',
		payload: "",
	}
}

export function deleteProductAdminAction(params) {
	return {
		type: 'DELETE_PRODUCT_ADMIN_REQUEST',
		payload: params,
	}
}

export function getDetailProductAdminAction(params) {
	console.log("get detail product action: ", params)
	return {
		type: 'GET_DETAIL_PRODUCT_ADMIN_REQUEST',
		payload: params,
	}
}