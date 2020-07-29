import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://localhost:7001' : ''
})

export const getAricleList = () => {
  return service.get('/default/getArticleList')
}

export const getArticleById = (id) => {
  return service.get('/default/getArticleById/' + id)
}

export const getNavList = () => {
  return service.get('/default/getNavList')
}

export const getListById = (id) => {
  return service.get('/default/getListById/' + id)
}