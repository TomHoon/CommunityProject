<template>
  <transition>
    <div v-if="menu" class="menu">
      <HeaderMenu @boardChange="boardChange"></HeaderMenu>
    </div>
  </transition>
  <div class="header-container">
    <div class="top-header">
      <img src="@/assets/burger.svg" class="burger" type="button" @click="menuStatus">
      <img src="@/assets/comhub.png" class="logo" @click="closeAll">
      <div class="search-area">
          <span type="button" class="search-btn-area" @click="searchBoard">
            <i class="fa-solid fa-magnifying-glass search-btn"></i>
          </span>
          <input class="search-input" aria-label="Search" v-model="searchWord" placeholder="Search Comhub" @keyup.enter="searchBoard">
      </div>

      <div class="member-area">
          <button type="button" class="btn mem-btn" v-if="isLogin" @click="memberUpdate">회원수정</button>
          <button type="button" class="btn log-btn" v-if="isLogin == false" @click="fnJoin">회원가입</button>
          <button type="button" class="btn log-btn" @click="loginOut">{{checkLogin}}</button>
      </div>
    </div>
  </div>
  <hr style="z-index: 2;">
</template>
<script>
  export default {
    data() {
      return {
        isLogin: false,
        searchWord: '',
        menu: false,
      }
    },
    mounted() {
      localStorage.getItem("isLogin") ? this.isLogin = true : localStorage.clear();
    },
    computed: {
      checkLogin() {
        return localStorage.getItem("isLogin") ? '로그아웃' : '로그인';
      },
    },
    methods: {
      searchBoard() {
        this.$emit('searchBoard', this.searchWord);
        this.$clearLayer( { searchWord : this.searchWord });
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
        this.$emit('allBoard');
        this.searchWord = '';
      },
      fnJoin() {
        this.$pushContents('Agreement');
      },
      menuStatus() {
        this.menu = !this.menu
      },
      boardChange(payload) {
        this.$emit('boardChange', payload)
      }
    },
    emits: ['searchBoard', 'allBoard','boardChange'],
  }
</script>
<style>
    .header-container{
      display: flex;
      justify-content: center;
    }

    .navbar {
      padding: 1vw;
    }
    .top-header {
      margin-top: 10px;
      margin-bottom: 5px;
      width: 1100px;
      display: flex;
      justify-content: space-between;
    }
    .burger{
      width: 25px;
      height: 25px;
      margin-top:10px;
    }
    .logo{
      width: 150px; /* 150px */
      height: 40px;
      cursor: pointer;
    }
    .menu{
      position: absolute;
      top: 72px;
      z-index: 1;
      border: 1px;
    }
    .top-header .log-btn:hover .mem-btn:hover{
      background-color: rgba(194, 194, 194, 0.99);
    }
    .search-area{
      display: flex;
      margin-left:2.5vw;
      height: 40px;
    }
    .member-area{
      width: 200px;
    }

    .search-input{
      width: 600px;
      height: 100%;
      border: none;
      border-radius: 0 50px 50px 0;
      outline: none;
      padding-left: 10px;
      display: flex;
    }

    .search-btn-area{
      /* background: #0d6efe; */
      background: #fff;
      display: block;
      width: 40px;
      height: 100%;
      border-radius: 50px 0 0 50px;
      border: none;
      outline: none;
    }

    .search-btn{
      /* color:white; */
      color : black;
      margin:12px 0 0 3px
    }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

    @media (max-width: 900px) {
      .search-input{
        width: 20vw;
      }
    }

    @media (max-width: 600px) {
      .search-input{
        display: none;
      }
      .search-btn-area{
        display: none;
      }
    }
</style>
