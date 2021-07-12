export function getOrderListAdminAction() {
	return {
		type: 'GET_ORDER_LIST_ADMIN_REQUEST',
		payload: "",
	}
}

export function changeStatusOrderAdminAction(params) {
	console.log("params change status: ", params)
	return {
		type: 'CHANGE_STATUS_ORDER_ADMIN_REQUEST',
		payload: params,
	}
}