import axios from 'axios';
import * as actions from '../constants/cartConstants';


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: actions.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actions.CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems))
}

export const saveLocationAddress = (data) => (dispatch) => {
    dispatch({
        type: actions.CART_SAVE_LOCATION_ADDRESS,
        payload: data,
    })

    localStorage.setItem('locationAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: actions.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
