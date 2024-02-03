<template>
  <div class="title">
    <img src="@/assets/comhub.png" class="logo">
    <div class="tit" title="로그인">관리자</div>
  </div>
  <form @submit.prevent="login" class="login_form">
      <div class="id_form">
        <input type="text" id="id" v-model="id" class="id" placeholder="아이디"
              autocomplete="off" required>
      </div>
      <div class="pw_form">
        <input type="password" id="pw" v-model="pw" class="pw" placeholder="비밀번호" required>
      </div>
      <div class="login_form">
        <button type="submit" class="login_btn" :disabled="!isInputValid">로그인</button>
      </div>
  </form>
</template>

<script>
import admin from '@/js/admin'

export default {
  data() {
    return {
      id : '',
      pw : '',
    }
  },
  computed: {
    // 아이디와 비밀번호가 입력되었는지 확인하는 computed 속성
    isInputValid() {
      return this.id && this.pw;
    }
  },
  mounted() {
  },
  methods: {
    login() {
      if(this.id == admin[0].id && this.pw == admin[0].pw) {
        console.log("test001 관리자님이 로그인 하셨습니다.")
        alert("환영합니다 관리자님")
        this.$router.push('/Admin')
        // this.$router.push('/Admin 31415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679 8214808651 3282306647 0938446095 5058223172 5359408128 4811174502 8410270193 8521105559 6446229489 5493038196 4428810975 6659334461 2847564823 3786783165 2712019091 4564856692 3460348610 4543266482 1339360726 0249141273 7245870066 0631558817 4881520920 9628292540 9171536436 7892590360 0113305305 4882046652 1384146951 9415116094 3305727036 5759591953 0921861173 8193261179 3105118548 0744623799 6274956735 1885752724 8912279381 8301194912 9833673362 4406566430 8602139494 6395224737 1907021798 6094370277 0539217176 2931767523 8467481846 7669405132 0005681271 4526356082 7785771342 7577896091 7363717872 1468440901 2249534301 4654958537 1050792279 6892589235 4201995611 2129021960 8640344181 5981362977 4771309960 5187072113 4999999837 2978049951 0597317328 1609631859 5024459455 3469083026 4252230825 3344685035 2619311881 7101000313 7838752886 5875332083 8142061717 7669147303 5982534904 2875546873 1159562863 8823537875 9375195778 1857780532 1712268066 1300192787 6611195909 2164201989')
      }
    }
  }
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