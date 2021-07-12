import { notification } from 'antd';
var localStorageCart = JSON.parse(localStorage.getItem("shoppingCart"));


const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 2
	});
};


const initialState = {
	numberCart: localStorageCart ? localStorageCart.length : 0,
	shoppingCart: {
		data: localStorageCart ? localStorageCart : [],
		load: false,
		error: '',
	},
}

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case 'ADD_PRODUCT_CART_REQUEST': {
			const { shopCart } = action.payload;
			if (state.numberCart === 0) {
				let cart = {
					id: shopCart.id,
					idColor: shopCart.idColor,
					name: shopCart.name,
					image: shopCart.optionColor,
					price: shopCart.price,
					sale: shopCart.sale,
					size: shopCart.optionSize,
					quantity: 1,
					inventoryShoes: shopCart.inventoryShoes,
				}
				state.shoppingCart.data.push(cart);
			} else {
				let _add = false;
				let _inc = false;
				let _index = -1;
				let _cart = {};

				state.shoppingCart.data.forEach((item, index) => {
					if (item.id === shopCart.id) {
						if (item.idColor === shopCart.idColor) {
							if (item.size === shopCart.optionSize) {
								_inc = true;
								_index = index;
								_add = false;

							} else {
								if (_inc === false) {

									_inc = false;
									_index = -1;
									_add = true;

									let cart_ = {
										id: shopCart.id,
										idColor: shopCart.idColor,
										name: shopCart.name,
										image: shopCart.optionColor,
										price: shopCart.price,
										sale: shopCart.sale,
										size: shopCart.optionSize,
										quantity: 1,
										inventoryShoes: shopCart.inventoryShoes,
									};
									_cart = cart_
								}

							}
						} else {
							if (_inc === false) {
								_inc = false;
								_index = -1;
								_add = true;

								let cart_ = {
									id: shopCart.id,
									idColor: shopCart.idColor,
									name: shopCart.name,
									image: shopCart.optionColor,
									price: shopCart.price,
									sale: shopCart.sale,
									size: shopCart.optionSize,
									quantity: 1,
									inventoryShoes: shopCart.inventoryShoes,
								};
								_cart = cart_
							}
						}
					} else {
						// thêm 
						if (_inc === false) {

							_inc = false;
							_index = -1;
							_add = true;

							let cart_ = {
								id: shopCart.id,
								idColor: shopCart.idColor,
								name: shopCart.name,
								image: shopCart.optionColor,
								price: shopCart.price,
								sale: shopCart.sale,
								size: shopCart.optionSize,
								quantity: 1,
								inventoryShoes: shopCart.inventoryShoes,
							};
							_cart = cart_
						}
					}
				})

				if (_add === true && _inc === false) {
					state.shoppingCart.data.push(_cart);
				} else {
					if (_index === -1) {
						let cart = {
							id: shopCart.id,
							idColor: shopCart.idColor,
							name: shopCart.name,
							image: shopCart.optionColor,
							price: shopCart.price,
							sale: shopCart.sale,
							size: shopCart.optionSize,
							quantity: 1,
							inventoryShoes: shopCart.inventoryShoes,
						}
						state.shoppingCart.data.push(cart);
					} else {
						state.shoppingCart.data[_index].quantity++;
					}
				}
			}
			localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart.data))
			return {
				...state,
				numberCart: localStorageCart ? state.shoppingCart.data.length : 1,
				shoppingCart: {
					...state.shoppingCart,
					data: localStorageCart ? localStorageCart : state.shoppingCart.data,
				}
			}
		}

		case 'INC_PRODUCT_CART_REQUEST': {
			let resArr = [];
			const { id, idColor, size, inventoryShoes } = action.payload
			resArr = state.shoppingCart.data.map((item) => {
				if (item.id === id) {
					if (item.idColor === idColor) {
						if (item.size === size) {
							if (item.quantity < inventoryShoes) {
								item = { ...item, quantity: item.quantity + 1 }
							}
						}
					}
				}
				return item;

			})

			localStorage.setItem("shoppingCart", JSON.stringify(resArr))
			return {
				...state,
				shoppingCart: {
					data: resArr,
					load: false,
					error: '',
				},
			}

		}

		case 'DEC_PRODUCT_CART_REQUEST': {
			let resArr = [];
			const { id, idColor, size } = action.payload
			resArr = state.shoppingCart.data.map((item) => {
				if (item.id === id) {
					if (item.idColor === idColor) {
						if (item.size === size) {
							if (item.quantity > 1) {
								item = { ...item, quantity: item.quantity - 1 }
							}

						}
					}
				}
				return item;

			})

			localStorage.setItem("shoppingCart", JSON.stringify(resArr))
			return {
				...state,
				shoppingCart: {
					data: resArr,
					load: false,
					error: '',
				},
			}
		}

		case 'REMOVE_PRODUCT_CART_REQUEST': {
			let resArr = [];
			const { id, idColor, size } = action.payload
			let index_ = 0;
			state.shoppingCart.data.forEach((item, index) => {
				if (item.id === id) {
					if (item.idColor === idColor) {
						if (item.size === size) {
							index_ = index;
						}
					}
				}
			})

			resArr = state.shoppingCart.data.filter((item, index) => {
				return index !== index_
			})
			localStorage.setItem("shoppingCart", JSON.stringify(resArr))
			return {
				...state,
				numberCart: state.numberCart - 1,
				shoppingCart: {
					data: resArr,
					load: false,
					error: '',
				},
			}
		}
		case 'ORDER_PRODUCT_SUCCESS': {
			openNotificationWithIcon('success', 'Đặt hàng thành công')
			return {
				...state,
				numberCart: 0,
				shoppingCart: {
					data: [],
					load: false,
					error: '',
				},
			}
		}
		default:
			return state
	}
}