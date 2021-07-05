// PRODUCT MUTATIONS

export const SET_CURRENT_CATEGORY = (state, category) => {
  state.PRODUCTS.currentCategory = category
}

export const FETCH_CATEGORIES = (state, productsCategories) => {
  state.PRODUCTS.productsCategories = productsCategories
}

export const FETCH_PRODUCTS = (state, productsList) => {
  state.PRODUCTS.productsList = productsList
}

export const FETCH_OFFERS = (state, offers) => {
  state.PRODUCTS.offers = offers
}

export const FETCH_TOP_OFFERS = (state, topOffers) => {
  state.PRODUCTS.topOffers = topOffers
}

export const SET_PRODUCT_FILTER = (state, productFilter) => {
  state.PRODUCTS.productFilter = productFilter
}

export const QUERY_SEARCH = (state, search) => {
  state.PRODUCTS.search = search
}

export const WIPE_SEARCH = (state, search) => {
  state.PRODUCTS.search = search
}
