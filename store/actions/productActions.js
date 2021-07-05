import axios from 'axios'
import _ from 'lodash'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

// Seta a categoria atual
export const setCurrentCategory = ({ commit, state }, categoryId) => {
  const { PRODUCTS: { productsCategories } } = state
  const category = productsCategories.find(c => c.id == categoryId)
  commit(Types.SET_CURRENT_CATEGORY, category)
}

export const fetchCategoriesList = ({ commit, state }) => {
  const { RESTAURANT: { currentRestaurant } } = state

  axios.get(`${Endpoints.getMenu}/${currentRestaurant.id}`, Config.API_OPTIONS)
  .then(response => {
    commit(Types.FETCH_CATEGORIES, response.data)
    commit(Types.SET_CURRENT_CATEGORY, response.data[0])
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}

// Seta qual o tipo de filtro será usado na listagem das oferta
export const setProductFilter = ({ commit }, filter) => {
  commit(Types.SET_PRODUCT_FILTER, filter)
}

// Recupera a listagem de ofertas de um determinado produto
export const fetchOffersByProduct = async ({ commit, state }, productId) => {
  const {
    RESTAURANT: { currentRestaurant: { id }},
    PRODUCTS: { productFilter }
  } = state

  await axios.get(`${Endpoints.getOffersByProduct}/${id}/${productId}`, Config.API_OPTIONS)
  .then(({ data }) => {
    let offersList = []
    
    if (productFilter === 'mais-baratos') {
      offersList = _.orderBy(data, 'price', 'asc')
    } else {
      offersList = _.orderBy(data, 'supplier.rating', 'desc')
    }

    commit(Types.FETCH_OFFERS, offersList)

  }).catch(error => {
    console.log(error)
  })
}


// Recupera a listagem de ofertas com vencimento próximo
export const fetchOffersFIFO = async ({ commit, state }) => {
  const { RESTAURANT: { currentRestaurant: { id } } } = state

  await axios.get(`${Endpoints.getOffersByProduct}/${id}/0/0`, Config.API_OPTIONS)
  .then(({ data }) => {
    commit(Types.FETCH_OFFERS, data)
  }).catch((error) => {
    console.log(error)
  })
}

// Recupera a lista de top ofertas referente a uma determinada oferta
export const fetchTopOffers = async ({ commit, state }, offerId) => {
  const { RESTAURANT: { currentRestaurant: { id } } } = state
  
  await axios.get(`${Endpoints.getTopOffers}/${id}/${offerId}`, Config.API_OPTIONS)
  .then(({ data }) => {
    commit(Types.FETCH_TOP_OFFERS, data)
  })
};

export const fetchProductSearch = async ({ commit, state }, titleFilter) => {
  const { RESTAURANT: { currentRestaurant: { id: customerId } } } = state
  
  const data = {
    customerId,
    titleFilter: titleFilter.toLowerCase()
  }

  await axios.post(Endpoints.searchProducts, data, Config.API_OPTIONS)
  .then(({ data }) => {
    commit(Types.QUERY_SEARCH, data)
  })
}

export const resetSearch = ({ commit }) => commit(Types.WIPE_SEARCH, [])