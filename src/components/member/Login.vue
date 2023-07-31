<template>
  <h1 class="tit" title="홈으로 돌아가기">로그인</h1>
  <div class="login_form">
    <!-- 💕라우터를 사용하지 않기 때문에 form submit 사용하지 않음  -->

    <div class="id_form">
      <input type="text" id="member_id" v-model="member_id" class="member_id" placeholder="아이디"
             autocomplete="off">
    </div>
    <div class="pw_form">
      <input type="password" id="member_pw" v-model="member_pw" class="member_pw" placeholder="비밀번호"  @keyup.enter="fnLogin">
    </div>
    <div class="login_form">

      <button class="login_btn" @click="fnLogin">로그인</button>
    </div>
    <div class="join"><span @click="fnJoin" class="join_btn">회원가입</span></div>

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
    // 💕메소드 첫 알파벳은 소문자로 표기
    methods: {
      fnLogin() {
        let 로그인파라미터 = {
          member_id : this.member_id,
          member_pw : this.member_pw
        }

        if(this.member_id == ''){
          alert("아이디를 입력해주세요.")
          return false;
        }
        if(this.member_pw =='') {
          alert("비밀번호를 입력해주세요.")
          return false;
        }

        axios.post("/loginMember", 로그인파라미터)
            .then((res) => {
              console.log("loginMember", res.data);
              if (res.data == 1) {
                this.$pushContents('Board');
                console.log("로그인 성공");
              }else {
                console.log("틀림ㅅㄱ");
                alert("아이디 또는 비밀번호가 틀렸습니다.\n다시 입력해주세요.")
              }
            }).catch((err) => {
          if (err.response) {
            console.log("틀림ㅅㄱ2");
          }
        })
      },
      fnJoin() {
        this.$pushContents('Agreement');
      }
    }
}
</script>

<style scoped>
.tit {
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
  color: #ad74e3;
  text-align: center;
}
.login_form {
  transform: translatey(30%);
  width: 540px;
  margin: 0 auto;
}
.member_id {
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

.member_pw {
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
  background-color: #ad74e3;
  border: 0px;
  border-radius: 3px;
  color: white;
  font-size: 17px;
  cursor: pointer;

}
.join {
  font-size: 14px;
  margin-top: 30px;
  color: #ad74e3;
}
.join_btn {
  float: right;
  cursor: pointer;
}

/*모바일 반응형*/
/*---------------------------------------------------------------------------------------------*/

@media (max-width: 580px) {

  .login_form {
    transform: translatey(30%);
    width: 100%;
    margin: 0 auto;
  }
  .id_form {
    display: block;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;

  }
  .member_id {
    width: 80%;
    height: 50px;
    padding: 0 0 0 15px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
  }
  .pw_form {
    text-align: center;
    width: 100%;

  }
  .member_pw {
    width: 80%;
    height: 50px;
    padding: 0 0 0 15px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;

  }
  .login_btn {
    margin-top: 30px;
    width: 81%;
    height: 50px;
    background-color: #ad74e3;
    border: 0px;
    border-radius: 3px;
    color: white;
    font-size: 17px;
    cursor: pointer;

  }
  .join_btn {
    float: right;
    cursor: pointer;
    margin-right: 10%;
  }
}

input {
  outline: none;
  border-style: none;
}
input::placeholder {
  color: rgba(44, 42, 42, 0.37);
  font-size: 13px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

}
</style>