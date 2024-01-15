<template>
  <div class="title">
    <img src="@/assets/icons8-50.png" class="backPage" @click="backPage" title="뒤로가기">
    <h1 class="tit" title="로그인">로그인</h1>
  </div>
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
      <div>
        <img src="@/assets/kakao_login_medium_narrow.png" title="카카오로 가입하기" class="kakaoLogin" @click="kakaoLogin()">
      </div>
      <div class="join" @click="fnJoin"><span class="join_btn" title="개인회원 가입하기">개인회원 가입하기</span></div>
      <button title="카카오 로그아웃" class="kakaoLogout" @click="kakaoLogout()">카카오 로그아웃</button>


    </div>

</template>
<script>
import { loginMember, } from '@/api/index'

export default {
  name: "Login",
  data() {
    return {
      member_id: '',
      member_pw: '',
    };
  },
  props: {
    pageParams: Object,
    transferObj: Object,
  },
  mounted() {
    localStorage.getItem("isLogin") ? this.$pushContents('Board') : '';
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

      loginMember(로그인파라미터)
          .then((res) => {
            if(res.data.result == 0 || res.data.result == -1){
              alert("아이디 또는 비밀번호가 틀렸습니다. \n다시 입력해주세요.")
            }else{
              localStorage.setItem("isLogin", true)
              localStorage.setItem("id", res.data.user_id)
              localStorage.setItem("id", this.member_id)
              localStorage.setItem("token", res.data.token)
              this.$pushContents("Board", {from: '로그인에서'})
            }
          }).catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
    },
    fnJoin() {
      this.$pushContents('Agreement');
    },
    backPage() {
      this.$backPage();
    },


    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log('res >>> ' , res);
          const kakao_account = res.kakao_account;
          const profile_nickname = kakao_account.profile.nickname;
          const profile_image = kakao_account.profile.profile_image_url;
          console.log("profile_nickname", profile_nickname);
          console.log("profile_image", profile_image);

          //로그인처리구현

          alert("로그인 성공!");
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    kakaoLogout() {
      window.Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
}
}
</script>

<style scoped>
.title {
  width: 530px;
  margin: 0 auto;
  padding-right: 50px;
}
.tit {
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
  color: #ad74e3;
  text-align: center;
  margin-top: 110px;
}
.login_form {
  transform: translatey(10%);
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
.kakaoLogin {
  margin-top: 50px;
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
.backPage {
  cursor: pointer;
  font-size: 14px;
  float: left;
  display: inline;

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