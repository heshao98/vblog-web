import request from '@/request'

export function register(account, nickname, password,verificationCode) {
  const data = {
    account,
    nickname,
    password,
    verificationCode
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function getVerification(){
  return request ({
    url:"/defaultKaptcha",
    method:"get"
  })
}

export function login(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/curr_user',
    method: 'get'
  })
}

