import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  TOGGLE_AMOUNT,
} from "./actions";

import cartItems from "./cart-items";
// initial store
const initialStore = {
  cart: cartItems,
  total: 4,
  amount: 5,
};

export default function reducer(state = initialStore, action) {
  if (action.type === DECREASE) {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount - 1 > 0 ? item.amount - 1 : 1 };
      } else {
        return item;
      }
    });
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    return { ...state, cart: newCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        total.amount += amount;
        total.total += amount * price;
        return total;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    return { ...state, total, amount };
  }
  if (action.type === TOGGLE_AMOUNT) {
    return { ...state };
  }
  return state;
}
