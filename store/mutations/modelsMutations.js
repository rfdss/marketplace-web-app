// PRODUCT MUTATIONS

export const SET_CURRENT_MODEL = (state, model) => {
  state.MODELS.currentModel = model
}

export const FETCH_MODELS = (state, modelsList) => {
  state.MODELS.modelsList = modelsList
}
