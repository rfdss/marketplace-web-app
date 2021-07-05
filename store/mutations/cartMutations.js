// PRODUCT MUTATIONS

export const RESET_CART = (state) => {
  state.CART.cartProducts = []
}

export const UPDATE_CART = (state, items) => {
  state.CART.cartProducts = items
}

export const REMOVE_PRODUCT = (state, items) => {
  state.CART.cartProducts = items
}
