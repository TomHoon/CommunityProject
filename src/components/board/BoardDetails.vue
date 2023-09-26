<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="title left-align">
       [{{boardData.gubun }}] {{ boardData.title }} <span class="title-comment" v-if="commentList.length > 0"> [{{commentList.length}}] </span>
      </div>

      <hr>

      <div class="sub left-align">
        <img :src="getImgPath" class="profile-img">
        <div class="profile-name">
          <div> 
            {{ boardData.writer }}
          </div> 
          <div class="profile-content">  
            <div>추천 <span class="font-red">{{ recommend }}</span> | 조회 {{ hit }}</div>
            <div>일시 {{ boardData.reg_date }}</div>
          </div> 
        </div>
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

      <div>
        <button class="middle-btn" @click="updateRecommend( boardData.id )">
          <div>{{ recommend }}</div>
          추천
        </button>
      </div>
      
      <hr>

      <div>
        <button type="button" class="btn btn-primary left-btn" @click="goWrite">글쓰기</button>
        <button type="button" class="btn btn-primary left-btn" @click="updateBoard" v-if="isOwner">수정</button>
        <button type="button" class="btn btn-primary left-btn" @click="deleteBoard" v-if="isOwner">삭제</button>
        <button type="button" class="btn btn-primary right-btn" @click="backPage">목록</button>
      </div>

    </div>

    <div class="board-bottom" v-if="!isMobile">
      <div class="comment-container">
        <div class="comment-wrapper">
          <div class="comment-info">
            <span class="info-left">
              <h6>댓글 | 총 {{commentList.length}} 개</h6>
            </span>
            <span class="info-right">
              <button>
                <i class="bi bi-pencil">댓글 목록</i>
              </button>
            </span>
          </div>
          <div class="comment-area">
              <table>
                <tbody>
                <tr v-for="(item, idx) in commentList" :key="idx">
                  <td>
                    <strong>{{item.member_id}}</strong>
                  </td>
                  <td>
                    {{item.comment_content}}
                  </td>
                  <td>
                    <div class="thumbs-area">
                      <div class="thumbs-area-buttons">
                        <button @click="recommendUpDown(1, item.comment_idx)" >
                          <!-- 색상 안들어간 따봉 up -->
                          <i class="bi bi-hand-thumbs-up"></i>

                          <!-- 색상 들어간 따봉 up-->
                          <!-- <i class="bi bi-hand-thumbs-up-fill"></i> -->
                          <span>{{item.comment_recommend}}</span>
                        </button>
                        <button @click="recommendUpDown(2, item.comment_idx)">
                          <!-- 색상 들어간 따봉 up-->
                          <i class="bi bi-hand-thumbs-down"></i>

                          <!-- 색상 들어간 따봉 down-->
                          <!-- <i class="bi bi-hand-thumbs-down-fill"></i> -->
                          <span>{{item.comment_unrecommend}}</span>
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
            <hr>
            <div class="comment-write-area">
              <textarea v-model="commentContent" name="" id="" cols="120" rows="2" class="comment-textarea" />
              <button @click="addComment">댓글쓰기</button>
            </div>
          </div>
        </div>
      </div>
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
      fileInfo: {},
      defaultImgPath: '/upload/1692455050106profile_Img.jpg',
      commentContent: '',
      commentList: [],
    }
  },
  computed:{
    boardData() {
      return this.pageParams.boardData;
    },
    isOwner() {
      if (!localStorage.getItem('isLogin')) {
        return
      }
      return this.pageParams.boardData.writer == localStorage.getItem('id');
    },
    getImgPath() {
      return !this.userInfo ? this.defaultImgPath : this.userInfo.userImgPath;
    },
  },
  async mounted() {
    let res = await axios.post('/getCommentByBoard', {id: this.boardData.id});
    console.log("mounted getCommentByBoard res.data >>>> ", res.data);
    
    this.commentList = res.data;


    window.innerWidth <= 425 ? this.isMobile = true : this.isMobile = false;

    // Promise all 사용하는 경우 텀이 있어서 file이 안불러와지는 오류가 있음
    await axios.post('/getOneMember', {member_id: this.pageParams.boardData.writer}).then(res => this.setUserInfo(res.data));
    await axios.post('/getOneFile', {file_idx: this.userInfo.file_idx}).then(res => this.setFileInfo(res.data));
    await axios.post('/getBoardById', {id:this.pageParams.boardData.id}).then(res => this.setBoardInfo(res.data));
  },

  props: ['pageParams'],
  methods:{
    goWrite(){
      if (!localStorage.getItem('isLogin')) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
      this.$pushContents('BoardWrite');
    },
    updateBoard() {
      this.$pushContents('boardModify', {board: this.boardData});
    },
    async deleteBoard() {
      await axios.post('deleteBoard', {'id': this.boardData.id})
      // .then(res => this.$backPage())
      .then(this.$backPage())
      .catch(error => console.log(error));
    },
    backPage() {
      this.$backPage({boardParam: '백페이지에서 사용할 파람'});
    },
    
    updateRecommend(payload) {
      if (!localStorage.getItem('isLogin')) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
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
    setUserInfo(data) {
      this.userInfo = data;
    },
    setFileInfo(data) {
      this.fileInfo = data;

      // 사용자 정보가 사라지지 않은 경우만 
      if (this.userInfo) {
        // 사용자 정보가 있지만 이미지 path가 없는 경우 방어 코드
        !this.fileInfo.file_path ? this.userInfo['userImgPath'] = this.defaultImgPath : this.userInfo['userImgPath'] = this.fileInfo.file_path;
      }
    },
    setBoardInfo(data) {
      this.hit = data.hit;
      this.recommend = data.recommend;
    },
    async addComment() {
      if (!this.commentContent) {
        alert('댓글 내용을 작성해주세요.');
        return;
      }

      let param = {
        member_id: localStorage.getItem('id'),
        id: this.boardData.id,
        comment_content: this.commentContent
      }
      await axios.post('/addComment', param);

      this.commentContent = '';

      let res = await axios.post('/getCommentByBoard', {id: this.boardData.id});
      this.commentList = res.data;
    },
    async recommendUpDown(flag, idx) {
      let param = {
        comment_idx: idx
      };
      if (flag == 1) {
        param['comment_recommend'] = 1;
        param['comment_unrecommend'] = '';
        let res = await axios.post('/recommendUpDown', param);
        console.log(res.data);
      }

      if (flag == 2) {
        param['comment_recommend'] = '';
        param['comment_unrecommend'] = 1;
        let res = await axios.post('/recommendUpDown', param);
        console.log(res.data);
      }

      let res = await axios.post('/getCommentByBoard', {id: this.boardData.id});
      this.commentList = res.data;
    }
  },
}
</script>

<style scoped>
.left-align{
  text-align: left;
}
.title-comment{
  font-size: 20px;
  color:blue;
  vertical-align: middle;
}
.main{
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  margin-top : 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  padding-bottom: 4rem;
}
.sub{
  display: flex;
}
.profile-img{
  width: 150px;
  height: 150px;
}
.profile-name{
  font-size: 30px;
  padding-left : 10px;
  margin-top : -10px;
}
.profile-content{
  font-size: 20px;
}
.font-red{
  color:red;
}
.title{
  font-size: 30px;
  font-weight: bold;
}
.content{
  margin: 20px auto;
}
.content-img{
  max-width: 1050px;
}
.content-text{
  margin : 20px auto;
}
.middle-btn{
color: white;
background-color:#0d6efd;
width: 100px;
height: 80px;
margin: 5px;
border: 0px;
font-size: 17px;
border-radius: 10px;
}

.left-btn{
  float: left;
  /* margin-top: 5px; */
  margin-left: 10px;
}
.right-btn{
  float: right;
  margin-right: 10px;
}



/* 
.comment-wrap {
  
 } 
 */

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
  /* padding: 8px; */
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
.comment-write-area {
  display:flex;
  margin-top: 30px;
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