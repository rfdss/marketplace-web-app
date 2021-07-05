// USER MUTATIONS

export const SET_USER_DATA = (state, userData) => {
  state.USER.data = userData
}

export const SET_USER_TOKEN = (state, userToken) => {
  state.USER.token = userToken
}
