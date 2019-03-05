import request from '@/request'

export function getArticles(query, page) {
  return request({
    url: '/articles/',
    method: 'get',
    params: {
      current: page.current,
      size: page.size,
      six: page.name,
      descs: page.descs,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      categoryId: query.categoryId
    }
  })
}

export function getHotArtices() {
  return request({
    url: '/articles/hot',
    method: 'get'
  })
}

export function getNewArtices() {
  return request({
    url: '/articles/new',
    method: 'get'
  })
}

export function viewArticle(id) {
  return request({
    url: `/articles/view/${id}`,
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function publishArticle(article) {
  return request({
    url: '/article/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/articles/file',
    method: 'get'
  })
}


/*
 * 以下俩接口暂时未用到
 * 可通过/article/list接口实现
 */
export function getArticlesByCategory(id) {
  return request({
    url: `/article/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/article/tag/${id}`,
    method: 'get'
  })
}

