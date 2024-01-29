<template>
  <div class="title">
    <img src="@/assets/comhub.png" class="logo">
    <div class="tit" title="로그인">관리자</div>
  </div>
  <form @submit.prevent="login" class="login_form">
      <div class="id_form">
        <input type="text" id="id" v-model="id" class="id" placeholder="아이디"
              autocomplete="off">
      </div>
      <div class="pw_form">
        <input type="password" id="pw" v-model="pw" class="pw" placeholder="비밀번호">
      </div>
      <div class="login_form">
        <button class="login_btn">로그인</button>
      </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id : '',
      pw : '',
    }
  },
  computed : {
  },
  methods: {
  },

}
</script>

<style scoped>
.title {
  width: 500px;
  margin: 0 auto;
  font-size: 30px;
  text-decoration: none;
  text-align: center;
  margin-top: 100px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo{
  margin-right: 5px;
}
.tit {
  color: black;
  font-weight: bold;
  margin-left: 5px;
}
.login_form {
  transform: translatey(10%);
  width: 540px;
  margin: 0 auto;
}
.id {
  width: 530px;
  height: 50px;
  padding: 0 0 0 15px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
}

.id_form {
  display: block;
  margin-bottom: 10px;
  text-align: center;
}

.pw {
  width: 530px;
  height: 50px;
  padding: 0 0 0 15px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
}

.pw_form {
  text-align: center;
}
.login_form {
  text-align: center;
}
.login_btn {
  margin: 20px 0 0 0;
  width: 530px;
  height: 50px;
  background-color: #0d6efd;
  border: 0px;
  border-radius: 3px;
  color: white;
  font-size: 17px;
  cursor: pointer;
}
.join {
  font-size: 12px;
  color: #dfdbdb;
  box-sizing: border-box;
  background-color:#0d6efd;
  width: 183px;
  height: 45px;
  margin: 20px auto;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;

}
.join_btn {
  cursor: pointer;
  font-size: 15px;
  line-height: 45px;
}
</style>