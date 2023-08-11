<template>
  <div class="header-container">
    <div class="top-header">
      <img src="@/assets/ginger.png" width="50px" height="40px" alt="">
      <h2 class="main-name">Community</h2>
      <div class="search-area">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </div>
      <button type="button" class="btn btn-info search-btn">search</button>
      <button type="button" class="btn btn-light log-btn" @click="loginOut">{{checkLogin}}</button>

    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">메인 페이지</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Best 게시판
            <!-- <span class="sr-only">(current)</span> -->
          </a>
          <a class="nav-item nav-link" href="#">유머 게시판</a>
          <a class="nav-item nav-link" href="#">공부 게시판</a>
          <a class="nav-item nav-link" href="#">게임 게시판</a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLogin: false,
      }
    },
    mounted() {
      localStorage.getItem("isLogin") ? this.isLogin = true : this.isLogin = false;
    },
    computed: {
      checkLogin() {
        return localStorage.getItem("isLogin") ? '로그아웃' : '로그인';
      }
    },
    methods: {
      loginOut() {
        if (this.isLogin) {
          localStorage.removeItem("isLogin");
          this.$backPage();
        }

        if (!this.isLogin) {
          this.$backPage();
        }
      }
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
    
    .top-header .log-btn{
      margin: auto 0 0 auto;
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
