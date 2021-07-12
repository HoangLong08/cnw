export function addProductCartAction(params) {
	return {
		type: "ADD_PRODUCT_CART_REQUEST",
		payload: params
	}
}

export function incProductCartAction(params) {
	return {
		type: "INC_PRODUCT_CART_REQUEST",
		payload: params
	}
}

export function decProductCartAction(params) {
	return {
		type: "DEC_PRODUCT_CART_REQUEST",
		payload: params
	}
}

export function removeProductCartAction(params) {
	return {
		type: "REMOVE_PRODUCT_CART_REQUEST",
		payload: params
	}
}

export function orderProductAction(params) {
	return {
		type: 'ORDER_PRODUCT_REQUEST',
		payload: params
	}
}