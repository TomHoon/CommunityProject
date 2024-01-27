<template>
  <div class="board-bottom" v-if="!isMobile">
      <div class="comment-container">
        <div class="comment-wrapper">
          <div class="comment-info">
            <div class="info-left">
              <h6>댓글 | 총 {{commentList.length}} 개</h6>
            </div>
            <div class="info-right">
              <button @click="showComment">
                <i class="bi bi-pencil" v-if="comment==true" >댓글 끄기</i>
                <i class="bi bi-pencil" v-else>댓글 켜기</i>
              </button>
            </div>
          </div> <!-- comment-info -->
          <br/>
          <div class="comment-area" v-show="comment">
            <table>
              <tbody>
              <tr v-for="(item, idx) in commentList" :key="idx">
                <td>
                  <strong>{{item.member_id}}</strong>
                </td>
                <td class="comment-content">
                  {{item.comment_content}}
                </td>
                <td>
                  <div class="thumbs-area">
                    <div class="thumbs-area-buttons">
                      <button @click="recommendUpDown(1, item.comment_idx)" >
                        <!-- 색상 안들어간 따봉 up -->
                        <i class="bi bi-hand-thumbs-up" v-if="(!item.comment_up_id_list.includes(userId))"></i>
                        <!-- 색상 들어간 따봉 up-->
                        <i class="bi bi-hand-thumbs-up-fill" v-else @click="updateRecommendComment(item.comment_idx)"></i>
                        <span>{{item.comment_recommend}}</span>

                      </button>
                      <button @click="recommendUpDown(2, item.comment_idx)">
                        <!-- 색상 안 들어간 따봉 up-->
                        <i class="bi bi-hand-thumbs-down" v-if="(!item.comment_down_id_list.includes(userId))" ></i>
                        <!-- 색상 들어간 따봉 down-->
                        <i class="bi bi-hand-thumbs-down-fill" v-else @click="updateRecommendComment(item.comment_idx)"></i>
                        <span>{{item.comment_unrecommend}}</span>
                      </button>
                      <!--                          <button @click="recommendUpDown(1, item.comment_idx)" >
                                                &lt;!&ndash; 색상 안들어간 따봉 up &ndash;&gt;
                                                <i class="bi bi-hand-thumbs-up"></i>

                                                &lt;!&ndash; 색상 들어간 따봉 up&ndash;&gt;
                                                &lt;!&ndash; <i class="bi bi-hand-thumbs-up-fill"></i> &ndash;&gt;
                                                <span>{{item.comment_recommend}}</span>
                                              </button>
                                              <button @click="recommendUpDown(2, item.comment_idx)">
                                                &lt;!&ndash; 색상 들어간 따봉 up&ndash;&gt;
                                                <i class="bi bi-hand-thumbs-down"></i>

                                                &lt;!&ndash; 색상 들어간 따봉 down&ndash;&gt;
                                                &lt;!&ndash; <i class="bi bi-hand-thumbs-down-fill"></i> &ndash;&gt;
                                                <span>{{item.comment_unrecommend}}</span>
                                              </button>-->
                      <button v-if="commentOwner(item.member_id) == true" @click="deleteComment(item.comment_idx)">X</button>
                    </div>
                    <div>
                      {{item.comment_reg_date}}
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="comment-write-area">
              <textarea v-model="commentContent" name="" id="" cols="120" rows="2" class="comment-textarea" />
              <button class="comment-btn" @click="addComment">등록</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { addComment, deleteComment, recommendUpDown, getCommentByBoard } from '@/api/index'

export default {
  props: {
    boardDataId : String,
    userId : String,
  },

  data() {
    return {
      commentContent: '',
      comment: true,
      isMobile: true,
      getCommentAll: [],
      commentList: [],
    }
  },
  mounted() {
    window.innerWidth <= 425 ? this.isMobile = true : this.isMobile = false;
    this.updateComment()
  },
  methods: {
    async addComment() {
      if (!this.$store.getters.isLogin) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
      if (!this.commentContent) {
        alert('댓글 내용을 작성해주세요.');
        return;
      }

      let param = {
        member_id: this.$store.state.id,
        id: this.boardDataId,
        comment_content: this.commentContent
      }
      await addComment(param)

      this.commentContent = '';

      this.updateComment()
    },
    async deleteComment(payload) {
      if (!this.$store.getters.isLogin) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
      await deleteComment(payload)
      this.updateComment()
    },
    async recommendUpDown(flag, idx) {
      /**
       * 추천하는 아이디를 넣어줌 (중복 확인을 위해)
       *
       *
       */
      let param = {
        comment_idx: idx,
        comment_ud_temp_id: this.$store.state.id
      };
      let key = ['comment_recommend', 'comment_unrecommend'][flag - 1];
      param[key] = 1;

      let res = await recommendUpDown(param)
      console.log(res)
      this.updateComment()
      /*if (param.comment_ud_temp_id == localStorage.getItem("id")) {
        console.log(param.comment_ud_temp_id);
      }*/
    },
    
    commentOwner(payload) {
      if (!this.$store.getters.isLogin) {
        return false;
      }
      if (payload == this.$store.state.id)
        return true;

      return false;
    },
    showComment() {
      this.comment = !this.comment
    },
    async updateComment() {
      let res = await getCommentByBoard(this.boardDataId)
      this.commentList = res.data;
    }
  },
}
</script>

<style>
.board-bottom {
  margin-bottom: 135px;
  padding: 10px;
}

.comment-info {
  margin-top: 20px;
  max-width: 1100px;
  min-width: 800px;
  width: 100%;
  display: inline-block;
}

.comment-info .info-left {
  display: block;
  float: left;
}

.comment-info .info-right {
  display: block;
  float: right;
}

.comment-info .info-right button {
  border-radius: 15px;
  /* padding: 8px; */
}

.comment-area {
  max-width: 1100px;
  width: 100%;
  display: inline-block;
}

.comment-area table {
  border-top: 1px solid #c2c2c2;
  border-left: 1px solid #c2c2c2;
  border-right: 1px solid #c2c2c2;
}

.comment-area table tr {
  height: 60px;
}

.comment-area table tr td {
  width: 7%;
  text-align: left;
  padding: 10px;
  border: 1px solid black;
}

.comment-area table tr td:nth-child(1) {
  background-color: #dfe5f5 !important;
  width: 1%;
}

.comment-area table tr td:nth-child(2) {
  width: 45%;
}

.comment-content {
  white-space: pre-wrap;
}

.thumbs-area button {
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.thumbs-area-buttons {
  width: 100%;
}

.comment-write-area {
  display: flex;
  margin-top: 30px;
}

.comment-form {
  box-sizing: border-box;
  /* border: 1px solid gray; */
  width: 900px;
  height: 200px;
  margin: 30px auto;
}

.comment-textarea {
  border-radius: 10px 0 0 10px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 100%;
  border: none;
  /* background-color:#f1f1f1; */
  /* max-width:1050px; */
}

.comment-btn {
  width: 70px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}


@media (min-width: 200px) and (max-width: 480px) {

  .board-comment {
    position: relative;
    left: 0;
  }

  .comment {
    text-align: left;
  }
}
</style>