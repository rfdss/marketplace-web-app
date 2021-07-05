// AUTH MUTATIONS

export const SET_ERROR = (state, hasError) => {
  state.hasError = hasError
}

export const SET_ERROR_TYPE = (state, errorType) => {
  state.errorType = errorType
}

export const SET_ERROR_MSG = (state, errorMsg) => {
  state.errorMsg = errorMsg
}

export const SET_ERROR_FIELD = (state, errorField) => {
  state.errorField = errorField
}
