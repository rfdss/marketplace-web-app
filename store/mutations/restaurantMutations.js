// RESTAURANT MUTATIONS

export const SET_CURRENT_RESTAURANT = (state, restaurant) => {
  state.RESTAURANT.currentRestaurant = restaurant
}

export const TOGGLE_RESTAURANT_MODAL = (state, toggleRestaurantModal) => {
  state.RESTAURANT.toggleRestaurantModal = toggleRestaurantModal
}

export const FETCH_RESTAURANTS_LIST = (state, restaurantsList) => {
  state.RESTAURANT.restaurantsList = restaurantsList
}

export const FETCH_RESTAURANT_SUPPLIERS = (state, restaurantSuppliers) => {
  state.RESTAURANT.restaurantSuppliers = restaurantSuppliers
}

export const SET_CURRENT_RESTAURANT_SUPPLIER = (state, supplier) => {
  state.RESTAURANT.currentRestaurantSupplier = supplier
}