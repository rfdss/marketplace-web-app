import * as initialState from './utils/initialState'

// Function to generate the initial state
function getInitialState() {
  return {
    
    ...initialState,
    
    overlay: {
      open: false,
      loading: false,
      sidebar: false,
      toast: null,
      iconBox: null,
    },

    overlayOpen: false,
    sidebarOpen: false,
    hasOverlayLoading: false,
    overlayToast: null,
    iconBoxActive: false,

    hasError: false,
    errorType: false,
    errorMsg: null,
    errorField: null,

    userToken: localStorage.getItem('userToken') || null,
  }
}

// Mutations

import * as authMutations from './mutations/authMutations'
import * as userMutations from './mutations/userMutations'
import * as restaurantMutations from './mutations/restaurantMutations'
import * as productMutations from './mutations/productMutations'
import * as modelsMutations from './mutations/modelsMutations'
import * as cartMutations from './mutations/cartMutations'
import * as deliveriesMutations from './mutations/deliveriesMutations'

// Actions

import * as authActions from './actions/authActions'
// import * as userActions from './actions/userActions'
import * as restaurantActions from './actions/restaurantActions'
import * as productActions from './actions/productActions'
import * as modelsActions from './actions/modelsActions'
import * as cartActions from './actions/cartActions'
import * as deliveriesActions from './actions/deliveriesActions'

export const state = () => getInitialState()

export const mutations = {

  ...authMutations,
  ...userMutations,
  ...restaurantMutations,
  ...productMutations,
  ...modelsMutations,
  ...cartMutations,
  ...deliveriesMutations,

  resetState (state) {
    const s = getInitialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  resetErrors (state) {
    state.hasError = false
    state.errorType = false
    state.errorMsg = null
    state.errorField = null
  },

  SET_OVERLAY (state, payload) {
    for (let prop in payload) {
      state.overlay[prop] = payload[prop]
    }
  },

  SET_OVERLAY_OPEN (state, value) {
    state.overlayOpen = value
  },

  SET_OVERLAY_LOADING (state, value) {
    state.hasOverlayLoading = value
  },

  SET_OVERLAY_TOAST (state, obj) {
    state.overlayToast = obj
  },

  SET_SIDEBAR_OPEN (state, value) {
    state.sidebarOpen = value
  },

  SET_ICON_BOX_ACTIVE (state, value) {
    state.iconBoxActive = value
  }
}

export const actions = {

  ...authActions,
  ...restaurantActions,
  ...productActions,
  ...modelsActions,
  ...cartActions,
  ...deliveriesActions,

  setOverlay ({ commit }, payload) {
    commit('SET_OVERLAY', payload)
  },

  toggleOverlay ({ commit }, value) {
    commit('SET_OVERLAY_OPEN', value)
  },

  setOverlayLoading ({ commit }, value) {
    commit('SET_OVERLAY_LOADING', value)
  },

  setOverlayToast ({ commit }, obj) {
    commit('SET_OVERLAY_TOAST', obj)
  },
  
  toggleSidebar ({ commit }, value) {
    commit('SET_SIDEBAR_OPEN', value)
  },

  setIconBoxActive ({ commit }, value) {
    commit('SET_ICON_BOX_ACTIVE', value)
  }
}

export const getters = {
  getToken: (state) => {
    return (!state.userToken || state.userToken == "null") 
      ? null 
      : state.userToken
  }
}
