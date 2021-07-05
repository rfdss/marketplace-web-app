import axios from 'axios'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const logout = ({ commit }) => {
  sessionStorage.clear()
  commit('resetState')
}

export const login = ({ commit }, data) => {
  const { email, password } = data
  return axios.get(`${Endpoints.login}/${email}/${password}`, Config.API_OPTIONS)
}

export const register = ({ commit }, data) => {
  let { cpf, name, email, password, phone } = data

  phone = data.phone.replace(/\D/g, '')
  cpf = data.cpf.replace(/\D/g, '')

  let user = {
    CpfCnpj: cpf,
    Name: name,
    Email: email,
    Password: password,
    TelefoneDdd: phone.substring(0, 2),
    TelefoneNumero: phone.substring(2, phone.length)
  }
  
  let userLocalStorage = sessionStorage.getItem('user')
  userLocalStorage = JSON.parse(userLocalStorage)

  if (userLocalStorage) {
    user = { ...user, Id: userLocalStorage.id }
    user = _.omit(user, 'Password')
  }

  console.log(user)
  // return false

  return axios.post(Endpoints.register, user, Config.API_OPTIONS)
}

export const setUserData = ({ commit }, userData) => {
  const userDataStr = JSON.stringify(userData)
  sessionStorage.setItem('user', userDataStr)
  commit(Types.SET_USER_DATA, userData)
  commit(Types.SET_USER_TOKEN, userData.token)
  commit('resetErrors')
}

export const setError = ({ commit }, data) => {
  const { hasError, errorMsg } = data
  commit('SET_ERROR', hasError)
  commit('SET_ERROR_MSG', errorMsg)
  commit(Types.SET_USER_TOKEN, null)
}