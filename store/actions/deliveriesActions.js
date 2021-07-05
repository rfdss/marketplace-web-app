import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const fetchDeliveriesList = ({ commit, state }, status) => {
  const { RESTAURANT: { currentRestaurant } } = state

  axios.get(`${Endpoints.getDeliveries}/${currentRestaurant.id}/0/${status}`, Config.API_OPTIONS)
  .then(response => {
    commit(Types.FETCH_DELIVERIES, response.data)
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}

export const saveRating = async ({ commit, state }, payload) => {
  return await axios.put(`${Endpoints.saveRating}`, payload, Config.API_OPTIONS)
}

export const saveOrderTicket = async ({ commit, state }, payload) => {
  return await axios.put(`${Endpoints.saveOrderTicket}`, payload, Config.API_OPTIONS)
}