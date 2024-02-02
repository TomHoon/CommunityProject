<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="title left-align">
        [{{boardData.gubun }}] {{ boardData.title }} <span class="title-comment" v-if="commentList.length > 0"> [{{commentList.length}}] </span>
      </div>

      <hr>

      <div class="sub left-align">
        <img :src="imgPath" class="profile-img">
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
    <Comment :boardDataId="this.boardData.id" :userId="userId"></Comment>
  </div>
</template>

<script>
import {
  getOneMember, getOneFile, getBoardById, deleteBoard, updateRecommendBoard, getCommentByBoard
}
from '@/api/index'

export default {
  data() {
    return {
      recommend: 0,
      hit : 0,
      userInfo: {},
      fileInfo: {},
      imgPath: this.$store.state.defaultImgpath,
      userId: '',
      commentList: []
    }
  },
  computed: {
    boardData() {
      return this.pageParams.boardData;
    },
    isOwner() {
      if (!this.$store.getters.isLogin) {
        return;
      }
      return this.pageParams.boardData.writer == this.$store.state.id;
    },
  },
  async mounted() {
    this.userId = this.$store.state.id

    // Promise all 사용하는 경우 텀이 있어서 file이 안불러와지는 오류가 있음
    const getOneMemberRes = await getOneMember(this.pageParams.boardData.writer)
    this.setUserInfo(getOneMemberRes.data)

    const getOneFileRes = await getOneFile(this.userInfo.file_idx)
    this.setFileInfo(getOneFileRes.data)

    const getBoardByIdRes = await getBoardById(this.pageParams.boardData.id)
    this.setBoardInfo(getBoardByIdRes.data)

    if (this.userInfo.userImgPath) {
      this.imgPath = this.userInfo.userImgPath
    }

    this.updateComment()
  },

  props: ['pageParams'],
  methods: {
    goWrite() {
      if (!this.$store.getters.isLogin) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
      this.$pushContents('BoardWrite');
    },
    updateBoard() {
      this.$pushContents('boardModify', {board: this.boardData});
    },
    async deleteBoard() {
      await deleteBoard(this.boardData.id)
      this.$backPage()
      // .then(res => this.$backPage())
    },
    backPage() {
      this.$backPage({boardParam: '백페이지에서 사용할 파람'});
    },
    async updateRecommend(payload) {
      if (!this.$store.getters.isLogin) {
        alert("로그인 이후 이용 가능합니다.");
        return;
      }
      let param = {
        id: payload
      }
      if (localStorage.getItem(this.$store.state.id) != payload) { // key: login / value : 글번호 가 없으면, 추천 +1
        await updateRecommendBoard(param)
        this.recommend = Number(this.recommend) + 1,
            localStorage.setItem(this.$store.state.id, payload) //아이디와 글번호를 저장
      } else {
        alert("추천은 게시글당 1회만 가능합니다.")
      }
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
    async updateComment() {
      let res = await getCommentByBoard(this.boardData.id)
      this.commentList = res.data;
    }
  },
}
</script>

<style scoped>
.left-align {
  text-align: left;
}

.title-comment {
  font-size: 20px;
  color: blue;
  vertical-align: middle;
}

.main {
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  padding-bottom: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
}

.sub {
  display: flex;
}

.profile-img {
  width: 100px;
  height: 100px;
}

.profile-name {
  font-size: 30px;
  padding-left: 10px;
  margin-top: -5px;
}

.profile-content {
  font-size: 20px;
}

.font-red {
  color: red;
}

.title {
  font-size: 30px;
  font-weight: bold;
}

.content {
  margin: 20px auto;
}

.content-img {
  max-width: 1050px;
  border-radius: 10px;
}

.content-text {
  margin: 20px auto;
  white-space: pre-wrap;
}

.middle-btn {
  color: white;
  background-color: #0d6efd;
  width: 100px;
  height: 80px;
  margin: 5px;
  border: 0px;
  font-size: 17px;
  border-radius: 10px;
}

.left-btn {
  float: left;
  /* margin-top: 5px; */
  margin-left: 10px;
}

.right-btn {
  float: right;
  margin-right: 10px;
}

@media (min-width: 200px) and (max-width: 480px) {
  .board-bottom {
    width: 85%;
  }

  .board-comment {
    position: relative;
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
    margin-right: 15px;
  }

  .board-info {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    text-align: left;
  }
}

</style>