<template>
  <div class="join_tit">
    <h1 class="join_tit_h1">회원가입</h1>
      <!-- <img src="@/assets/font/free-icon-question-mark-4502682.png" class="ask" @click="openModal"> -->
  </div>
  <div :class="['modal', { open: showModal }]">
    <div class="modal-content" >
      <ul>
        <li> - 아이디는 영문+숫자 포함 6~12자 이하</li>
        <li> - 비밀번호는 영문+숫자+특수기호 포함 8자 이상</li>
        <li> - 전화번호와 생년월일은 숫자만 입력 가능</li>
        <li> - 모든 입력칸에 내용을 입력해야 회원가입이 완료 됩니다.</li>
      </ul>
    </div>
  </div>
  <div class="join_form">
    <form @submit="join">
      <div class="id_form">
        <label for="member_id">아이디 : </label>
        <span class="float-right">
          <input type="text" id="member_id" v-model="member_id" class="member_id" placeholder="아이디를 입력해주세요." maxlength="15">
          <span v-show="valid.member_id">
            <!-- <img src="@/assets/font/icons8-check-48.png" class="id_check"> -->
          </span>
        </span>

      </div>
      <div class="pw_form">
        <label for="member_pw">비밀번호 : </label>
        <span class="float-right">
          <input type="password" id="member_pw" v-model="member_pw" class="member_pw" placeholder="비밀번호를 입력해주세요." maxlength="15">
          <span v-show="valid.member_pw">
            <!-- <img src="@/assets/font/icons8-check-48.png" class="pw_check"> -->
          </span>
        </span>
      </div>
      <div class="pw_check_form">
        <label for="member_pw_check">비밀번호확인 : </label>
        <span class="float-right">
          <input type="password" id="member_pw_check" v-model="member_pw_check" class="member_pw_check" placeholder="비밀번호를 입력해주세요." maxlength="15">
          <span v-show="valid.member_pw_check">
            <!-- <img src="@/assets/font/icons8-check-48.png" class="pwchk_check"> -->
          </span>
        </span>
      </div>
      <div class="name_form">
        <label for="member_name">이름 : </label>
        <span class="float-right">
          <input type="text" id="member_name" v-model="member_name" class="member_name">
        </span>
      </div>
      <div class="phone_form">
        <label for="member_phone">전화번호 : </label>
        <span class="float-right">
          <select v-model="member_phone01" class="member_phone01">
            <option selected value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
          <input type="number" id="member_phone" v-model="member_phone02" class="member_phone02" >
        </span>
      </div>
      <div class="email_form">
        <label for="member_email">이메일 : </label>
        <span class="float-right">
          <input type="text" id="member_email" v-model="member_email01" class="member_email01">
          <span>@</span>
          <input type="text" id="member_email" v-model="member_email02" class="member_email02">
        </span>
      </div>
      <div class="birth_form">
        <label for="member_birth">생년월일 : </label>
        <span class="float-right">
          <input type="number" id="member_birth" v-model="member_birth" class="member_birth" placeholder="19950805">
        </span>
      </div>
      <div class="address_form">
        <label for="member_birth">주소 : </label>
        <span class="float-right">
          <input type="text" v-model="postcode" class="postcode" placeholder="우편번호">
          <input type="button" @click="execDaumPostcode()" class="execDaumPostcode" value="우편번호 찾기"><br>
          <input type="text" id="address" v-model="address" class="address" placeholder="주소"><br>
          <input type="text" id="detailAddress" v-model="detailAddress" class="detailAddress" placeholder="상세주소"><br>
          <input type="text" id="extraAddress" v-model="extraAddress" class="extraAddress" readonly>
        </span>
      </div>

      <button type="submit" class="join_btn">가입</button>
    </form>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  name: "Join",
  data() {
    true
    return {
      member_id: '',
      member_pw: '',
      member_pw_check:'',
      member_name:'',
      member_phone01:'',
      member_phone02:'',
      member_email01:'',
      member_email02:'',
      member_birth:'',
      showModal: false,
      postcode: "",
      address: "",
      extraAddress: "",
      valid:{
        member_id: false,
        member_pw: false,
        member_pw_check: false
      }
    };
  },
