<template>
  <h1>로그인</h1>
  <div class="login_form">
    <form @submit.prevent="FnLogin">
      <div class="id_form">
        <label for="member_id">아이디 : </label>
        <input type="text" id="member_id" v-model="member_id" class="member_id" required>
      </div>
      <div class="pw_form">
        <label for="member_pw">비밀번호 : </label>
        <input type="password" id="member_pw" v-model="member_pw" class="member_pw" required>
      </div>

      <button class="login_btn" type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      member_id: '',
      member_pw: '',
    };
  },
    methods: {
      FnLogin(){
        let 로그인파라미터 = {
          member_id : this.member_id,
          member_pw : this.member_pw
        }
        axios.post("/loginMember", 로그인파라미터)
            .then((res) => console.log("loginMember" , res.data))
            //.then((res) => router.push({path: '/Board'}))
            .catch((err) => {
              if (err.response) {
                console.log("틀림");
                console.log("ㅅㄱ");
              }
            })
      }
    }
}
</script>

<style scoped>
.tit {
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.login_form {
  text-align: center;
  display: inline-block;
}

.member_id {
  width: 110px;
  float: right;
  margin-left: 7px;
  padding: 0 0 0 15px;
}

.id_form {
  display: block;
  margin-bottom: 10px;
  text-align: left;
}

.member_pw {
  margin-left: 7px;
  width: 110px;
  float: right;
  padding: 0 0 0 15px;
}

.pw_form {
  text-align: left;
}

.login_btn {
  margin-top: 30px;
  width: 80px;
  height: 30px;
}


input {
  border-style: none;
  border-bottom: solid 1px gray;
}
</style>