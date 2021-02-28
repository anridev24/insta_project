import jwt_decode from 'jwt-decode'

export const ValidateToken = token => {
  if (token === null) return false
  const decodedToken = jwt_decode(token)
  const expTime = decodedToken.exp * 1000
  const nowtime = new Date().getTime()
  if (expTime < nowtime) {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-id')
    return false
  } else {
    return true
  }
}

export default ValidateToken
