import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'

import * as Config from '@/api/config'
import * as Types from './helpers/types'
import * as Endpoints from '@/api/endpoints'

export const resetCart = ({ commit }) => {
  localStorage.removeItem('cartProducts')
  commit(Types.RESET_CART, [])
}

export const updateCart = ({ commit }, items) => commit(Types.UPDATE_CART, items)

export const addCartProduct = ({ commit, state }, item) => {
  const { cartProducts } = state.CART
  const cartUpdated = [...cartProducts, item]
  commit(Types.UPDATE_CART, cartUpdated)
  localStorage.setItem('cartProducts', JSON.stringify(cartUpdated))
}

export const removeCartProduct = ({ commit }, payload) => {
  const { items, itemId } = payload
  const filtered = items.filter(cartItem => cartItem.offerId != itemId)
  commit(Types.REMOVE_PRODUCT, filtered)
  localStorage.setItem('cartProducts', JSON.stringify(filtered))
}

export const updateProductQuantity = ({ commit, state }, payload) => {
  const { cartProducts } = state.CART
  const { item, quantidade } = payload

  const products = cartProducts.map((product) => {
    if (product.offerId === item.offerId) return { ...product, quantidade }
    return product
  })

  commit(Types.UPDATE_CART, products)
  localStorage.setItem('cartProducts', JSON.stringify(products))
}

export const saveOrder = async ({ commit, state}, payload) => {
  const { deliveryDate, deliveryObs, model } = payload
  const orderData = await handleOrderData(state, deliveryDate, deliveryObs, model)

  // console.log(orderData)

  return axios.put(Endpoints.saveOrder, orderData, Config.API_OPTIONS)
}

const handleOrderData = async (state, deliveryDate, deliveryObs, model) => {
  const { RESTAURANT: { currentRestaurant }, CART: { cartProducts } } = state
  const totalOrder = _.sumBy(cartProducts, pro => calculateTotalOrder(pro) * pro.quantidade)

  if (typeof (model) === 'undefined' || model === null) model = ''

  const orderData = {
    customerId: currentRestaurant.id,
    status: 'PENDENTE',
    orderModelTitle: model,
    deliveryAddress: currentRestaurant.deliveryAddress,
    deliveryDate,
    deliveryObs,
    totalOrder,
    obs: '',
    orderAppItems: handleProducts(cartProducts)
  }

  return orderData
}

const handleProducts = (cartProducts) => {
  const orderProducts = cartProducts.map((product) => {
    const productPrice = calculateTotalOrder(product)
    return {
      id: 0,
      orderAppId: 0,
      offerId: product.offerId,
      supplierId: product.supplier.id,
      paymentMethodId: product.paymentMethodId,
      quantity: product.quantidade,
      price: productPrice,
      unit: product.unit,
      totalItem: product.quantidade * productPrice,
      obs: product.description || product.title
    }
  })

  return orderProducts
}

const calculateTotalOrder = (product) => {
  let price = 0
  
  price = product.price

  if (product.quantidade > product.promotionQuantity3 && product.promotionQuantity3 > 0) {
    price = product.promotionPrice3
  } 

  if (product.quantidade > product.promotionQuantity2 && product.promotionQuantity2 > 0) {
    price = product.promotionPrice2
  }

  if (product.quantidade > product.promotionQuantity && product.promotionQuantity > 0) {
    price = product.promotionPrice
  }

  if (product.approximateWeight > 0) {
    price *=  product.approximateWeight
  }

  return price
}
