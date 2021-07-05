import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const setCurrentModel = ({ commit }, model) => commit(Types.SET_CURRENT_MODEL, model)

export const setModels = ({ commit }, models) => commit(Types.FETCH_MODELS, models)

export const fetchModels = async ({ commit, state }) => {
  const { RESTAURANT: { currentRestaurant } } = state

  await axios.get(`${Endpoints.getModels}/${currentRestaurant.id}`, Config.API_OPTIONS)
  .then(response => {
    commit(Types.FETCH_MODELS, response.data)
  })
  .catch(error => {
    console.debug('API ERROR:', error)
  })
}

export const fetchOrderModelItems = ({ commit, state }, orderModelId) => {
  const { RESTAURANT: { currentRestaurant } } = state
  return axios.get(`${Endpoints.getModels}/${currentRestaurant.id}/${orderModelId}`, Config.API_OPTIONS)
}

export const deleteOrderModel = async ({ commit, state }, orderModelId) => {
  const { RESTAURANT: { currentRestaurant } } = state
  return await axios.delete(`${Endpoints.getModels}/${currentRestaurant.id}/${orderModelId}`, Config.API_OPTIONS)
}