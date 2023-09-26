<template>
  <div class="header-container">
    <div class="top-header">
      
      <img src="@/assets/comhub.png" class="logo" @click="closeAll">
      <div class="search-area">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchWord" @keyup.enter="searchBoard">
          <button type="button" class="btn btn-info search-btn" @click="searchBoard">search</button>
      </div>

      <div class="member-area">
          <button type="button" class="btn mem-btn" v-if="isLogin" @click="memberUpdate">회원수정</button>
          <button type="button" class="btn log-btn" v-if="isLogin == false" @click="fnJoin">회원가입</button>
          <button type="button" class="btn log-btn" @click="loginOut">{{checkLogin}}</button>
      </div>
    </div>
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
        this.$emit('allBoard')
      },
      fnJoin() {
        this.$pushContents('Agreement');
      },
    },
    emits: ['searchBoard', 'allBoard'],
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
      cursor: pointer;
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
