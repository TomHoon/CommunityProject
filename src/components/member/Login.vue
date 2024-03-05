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
      <div class="google" @click="socialLogin"><span class="join_btn" title="개인회원 가입하기">구글 로그인하기</span></div>
          <!--img src="@/assets/btnG_naverLogin.png" class="naverLogin"/>-->
<!--
        <div>
        <div id="naverIdLogin"></div>
        <button type="button" @click="logout">로그아웃</button>
      </div>
-->

    </div>

</template>
<script>
import {joinMember, loginMember,} from '@/api/index'
import { saveAuthToCookie, saveUserToCookie} from '@/utils/cookies'
import axios from "axios";


export default {
  name: "Login",
  data() {
    return {
      member_id: '',
      member_pw: '',
      // naverLogin: null,
    };
  },
  components: {
  },
  props: {
    pageParams: Object,
    transferObj: Object,
  },
  mounted() {
    this.$store.getters.isLogin ? this.$pushContents('Board') : '';

    // 네이버로그인은 잠시 보류
    /*this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "SFxDgBLFfkWkbaprMhoV", //개발자센터에 등록한 ClientID
      callbackUrl: "http://localhost:8081", //개발자센터에 등록한 callback Url
      isPopup: false, //팝업을 통한 연동처리 여부
      loginButton: { color: "green", type: 3, height: 45 }, //로그인 버튼의 타입을 지정
    });

    //설정정보를 초기화하고 연동을 준비
    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log("status", status);
        console.log("this.naverLogin.user",this.naverLogin.user);

        //필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
        var email = this.naverLogin.user.getEmail();
        if (email == undefined || email == null) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          //사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함
          this.naverLogin.reprompt();
          return;
        }
        this.$store.commit('setId', email)
        saveUserToCookie(email)

        // saveAuthToCookie(res.data.token)
        console.log("email", email)
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }

    });*/
  },
  // 💕메소드 첫 알파벳은 소문자로 표기
  methods: {
    socialLogin() {
      // location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=139943607073-4qjupl7rokl09hplgr05a9nd8bb7srsj.apps.googleusercontent.com&redirect_uri=http://tomhoon.duckdns.org:18080/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email';
    },
    async fnLogin() {
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

      const res = await loginMember(로그인파라미터)
      if(res.data.result == 0 || res.data.result == -1){
        alert("아이디 또는 비밀번호가 틀렸습니다. \n다시 입력해주세요.")
        }else{
          // localStorage.setItem("isLogin", true)
          // localStorage.setItem("id", res.data.userid)

          this.$store.commit('setToken', res.data.token)
          this.$store.commit('setId', res.data.userid)
          saveAuthToCookie(res.data.token)
          saveUserToCookie(res.data.userid)
          this.$pushContents("Board", {from: '로그인에서'})
        }
    },
    fnJoin() {
      this.$pushContents('Agreement');
    },
    backPage() {
      this.$backPage();
    },


    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log('res >>> ' , res);
          const email = res.kakao_account.email;
          const profile_image_url = res.kakao_account.profile.profile_image_url
          const profile_nickname = res.kakao_account.profile.nickname

          // 로그인처리구현
          this.$store.commit('setId', email)
          this.$store.commit('setProfile_nickname', profile_nickname)
          this.$store.commit('setProfile_image_url', profile_image_url)

          // this.$store.commit('setToken', res1.data.token)
          saveUserToCookie(email)
          // saveAuthToCookie(res.data.token)
          console.log("email", email)
          this.$router.push('/SocialJoin');

        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    // 네이버 로그인을 위한 url 이동
    /*
    logout() {
      const accessToken = this.naverLogin.accessToken.accessToken;
      const url = `/oauth2.0/token?grant_type=delete&client_id=SFxDgBLFfkWkbaprMhoV&client_secret=4pgXg1Ybwn&access_token=${accessToken}&service_provider=NAVER`;
      console.log("logout");
      axios.get(url).then((res) => {
        console.log(res.data);
      });

    },*/
  }, // methods

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
.google {
  font-size: 12px;
  color: black;
  box-sizing: border-box;
  background-color:#ffffff;
  width: 183px;
  height: 45px;
  margin: 20px auto;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}
.google_btn {
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
.naverLogin {
  width: 183px;
  height: 45px;
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