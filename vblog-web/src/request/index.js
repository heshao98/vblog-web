import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/request/token'
import {setToken} from '@/request/token'

const service = axios.create({
  baseURL: '/',
  timeout: 10000
})

//request拦截器
service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {

    //全局统一处理 Session超时
    if (response.headers['accessToken'] != null) {
      store.dispatch('SET_ACCESS_TOKEN',response.headers['accessToken'])
      setToken(response.headers['accessToken'])
    }

    const res = response.data;

    //0 为成功状态
    if (res.code !== 0) {

      //90001 Session超时
      if (res.code === 90001) {
        return Promise.reject('error');
      }

      //401 用户未登录
      if (res.code === 401) {
        console.info("用户未登录")

        Message({
          type: 'warning',
          showClose: true,
          message: '未登录或登录超时，请重新登录哦'
        })

        // store.dispatch('fedLogOut')

        return Promise.reject('error');
      }

      //70001 权限认证错误
      if (res.code === 70001) {
        console.info("权限认证错误")
        Message({
          type: 'warning',
          showClose: true,
          message: '你没有权限访问哦'
        })
        return Promise.reject('error');
      }
      return Promise.resolve(res);
    } else {
      console.log(response.data)
      return response.data;
    }
  },
  error => {
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject('error')
  })

export default service
