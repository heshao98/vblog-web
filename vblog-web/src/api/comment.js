import request from '@/request'


export function getCommentsByArticle(id,comment_curr) {
  return request({
    url: `/comments/article/${id}/${comment_curr}`,
    method: 'get'
  })
}

export function publishReply(reply,flag){
  return request({
    url: '/replys',
    method: 'post',
    data: reply,flag

  })
}

export function publishComment(comment) {
  return request({
    url: '/comments',
    method: 'post',
    data: comment
  })
}

