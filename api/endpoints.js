import { API_URL } from './config'

// realizar o login do usuário na plataforma
export const login = `${API_URL}Account`;

// cria um novo usuário na plataforma
export const register = `${API_URL}Account`;

// atualiza os dados de perfil do usuário
export const profileUpdate = `${API_URL}Account`;

// faz o pedido de recuperação de senha
export const recovery = `${API_URL}recoverpassword`;

// recupera os items do menu principal do app com os produtos
export const getMenu = `${API_URL}Menu`;

// recupera a lista de restaurantes do usuário
export const getRestaurants = `${API_URL}Customer`;

// insere um novo restaurante no usuário
export const saveRestaurant = `${API_URL}Customer`;

// recupera as ofertas para um tipo de produto
export const getOffersByProduct = `${API_URL}Menu`;

// recupera as top ofertas para uma oferta
export const getTopOffers = `${API_URL}MenuTopOffers`;

// recupera os fornecedores do restaurante selecionado
export const fetchRestaurantSuppliers = `${API_URL}MenuSuppliers`;

// recupera os dados do fornecedor selecionado
export const fetchRestaurantSupplier = `${API_URL}MenuSupplier`;

// salva um novo pedido na plataforma
export const saveOrder = `${API_URL}OrderApp`;

// faz uma consulta por produtos
export const searchProducts = `${API_URL}MenuFilterOffers`;

// recupera lista de entregas
export const getDeliveries = `${API_URL}OrderCustomer`;

// salva avaliação do pedido
export const saveRating = `${API_URL}OrderRating`;

// salva ticket para cancelamento do pedido
export const saveOrderTicket = `${API_URL}OrderTicket`;

// recupera lista de modelos
export const getModels = `${API_URL}OrderModel`;

// deleta um modelo
export const deleteModel = `${API_URL}OrderModel`

// Obtem a imagem de uma oferta
export const getOfferImage = `${API_URL}ImageApp/offer`