<template>
  <div class="join_tit">
    <h1 class="join_tit_h1">소셜로그인 추가입력</h1>
  </div>
  <div class="join_form">
    <div class="profile_form">
      <span class="profile_label">프로필</span>
      <img :src="getImgPath" class="profile_Img" alt='프로필' />
    </div>
    <div class="id_form">
      <label for="member_id">아이디</label>
      <span class="float-right">
            <input type="text" id="member_id" v-model="member_id" class="member_id" maxlength="15" autocomplete="off" ref="member_id"  :disabled="1">
        </span>
    </div>
    <div class="name_form">
      <label for="member_name">이름</label>
      <span class="float-right">
          <input type="text" id="member_name" v-model="member_name" class="member_name" autocomplete="off" ref="member_name" :disabled="1">
        </span>
    </div>
    <div class="phone_form">
      <label for="member_phone">휴대폰번호</label>
      <span class="float-right">
          <input type="tel" id="member_phone" v-model="member_phone" class="member_phone" placeholder="(-없이)"
                 autocomplete="off" maxlength="11" ref="member_phone" @blur="checkPhone"/>
          <span class="phone_check_memo" v-if="checkPhone_memo">올바른 휴대폰번호가 아닙니다.</span>

        </span>
    </div>
    <div class="address_form">
      <label for="member_address">주소</label>
      <span class="float-right">
          <input type="text" v-model="postcode" class="postcode" placeholder="우편번호">
          <input type="button" @click="execDaumPostcode()" class="execDaumPostcode" value="우편번호 찾기"><br>
          <input type="text" id="detailAddress" v-model="detailAddress" class="detailAddress" placeholder="상세주소"
                 autocomplete="off"><br>
          <input type="text" id="member_address" v-model="member_address" class="member_address" placeholder="주소"
                 autocomplete="off"><br>
          <input type="text" id="extraAddress" v-model="extraAddress" class="extraAddress" readonly>
        </span>
    </div>
    <input type="hidden" v-model="member_del_yn">
    <input type="hidden" v-model="file_idx">
    <div class="buttons">
      <button class="join_btn" @click="home">뒤로가기</button>
      <button class="join_btn" @click="join">가입</button>
    </div>
  </div>


</template>

<script>
import {joinMember, findIdNote,} from '@/api/index';
import Vue from 'vue'
import axios from 'axios'; //axios 호출

export default {
  name: "SocialJoin",
  data() {
    return {
      imgPath: this.$store.state.profile_image_url,
      member_id: this.$store.state.id,
      member_name: this.$store.state.profile_nickname,
      member_phone: '',
      postcode: "",
      member_address: "",
      detailAddress: "",
      extraAddress: "",
      member_del_yn: "",
      checkPhone_memo : false,
      file_idx: '',
    };
  },
  props: {
    transferObj: Object,

  },
  async mounted() {
    console.log("this.$store.state.id", this.$store.state.id)
    console.log("this.$store.state.profile_nickname", this.$store.state.profile_nickname)
    console.log("this.$store.state.profile_image_url", this.$store.state.profile_image_url)
    await this.kakaochk();
  },
  computed: {
    getImgPath() {
      return this.imgPath;
    }
  },
  watch: {

  },
  methods: {
    home() {
      // this.$pushContents("Board", {from: '로그인에서'})
      this.$router.push('/')

    },
    async join(event) {

      // 로그인 처리 로직 작성
      let 소셜로그인파라미터 = {
        member_id: this.$store.state.id,
        member_name: this.$store.state.profile_nickname,
        member_nickname: this.$store.state.profile_nickname,
        member_phone: this.member_phone,
        member_address: this.member_address + " " + this.detailAddress, //this.extraAddress,
        member_email: this.$store.state.id,
        member_del_yn: 'N',
        kakao_YN: 'Y',
        file_idx: this.$store.state.profile_image_url,
      };
      if (this.member_phone == '') {
        alert("전화번호를 입력해주세요.")
        this.$refs.member_phone.focus();
        return false;
      }
      if (this.member_address == '') {
        alert("주소를 입력해주세요.")
        return false;
      }
      if(this.checkPhone_memo == true) {
        alert("올바른 휴대폰번호를 입력해주세요.")
        this.$refs.member_phone.focus();
        return false;
      }
      const formData = new FormData();
      formData.append('param', JSON.stringify(소셜로그인파라미터));

      await joinMember(formData)
          .then(res => {
            if (res.data == 1) {
              this.$router.push('/')

            }
          })
          .catch(error => console.log(error.message));
    },
    checkPhone() {
      const validatePhone = /^010-?([0-9]{4})-?([0-9]{4})$/;
      this.checkPhone_memo = false
      if (!validatePhone.test(this.member_phone) || !this.member_phone) {
        this.checkPhone_memo = true
        return false
      }else {
        this.checkPhone_memo = false
      }
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.member_address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.member_address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                  this.extraAddress !== ""
                      ? `, ${data.buildingName}`
                      : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    async kakaochk() {
      let param = {
        member_id: this.$store.state.id
      }
      const getOneMemberRes = await findIdNote(param)
      if (getOneMemberRes.data === 1) {
        this.$router.push('/')
      }
    },
  }, //methods
};
</script>

<style scoped>
.tit {
  text-decoration: none;
  color: inherit;
  font-size: 30px;
  font-weight: bold;
}

.join_tit {
  margin-top: 110px;

}

.join_tit_h1 {
  display: inline;
}

.join_form {
  margin-top: 40px;
  display: inline-block;
}

.modal-content > ul {
  text-align: left;
  padding-left: 0.5rem;
}
.profile_form {
  width: 700px;
  height: 90px;
  margin: 20px auto;
}
.profile_label {
  float: left;
  padding: 42px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}
.profile_form label {
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
  transform: translate(-11rem, -1rem);
  padding: 100px 0 0 100px;
  position: absolute;
}

.member_profile {
  display: none;
}
.profile_Img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transform: translateX(-70%);
}
.id_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 90px;
  margin: 10px auto;
}