/*  watch: {
    'member_id': function() {
      this.checkId()
    },
    'member_pw': function() {
      this.checkPw()
    },
    'member_pw_check': function() {
      this.checkPw_chk()
    },

  },*/
  methods: {
    join(event) {
      event.preventDefault();
      // 로그인 처리 로직 작성
      // this.member_name과 this.password를 사용하여 로그인 요청 등을 처리할 수 있습니다.

      let 회원가입파라미터 = {
        member_id : this.member_id,
        member_pw : this.member_pw,
        member_name : this.member_name,
      };
      axios.post("/joinMember", 회원가입파라미터)
          .then((res) => console.log("joinMember" , res.data));
    },
    openModal() {
      this.showModal = !this.showModal;
    },
    /*checkId() {
      const validateId = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/

      if (!validateId.test(this.member_id) || !this.member_id) {
        this.valid.member_id = false
        return
      }
      this.valid.member_id = true
    },
    checkPw() {
      const validatePw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[~#?!@$%^&*-]).{8,}$/

      if (!validatePw.test(this.member_pw) || !this.member_pw) {
        this.valid.member_pw = false
        return
      }
      this.valid.member_pw = true
    },
    checkPw_chk() {
      const validatePwChk = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[~#?!@$%^&*-]).{8,}$/

      if (!(this.member_pw == this.member_pw_check) || !validatePwChk.test(this.member_pw_check) || !this.member_pw_check) {
        this.valid.member_pw_check = false
        return
      }
      this.valid.member_pw_check = true
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
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
    },*/
  },
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
  margin-top: 15px;
}
.join_tit_h1 {
  display: inline;
}
.ask {
  padding: 14px 0 0 5px;
  position: absolute;
  width: 20px;
  height: 20px;
}
.join_form {
  display: inline-block;
  width: 360px;
  margin-left: 30px;
  margin-top: 40px;
}
.modal {
  display: none;
  position: absolute;
  transform: translate(18.5rem, -6.5rem);
}

.modal-content {
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 10px;
  font-size: 10px;
  width: 270px;
  height: 60px;
  padding-bottom: 9px;
}
.modal-content>ul {
  text-align: left;
  padding-left: 0.5rem;
}
.modal.open {
  display: inline-block;
}

.id_form{
  text-align: left;
  margin-bottom: 10px;
}
.member_id {
  padding-left: 20px;
  width: 162px;
  margin-right: 74px;

}
.id_check {
  width: 15px;
  height: 15px;
  position: absolute;
  transform: translate(-4.15rem, 0rem);
}
.pw_form{
  text-align: left;
  margin-bottom: 10px;
}
.member_pw {
  padding-left: 20px;
  width: 162px;
  margin-right: 74px;

}
.pw_check {
  width: 15px;
  height: 15px;
  position: absolute;
  transform: translate(-4.15rem, 0rem);
}
.pw_check_form{
  text-align: left;
  margin-bottom: 10px;
}
.member_pw_check {
  padding-left: 20px;
  width: 162px;
  margin-right: 74px;
}
.pwchk_check {
  width: 15px;
  height: 15px;
  position: absolute;
  transform: translate(-4.15rem, 0rem);
}
.name_form{
  margin-bottom: 10px;
  text-align: left;
}
.member_name {
  width: 70px;
  padding-left: 20px;
  margin-right: 166px;
}
.phone_form{
  margin-bottom: 10px;
  text-align: left;
}
.member_phone01 {
  width: 60px;
  height: 19px;
  padding-left: 7px;
  background-color: white;
}
.member_phone02 {
  width: 90px;
  padding-left: 30px;
  margin-left: 10px;
  margin-right: 66px;
}
.email_form{
  margin-bottom: 10px;
  text-align: left;
}
.member_email01 {
  width: 84px;
  padding-left: 10px;
  margin-right: 4px;
}
.member_email02 {
  width: 85px;
  padding-left: 7px;
  margin-left: 4px;
  margin-right: 45px;
}
.birth_form{
  margin-bottom: 10px;
  text-align: left;
}
.member_birth {
  padding-left: 20px;
  width: 70px;
  margin-right: 166px;
}
.address_form {
  margin-bottom: 10px;
  text-align: left;
}
.postcode {
  width: 60px;
  padding-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
}
.execDaumPostcode {
  border-radius: 3px;
  border: 1px solid;
  margin-right: 16px;
}
.address{
  margin-bottom: 5px;
  padding-left: 20px;
  margin-right: 16px;
  width: 220px;
}
.detailAddress{
  margin-bottom: 5px;
  width: 220px;
  margin-right: 16px;
  padding-left: 20px;
}
.extraAddress{
  margin-bottom: 5px;
  width: 220px;
  margin-right: 16px;
  padding-left: 20px;
}
.join_btn {
  margin-top: 30px;
  width: 80px;
  height: 30px;
  margin-right: 23px;
  text-align: center;
}
/*모바일 반응형*/
/*---------------------------------------------------------------------------------------------*/

@media (max-width:710px) {
  .modal {
    display: none;
    position: relative;
  }
  .modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
    border-radius: 10px;
    font-size: 10px;
    width: 270px;
    height: 55px;
    padding: 0 0 7px 0;
  }
  .modal.open {
    transform: translate(0rem, 0rem);
  }
  .join_tit {
    margin-bottom: 15px;
  }
  .join_form {
    margin-top: 20px;
  }
}
/*---------------------------------------------------------------------------------------------*/





.float-right {
  float: right;
}
input {
  border-style: none;
  border-bottom: solid 1px gray;
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
label {
  font-size: 13px;
}
</style>