<template>
  <div class="me-view-comment-item">
    <div class="me-view-comment-author">
      <a class="">
        <img class="me-view-picture" :src="comment.avatar"/>
      </a>
      <div class="me-view-info">
        <span class="me-view-nickname">{{comment.nickname}}</span>
        <div class="me-view-meta">
          <!--<span>{{rootCommentCounts - index}}楼</span>-->
          <span>{{comment.createTime | format}}</span>
        </div>
      </div>
    </div>
    <div>
      <p class="me-view-comment-content">{{comment.content}}</p>
      <div class="me-view-comment-tools">
        <a class="me-view-comment-tool" @click="showComment(-1)">
          <i class="me-icon-comment"></i>&nbsp; 评论
        </a>
      </div>

      <div class="me-reply-list">
        <div class="me-reply-item" v-for="c in comment.reply" :key="c.id">
          <div style="font-size: 14px">
            <span class="me-reply-user">{{c.nickname}}:</span>
            <!--<span class="me-reply-user" v-if="c.parentId == '0'">@{{comment.nickname}} </span>-->
            <span class="me-reply-user" v-if="c.parentId !== '0'">@{{c.parentNickname}} </span>
            <span>{{c.content}}</span>
          </div>
          <div class="me-view-meta">
            <span style="padding-right: 10px">{{c.createTime | format}}</span>
            <a class="me-view-comment-tool" @click="showComment(c)">
              <i class="me-icon-comment"></i>&nbsp;回复
            </a>
          </div>
        </div>

        <div class="me-view-comment-write" v-show="commentShow">
          <el-input
            v-model="reply.content"
            type="input"
            style="width: 90%"
            :placeholder="placeholder"
            class="me-view-comment-text"
            resize="none">
          </el-input>
          <el-button style="margin-left: 8px" @click="publishComment(c)" type="text">评论</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {publishComment,publishReply} from '@/api/comment'
  import store from '../../store'

  export default {
    name: "CommentItem",
    props: {
      articleId: String,
      comment: Object,
      index: Number,
      // rootCommentCounts: Number
    },
    data() {
      return {
        parentId: '',
        parentNickname: '',
        parentUserId: '',
        placeholder: '你的评论...',
        commentShow: false,
        commentShowIndex: '',
        reply:{}
        // reply: this.getEmptyReply()
      }
    },
    methods: {
      showComment(c) {
        this.reply = this.getEmptyReply(c)
        this.commentShow = true
        console.log(this.reply)
      },
      publishComment(reply) {
        let that = this
        if (!that.reply.content) {
          return;
        }

        if(store.state.account.length === 0){
          that.$message({type: 'error', message: '登录后才能评论哦～', showClose: true})
          return;
        }

        publishReply(that.reply).then(data => {
          that.$message({type: 'success', message: '评论成功', showClose: true})
          if(!that.comment.childrens){
            that.comment.childrens = []
          }
          that.comment.childrens.unshift(data.data)
          that.$emit('commentCountsIncrement')
          that.showComment(that.commentShowIndex)
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '评论失败', showClose: true})
          }
        })

      },
      getEmptyReply(c) {
        return {
          commentId: this.comment.id,
          parentId: c.id,
          parentNickname: c.nickname,
          parentUserId: c.userId,
          nickname:store.state.account
        }
      }
    }
  }
</script>

<style>
  .me-view-tag-item {
    margin: 0 4px;
  }

  .me-view-comment {
    margin-top: 60px;
  }

  .me-view-comment-title {
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
  }

  .me-view-comment-write {
    margin-top: 20px;
  }

  .me-view-comment-text {
    font-size: 16px;
  }

  .v-show-content {
    padding: 8px 25px 15px 0px !important;
  }

  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .me-view-comment-item {
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .me-view-comment-author {
    margin: 10px 0;
    vertical-align: middle;
  }

  .me-view-nickname {
    font-size: 14px;
  }

  .me-view-comment-content {
    line-height: 1.5;
  }

  .me-view-comment-tools {
    margin-top: 4px;
    margin-bottom: 10px;
  }

  .me-view-comment-tool {
    font-size: 13px;
    color: #a6a6a6;
    padding-right: 14px;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }

  .me-reply-list {
    padding-left: 16px;
    border-left: 4px solid #c5cac3;
  }

  .me-reply-item {
    margin-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }

  .me-reply-user {
    color: #78b6f7;
  }
</style>
