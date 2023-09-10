<template>
  <div class="header-container">
    <div class="top-header">
      
      <img src="@/assets/comhub.png" class="logo" @click="closeAll">
      <div class="search-area">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchWord">
          <button type="button" class="btn btn-info search-btn" @click="searchBoard">search</button>
      </div>

      <div class="member-area">
          <button type="button" class="btn mem-btn" v-if="isLogin" @click="memberUpdate">회원수정</button>
          <button type="button" class="btn log-btn" @click="loginOut">{{checkLogin}}</button>
      </div>
    </div>
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">메인 페이지</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Best 게시판
            
          </a>
          <a class="nav-item nav-link" href="#">유머 게시판</a>
          <a class="nav-item nav-link" href="#">공부 게시판</a>
          <a class="nav-item nav-link" href="#">게임 게시판</a>
        </div>
      </div>
    </nav> -->
  </div>
  <hr>
</template>
<script>
  export default {
    data() {
      return {
        isLogin: false,
        searchWord: ''
      }
    },
    mounted() {
      localStorage.getItem("isLogin") ? this.isLogin = true : this.isLogin = false;
    },
    computed: {
      checkLogin() {
        return localStorage.getItem("isLogin") ? '로그아웃' : '로그인';
      },
    },
    methods: {
      searchBoard() {
        this.$emit('searchBoard', this.searchWord);
      },
      async loginOut() {
        if (this.isLogin) {
          localStorage.removeItem("isLogin");
          await this.$clearLayer();
          location.reload();
          return;
        }

        if (!this.isLogin) {
          this.$pushContents('Login');
        }
      },
      memberUpdate() {
        this.$pushContents('MemberUpdate');
      },
      closeAll() {
        this.$clearLayer();
      }
    }
  }
</script>
<style>
    .navbar {
      padding: 1vw;
    }
    .top-header {
      margin-top: 10px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
    }
    .logo{
      width: 150px; /* 150px */
      height: 40px;
      float: left;
      margin-left: 3vw;
    }
    .top-header .log-btn:hover .mem-btn:hover{
      background-color: rgba(194, 194, 194, 0.99);
    }
    .search-area{
      display: flex;
      margin-left:2.5vw;
    }
    .member-area{
      width: 200px;
      margin-right: 3vw;
    }

    .mr-sm-2{
      width: 53.5vw;
      /* margin-right: 1px; */
    }

    @media (max-width: 825px) {
  .mr-sm-2{
    width: 28.5vw;
  }
  /* .search-btn */
}

@media (max-width: 450px) {
  .mr-sm-2{
    display: none;
  }
  .search-btn{
    display: none;
  }
}
</style>
