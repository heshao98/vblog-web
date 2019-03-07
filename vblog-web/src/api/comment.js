import request from '@/request'


export function getCommentsByArticle(id) {
  return request({
    url: `/comments/article/${id}`,
    method: 'get'
  })
}

export function publishReply(reply){
  return request({
    url: '/replys',
    method: 'post',
    data: reply
  })
}

export function publishComment(comment) {
  return request({
    url: '/comments',
    method: 'post',
    data: comment
  })
}

