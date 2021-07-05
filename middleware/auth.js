// AUTH MIDDLEWARE

export default function ({ isServer, store, req, redirect, route }) {
  // If nuxt generate, pass this middleware
  // if (isServer && !req) return

  // const { USER } = store.state
  // const userData = sessionStorage.getItem('user')
  // const noAuthPages = ['login', 'cadastro', 'cadastro-primeiro-restaurante']

  // if (!userData && !noAuthPages.includes(route.name)) {
  //   return redirect('/login')
  // }

  // if (userData && (noAuthPages.includes(route.name) && route.name != noAuthPages[2] )) {
  //   return redirect('/')
  // }
  
  // if (userData && !USER.token) {
  //   store.commit('SET_USER_DATA', JSON.parse(userData))
  // }
}