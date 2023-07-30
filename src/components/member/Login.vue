<template>
  <h1>로그인</h1>
  <div class="login_form">
    <!-- 💕라우터를 사용하지 않기 때문에 form submit 사용하지 않음  -->
      <div class="id_form">
        <label for="member_id">아이디 : </label>
        <input type="text" id="member_id" v-model="member_id" class="member_id" required>
      </div>
      <div class="pw_form">
        <label for="member_pw">비밀번호 : </label>
        <input type="password" id="member_pw" v-model="member_pw" class="member_pw" required>
      </div>

      <button class="login_btn" @click="fnLogin">Log In</button>
      <button class="login_btn" @click="fnJoin">Join In</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      member_id: 'test',
      member_pw: '1234',
    };
  },
    // 💕메소드 첫 알파벳은 소문자로 표기
    methods: {
      fnLogin(){
        let 로그인파라미터 = {
          member_id : this.member_id,
          member_pw : this.member_pw
        }
        axios.post("/loginMember", 로그인파라미터)
            .then((res) => {
              console.log(res.data);
              console.log('1일 때 정상 로그인임');
              if (res.data == '1') this.$pushContents('Board');
            })
            .catch((err) => {
              if (err.response) {
                console.log("틀림");
                console.log("ㅅㄱ");
              }
            })
      },
      fnJoin() {
        this.$pushContents('Join');
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