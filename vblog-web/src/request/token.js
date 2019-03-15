export function getToken() {
  return localStorage.token
}

export function setToken(token) {
  return localStorage.token = token
}

export function getRefreshToken() {
  return localStorage.refreshToken
}

export function setRefreshToken(token) {
  return localStorage.refreshToken = token
}

export function removeRefreshToken() {
  return localStorage.removeItem('refreshToken')
}

export function removeToken() {
  return localStorage.removeItem('token')
}


