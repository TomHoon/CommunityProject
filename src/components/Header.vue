<template>
  <div class="header-container">
    <div class="top-header">
      
      <img src="@/assets/ginger.png" width="50px" height="40px" alt="">
      <h2 class="main-name">Community</h2>
      <div class="search-area">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchWord">
      </div>
      <button type="button" class="btn btn-info search-btn" @click="searchBoard">search</button>
      <span class="btn_member">
        <button type="button" class="btn mem-btn" v-if="isLogin" @click="memberUpdate">회원수정</button>
        <button type="button" class="btn log-btn" @click="loginOut">{{checkLogin}}</button>
      </span>
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
    }
  }
</script>
<style>
    .navbar {
        padding: 10px;
    }
    .top-header {
      display:flex;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .top-header .btn_member {
      margin-left: auto;
    }
    .top-header .log-btn{
      margin-right: 20px;

    }
    .top-header .log-btn:hover{
      background-color: rgba(194, 194, 194, 0.99);
    }
    .top-header .mem-btn{
      margin-right: 10px;
    }
    .top-header .mem-btn:hover{
      background-color: rgba(194, 194, 194, 0.99);
    }
    .top-header .search-area{
      width: 50%;
    }
    .search-btn {
      margin-left: 5px;
    }

    .main-name {
      margin-left: 3px;
      margin-right: 3px;
    }

</style>
