import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const setCurrentRestaurant = ({ commit }, restaurant) => {
  sessionStorage.setItem('currentRestaurant', JSON.stringify(restaurant))
  commit(Types.SET_CURRENT_RESTAURANT, restaurant)
}

export const fetchRestaurantSuppliers = async ({ commit, state }) => {
  const { RESTAURANT: { currentRestaurant } } = state
  let currentRestaurantAux = null

  if (!currentRestaurant.hasOwnProperty('id')) {
    currentRestaurantAux = JSON.parse(sessionStorage.getItem('currentRestaurant'))
  } else {
    currentRestaurantAux = currentRestaurant
  }

  await axios.get(`${Endpoints.fetchRestaurantSuppliers}/${currentRestaurantAux.id}`,
    Config.API_OPTIONS
  ).then(response => {
    commit(Types.FETCH_RESTAURANT_SUPPLIERS, response.data)
  })
  .catch(error => {
    alert('API ERROR: ', error);
  })
}

export const fetchRestaurantSupplier = async ({ commit, state }, supplierId) => {
  const { RESTAURANT: { currentRestaurant } } = state
  let currentRestaurantAux = null

  if (!currentRestaurant.hasOwnProperty('id')) {
    currentRestaurantAux = JSON.parse(sessionStorage.getItem('currentRestaurant'))
  } else {
    currentRestaurantAux = currentRestaurant
  }
  
  await axios.get(`${Endpoints.fetchRestaurantSupplier}/${currentRestaurantAux.id}/${supplierId}`,
    Config.API_OPTIONS
  ).then(response => {
    commit(Types.SET_CURRENT_RESTAURANT_SUPPLIER, response.data)
  })
  .catch(error => {
    alert('API ERROR: ', error)
  })
}

export const fetchRestaurantList = async ({ commit }) => {
  const userStore = sessionStorage.getItem('user')
  const user = JSON.parse(userStore)

  await axios.get(`${Endpoints.getRestaurants}/${user.id}`, Config.API_OPTIONS)
  .then(response => {
    const currentRestaurantStore = sessionStorage.getItem('currentRestaurant')
    let currentRestaurant = JSON.parse(currentRestaurantStore)

    if (currentRestaurantStore == null) {
      currentRestaurant = JSON.stringify(response.data[0])
      sessionStorage.setItem('currentRestaurant', currentRestaurant)
      currentRestaurant = JSON.parse(currentRestaurant)
    }
    
    commit(Types.SET_CURRENT_RESTAURANT, currentRestaurant)
    commit(Types.FETCH_RESTAURANTS_LIST, response.data)
    commit('resetErrors')

  })
  .catch(error => {
    alert('API ERROR:', error);
    // const errorType = error.response.data.errorType
    // const errorMsg = error.response.data.error
    // commit('SET_ERROR', true)
    // commit('SET_ERROR_TYPE', errorType)
    // commit('SET_ERROR_MSG', errorMsg)
    // commit('SET_ERROR_FIELD', null)
    // commit('SET_AUTH_TOKEN', null)
    // localStorage.removeItem('userToken')
  })
}

export const saveRestaurant = ({ commit, state }, restaurant) => {
  const userStore = sessionStorage.getItem('user')
  const user = JSON.parse(userStore)

  let body = {
    AdminPersonId: user.id,
    Name: restaurant.razaoSocial,
    TradeName: restaurant.nomeFantasia,
    Cnpj: restaurant.cnpj,
    OrderEmail: user.email,
    TelefoneDdd: user.telefoneDdd,
    TelefoneNumero: user.telefoneNumero,
    LocalAddress: setDefaultAddress({ ...restaurant, Obs: 'Endereço Local' }, user),
    DeliveryAddress: setDeliveryAddress(restaurant, user),
    IsBlocked: 0,
    DeliveryObs: restaurant.deliveryObs,
    InsertDate: new Date(),
    UpdateDate: new Date()
  }

  if (restaurant.hasOwnProperty('id')) {
    body = { ...body, Id: restaurant.id }
    body = _.omit(body, 'InsertDate')
  }

  // console.log(body)
  // return false

  return axios.post(`${Endpoints.saveRestaurant}/${user.id}`, body, Config.API_OPTIONS)
}

export const updateRestaurant = ({ commit, state }, restaurant) => {
  const userStore = sessionStorage.getItem('user')
  const user = JSON.parse(userStore)

  const body = {
    Id: restaurant.id,
    AdminPersonId: user.id,
    Name: restaurant.razaoSocial,
    TradeName: restaurant.nomeFantasia,
    Cnpj: restaurant.cnpj,
    OrderEmail: user.email,
    TelefoneDdd: user.telefoneDdd,
    TelefoneNumero: user.telefoneNumero,
    LocalAddress: setDefaultAddress({ ...restaurant, Obs: 'Endereço Local' }, user),
    DeliveryAddress: setDeliveryAddress(restaurant, user),
    IsBlocked: 0,
    DeliveryObs: restaurant.deliveryObs,
    UpdateDate: new Date()
  }

  return axios.post(`${Endpoints.saveRestaurant}/${user.id}`, body, Config.API_OPTIONS)
}

// Helpers

const setDefaultAddress = (restaurant, user) => ({
  Street: restaurant.endereco,
  Number: restaurant.numero,
  Cep: restaurant.cep,
  IsDisabled: 0,
  District: '',
  Complement: restaurant.complemento || '',
  Obs: restaurant.Obs,
  TelefoneDdd: user.telefoneDdd,
  TelefoneNumero: user.telefoneNumero,
  City: restaurant.cidade,
  State: restaurant.estado,
  PersonId: user.id,
  Latitude: -20.58522,
  Longitude: -41.2358,
  InsertDate: new Date(),
  UpdateDate: new Date()
});

const setDeliveryAddress = (restaurant, user) => {
  // if (restaurant.mesmoEndereco) {
  //   const deliveryAddress = { ...restaurant,  Obs: 'Endereço de Entrega' };
  //   return setDefaultAddress(deliveryAddress, user);
  // }

  return {
    Street: restaurant.enderecoEntrega,
    Number: restaurant.numeroEntrega,
    Cep: restaurant.cepEntrega,
    IsDisabled: 0,
    District: '',
    Complement: restaurant.complementoEntrega || '',
    Obs: 'Endereço de Entrega',
    TelefoneDdd: user.telefoneDdd,
    TelefoneNumero: user.telefoneNumero,
    City: restaurant.cidadeEntrega,
    State: restaurant.estadoEntrega,
    PersonId: user.id,
    Latitude: -20.58522,
    Longitude: -41.2358,
    InsertDate: new Date(),
    UpdateDate: new Date()
  };
};
