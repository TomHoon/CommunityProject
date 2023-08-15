<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="title left-align">
       {{ boardData.title }}`
      </div>

      <div class="sub left-align">
        <img :src="userInfo.userImgPath" class="profile-img"> {{ boardData.writer }} | 조회 {{ hit }} | 추천 {{ recommend }} | 일시 {{ boardData.reg_date }} 
          <button class="btn" @click="deleteBoard" v-if="isOwner">삭제</button>
          <button class="btn" @click="updateBoard" v-if="isOwner">수정</button>
      </div>
      
      <hr>

      <div class="content left-align">
        <div>
          <img :src="boardData.image_path" alt="" class="content-img">
        </div>
        <div class="content-text">
          {{ boardData.content }}
        </div>
      </div>

      <button class="btn" @click="updateRecommend( boardData.id )">
        <div> {{ recommend }}</div>
        추천
      </button>

      <button class="btn" @click="backPage">
        뒤로가기
      </button>
    </div>


    <div class="board-bottom" v-if="!isMobile">
      <div class="comment-container">
        <div class="comment-wrapper">
          <div class="comment-info">
            <div class="info-left">
              <h3>댓글: 1</h3>
            </div>
            <div class="info-right">
              <button>
                댓글
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="comment-area">
              <table>
                <tbody>
                <tr>
                  <td>
                    <strong>tomhoon</strong>
                  </td>
                  <td>
                    머라쓴거임?ㅋ
                  </td>
                  <td>
                    <div class="thumbs-area">
                      <div class="thumbs-area-buttons">
                        <button>
                          <!-- 색상 안들어간 따봉 up -->
                          <i class="bi bi-hand-thumbs-up"></i>

                          <!-- 색상 들어간 따봉 up-->
                          <!-- <i class="bi bi-hand-thumbs-up-fill"></i> -->
                          <span>12</span>
                        </button>
                        <button>
                          <!-- 색상 들어간 따봉 up-->
                          <i class="bi bi-hand-thumbs-down"></i>

                          <!-- 색상 들어간 따봉 down-->
                          <!-- <i class="bi bi-hand-thumbs-down-fill"></i> -->
                          <span>2</span>
                        </button>
                      </div>
                      <div>
                        2023.08.13
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 모바일 -->
    <div class="board-bottom">
      <table>
        <tbody>
          <tr>
            <div class="board-comment">
              <p class="comment">댓글 내용 ㅋㅋㅋ</p>
            </div>
            <div class="board-info">
              <span class="nickname">닉네임</span>
              <span>2023.08.14</span>
            </div>
            <div class="board-buttons">
              <div></div>
              <div>
                <button>신고</button>
                <button>업</button>
                <button>다운</button>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recommend: 0,
      hit : 0,
      isMobile:true,
      getCommentAll: [],
      userInfo: {},
      fileInfo: {}
    }
  },
  computed:{
    boardData() {
      return this.pageParams.boardData;
    },
    isOwner() {
      return this.pageParams.boardData.writer == localStorage.getItem('id')
    }
  },
  async mounted() {
    window.innerWidth <= 425 ? this.isMobile = true : this.isMobile = false;
    
    await axios.post('/getOneMember', {member_id: localStorage.getItem('id')}).then((res) => this.userInfo = res.data);
    await axios.post('/getOneFile', {file_idx: this.userInfo.file_idx})
      .then(res => this.fileInfo = res.data);
    this.userInfo['userImgPath'] = this.fileInfo.file_name;

    await axios.post('/getBoardById', {id:this.pageParams.boardData.id}).then(response => {
      this.hit = response.data.hit;
      this.recommend = response.data.recommend;
    });
  },

  props: ['pageParams'],
  methods:{
    updateBoard() {
      this.$pushContents('boardModify', {board: this.boardData});
    },
    async deleteBoard() {
      await axios.post('deleteBoard', {'id': this.boardData.id})
      .then(res => this.$backPage())
      .catch(error => console.log(error));
    },
    backPage() {
      this.$backPage({boardParam: '백페이지에서 사용할 파람'});
    },
    
    updateRecommend(payload) {
      let param = {
        id : payload
      }
      axios.post('/updateRecommendBoard', param)
      .then(() => {
        this.recommend = Number(this.recommend) + 1
      })
      .catch((error) => {
        console.error('오류', error);
      })
    },
  },
}
</script>

<style scoped>
.left-align{
  text-align: left;
  padding: 10px;
}
.main{
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  margin-top : 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
.profile-img{
  width: 30px;
  height: 30px;
  border-radius: 30px;
}
.title{
  font-size: 30px;
  font-weight: bold;
}
.content{
  margin: 20px auto;
}
.content-img{
  width:80%;
  max-width: 1050px;
}
.content-text{
  margin : 20px auto;
}

.btn{
    color:#ad74e3;
    background-color: pink;
    width: 100px;
    margin : 5px;
    height: 80px;
    border: 0px;
    /* border-radius: 3px; */
    font-size: 17px;
}
.comment-wrap {

}
.comment-form {
  box-sizing: border-box;
  /* border: 1px solid gray; */
  width: 900px;
  height: 200px;
  margin: 30px auto ;
}
.comment-area {
  max-width:1100px;
  min-width:800px;
  display:inline-block;
}
.comment-area table{
  border-top: 1px solid #c2c2c2;
  border-left: 1px solid #c2c2c2;
  border-right: 1px solid #c2c2c2;
}
.comment-info {
  width:1050px;
  margin-top: 20px;
  max-width:1100px;
  min-width:800px;
  display:inline-block;
}
.comment-info .info-left{
  display:block;
  float:left;
}
.comment-info .info-right{
  display:block;
  float:right;
}
.comment-info .info-right button{
  border-radius:15px;
  padding: 8px;
}
.comment-area  table tr{
  height: 60px;
}
.comment-area  table tr td{
  width: 7%;
  text-align: left;
  padding:10px;
  border:1px solid black;
}
.comment-area  table tr td:nth-child(1){
  background-color: #dfe5f5 !important;
  width:1%;
}
.comment-area  table tr td:nth-child(2){
  width:45%;
}
.thumbs-area button{
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.thumbs-area-buttons{
 width: 100%;
}

.board-bottom{
  margin-bottom: 135px;
  padding:10px;
}
@media (min-width:200px) and (max-width:480px) {
  .board-bottom {
    width: 85%;
  }
  .board-comment {
    position:relative;
    left: 0;
  }
  .comment {
    text-align: left;
  }
  .board-buttons {
    display: inline-block;
  }
  .nickname {
    text-align: left;
    margin-right:15px;
  }
  .board-info {
    display:inline-block;
    vertical-align: middle;
    width:100%;
    text-align: left;
  }
}

</style>