.id_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_id {
  padding-left: 20px;
  width: 400px;
  height: 40px;
  margin-right: 40px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  margin-top: 12px;
}
.name_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 70px;
  margin: 10px auto;
}

.name_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_name {
  padding-left: 20px;
  width: 400px;
  height: 40px;
  margin-right: 40px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  margin-top: 12px;
}
.nickname_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 70px;
  margin: 10px auto;
}

.nickname_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}
.phone_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 90px;
  margin: 10px auto;
}

.phone_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_phone {
  background-color: white;
  padding-left: 20px;
  width: 400px;
  height: 40px;
  margin-right: 40px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  margin-top: 12px;
}
.phone_check_memo {
  font-size: 10.5px;
  text-align: left;
  margin-top: 5px;
  margin-left: 3px;
  display: block;
  color: rgba(255, 0, 0, 1);
}
.address_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 220px;
  margin: 10px auto;
}

.address_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.postcode {
  width: 80px;
  margin-right: 12px;
  margin-bottom: 5px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  background-color: white;
  height: 40px;
  margin-top: 12px;
  float: left;
  text-align: center;

}

.execDaumPostcode {
  border-radius: 3px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  background-color: white;
  width: 150px;
  float: left;
  height: 40px;
  margin-top: 12px;
  cursor: pointer;
}

.member_address {
  margin-bottom: 5px;
  padding-left: 20px;
  margin-right: 40px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  background-color: white;
  width: 400px;
  height: 40px;
}

.detailAddress {
  margin-bottom: 5px;
  margin-right: 40px;
  padding-left: 20px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  background-color: white;
  width: 400px;
  height: 40px;
}

.extraAddress {
  margin-bottom: 5px;
  margin-right: 40px;
  padding-left: 20px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  color: rgba(66, 64, 64, 0.75);
  font-size: 15px;
  background-color: white;
  width: 400px;
  height: 40px;
}

.join_btn {
  text-align: center;
  color: white;
  width: 400px;
  height: 40px;
  border: 1px solid rgba(136, 135, 135, 0.34);
  border-radius: 3px;
  font-size: 16px;
  margin: 30px auto;
  background-color: #ad74e3;
  cursor: pointer;

}
.float-right {
  float: right;
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

select {
  border-style: none;
  border-bottom: solid 1px gray;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

li {
  list-style: none;
}

.buttons {
  display: flex;
}

.buttons button {
  width: 45%;
}
</style>