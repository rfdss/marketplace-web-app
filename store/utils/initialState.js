export const AUTH = {
  authenticated: '',
  authenticatedError: '',
  unauthenticated: '',
  unauthenticatedError: '',
  recoveryPassword: '',
  recoveryPasswordError: '',
  changePassword: '',
  changePasswordError: '',
  createdUser: '',
  createdUserError: '',
  userSignout: '',
  userSignoutError: '',
  userData: {},
  verifiedUser: '',
  verifiedUserError: '',
  recoveryPasswordConfirm: '',
  recoveryPasswordConfirmError: '',
  removeUserData: ''
}

export const USER = {
  data: {},
  token: ''
}

export const RESTAURANT = {
  currentRestaurant: {},
  restaurantsList: [],
  restaurantSuppliers: [],
  currentRestaurantSupplier: null,
  toggleRestaurantModal: false
}

export const PRODUCTS = {
  currentCategory: null,
  productsList: [],
  productFilter: 'mais-baratos',
  productsCategories: [],
  offers: [],
  topOffers: [],
  search: []
}

export const SUPPLIERS = {
  suppliersList: [],
  suppliersListError: [],
  activeSupplier: '',
  activeSupplierError: '',
}

export const CART = {
  cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
}

export const MODELS = {
  currentModel: {},
  modelsList: [],
  modelsListError: '',
  modelListCart: [],
}

export const DELIVERIES = {
  deliveriesList: []
}
