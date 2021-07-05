// AUTH MIDDLEWARE

export default function ({ route }) {
  const userData = sessionStorage.getItem('user')
  console.log(userData)
  console.log(route)
}