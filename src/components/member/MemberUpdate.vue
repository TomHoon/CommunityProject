<template>
  <div class="join_tit">
    <h1 class="join_tit_h1">회원 수정</h1>
  </div>
  <div class="join_form">
    <div class="profile_form">
      <span class="profile_label">프로필</span>
      <img :src="getImgPath" class="profile_Img" alt='프로필' />
      <label for="member_profile">+</label>
      <span class="float-right">
          <input type="file" ref="fileUpload" @change="temporaryImg" id="member_profile" class="member_profile" accept="image/*">
        </span>
    </div>
    <div class="id_form">
      <label for="member_id">아이디</label>
      <span class="float-right">
            <input type="text" readonly id="member_id" v-model="memberInfo.member_id" class="member_id" placeholder="아이디를 입력해주세요."
                   maxlength="15" autocomplete="off" ref="member_id">
            <div class="id_check_memo">아이디는 영문+숫자 포함 6~12자 이하</div>
        </span>
    </div>
    <div class="pw_form">
      <label for="member_pw">비밀번호</label>
      <span class="float-right">
          <input type="password" id="member_pw" v-model="memberInfo.member_pw" class="member_pw"
                 placeholder="비밀번호를 입력해주세요."
                 maxlength="15" ref="member_pw">
          <span v-show="valid.member_pw">
            <img src="@/assets/icons8-check-48.png" class="pw_check">
          </span>
          <span class="pw_eye01">
            <i v-if="!isShowPw1" class="bi bi-eye-slash-fill pw-eye1" @click="showPw(1)"></i>
            <i v-if="isShowPw1" class="bi bi-eye-fill pw-eye1" @click="showPw(1)"></i>
          </span>
          <div class="pw_check_memo">비밀번호는 영문+숫자+특수기호 포함 8자 이상</div>
      </span>
    </div>
    <div class="pw_check_form">
      <label for="member_pw_check">비밀번호확인</label>
      <span class="float-right">
          <input type="password" id="member_pw_check" v-model="member_pw_check" class="member_pw_check"
                 placeholder="비밀번호를 입력해주세요." maxlength="15" ref="member_pw_check">
          <span v-show="valid.member_pw_check">
            <img src="@/assets/icons8-check-48.png" class="pwchk_check">
          </span>
          <span class="pw_eye02">
            <i v-if="!isShowPw2" class="bi bi-eye-slash-fill pw-eye2" @click="showPw(2)"></i>
            <i v-if="isShowPw2" class="bi bi-eye-fill pw-eye2" @click="showPw(2)"></i>
          </span>
        </span>
    </div>
    <div class="name_form">
      <label for="member_name">이름</label>
      <span class="float-right">
          <input type="text" id="member_name" readonly v-model="memberInfo.member_name" class="member_name" autocomplete="off" ref="member_name">
        </span>
    </div>
    <div class="nickname_form">
      <label for="member_nickname">닉네임</label>
      <span class="float-right">
          <input type="text" id="member_nickname" v-model="memberInfo.member_nickname" class="member_nickname" autocomplete="off"  ref="member_nickname">
        </span>
    </div>
    <div class="phone_form">
      <label for="member_phone">휴대폰번호</label>
      <span class="float-right">
          <input type="tel" id="member_phone" v-model="memberInfo.member_phone" class="member_phone" placeholder="(-없이)"
                 autocomplete="off" maxlength="11" ref="member_phone" @change="checkPhone"/>
          <span class="phone_check_memo" v-if="checkPhone_memo">올바른 휴대폰번호가 아닙니다.</span>

        </span>
    </div>
    <div class="email_form">
      <label for="member_email">이메일</label>
      <span class="float-right">
          <input type="text" id="member_email" v-model="memberInfo.member_email" class="member_email" autocomplete="off"
                 placeholder="example@email.com" ref="member_email" @blur="checkEmail">
        <!--        <span v-show=" valid.member_email">-->
          <span class="email_check_memo" v-if="checkEmail_memo">올바른 이메일 형식이 아닙니다. 예시) example@email.com</span>
        </span>
    </div>
    <div class="address_form">
      <label for="member_address">주소</label>
      <span class="float-right">
          <input type="text" v-model="postcode" class="postcode" placeholder="우편번호">
          <input type="button" @click="execDaumPostcode()" class="execDaumPostcode" value="우편번호 찾기"><br>
          <input type="text" id="detailAddress" v-model="memberInfo.detailAddress" class="detailAddress" placeholder="상세주소"
                 autocomplete="off"><br>
          <input type="text" id="member_address" v-model="memberInfo.member_address" class="member_address" placeholder="주소"
                 autocomplete="off"><br>
          <input type="text" id="extraAddress" v-model="extraAddress" class="extraAddress" readonly>
        </span>
    </div>
    <div class="member_delete">
      <span class="member_delete_btn" @click="memberDelete">회원탈퇴</span>
    </div>
    <input type="hidden" v-model="member_del_yn">
    <div class="buttons">
      <button class="join_btn" @click="backPage">뒤로가기</button>
      <button class="join_btn" @click="join">수정하기</button>
    </div>
  </div>


</template>

<script>
import axios from 'axios';


export default {
  name: "Join",
  data() {
    //true
    return {
      isShowPw1: false,
      isShowPw2: false,
      imgPath: './profile_Img.jpg',
      memberInfo: {
        member_id: '',
        member_pw: '',
        member_name: '',
        member_nickname: '',
        member_phone: '',
        member_email: '',
        member_address: "",
      },
      member_pw_check: '',
      showModal: false,
      postcode: "",
      extraAddress: "",
      valid: {
        member_pw: true,
        member_pw_check: true,
      },
      member_del_yn: "",
      checkPhone_memo : false,
      checkEmail_memo : false,
    };
  },
  async mounted() {
    await axios.post('/getOneMember', {member_id:localStorage.getItem('id')})
      .then(res => this.memberInfo = res.data);

    await axios.post('/getOneFile', {file_idx: this.memberInfo.file_idx})
      .then(res => res.data.file_path ? this.imgPath = res.data.file_path : '');

    this.member_pw_check = this.memberInfo.member_pw;
  },
  computed: {
    getImgPath() {
      return this.imgPath;
    },
    /*
    isSamePw() {
      return this.memberInfo.member_pw == this.member_pw_check;
    }
    */
  },
  watch: {
    'memberInfo.member_pw': function () {
      this.checkPw()
    },
    'member_pw_check': function () {
      this.checkPw_chk()
    },

  },
  methods: {
    showPw(flag) {
      if (flag == 1) {
        this.$refs.member_pw.type = this.$refs.member_pw.type == 'text' ? 'password' : 'text';
        this.isShowPw1 = this.$refs.member_pw.type == 'text' ? true : false;
      }
      if (flag == 2) {
        this.$refs.member_pw_check.type = this.$refs.member_pw_check.type == 'text' ? 'password' : 'text';
        this.isShowPw2 = this.$refs.member_pw_check.type == 'text' ? true : false;
      }
    },
    async temporaryImg(e) {
      const formData = new FormData();
      formData.append('mFile', e.target.files[0]);
      await axios.post('/tempImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(res => this.imgPath = res.data)
          .catch(error => console.log(error.message));
    },
    async memberDelete() {
      if(confirm('정말 회원탈퇴 하시겠습니까?')){
        await axios.post('/joinOut', {
          member_id:this.memberInfo.member_id,
          member_pw:this.memberInfo.member_pw })
          .then(res => {
            if(res.data == "삭제완료"){
              alert("회원 탈퇴 처리 되었습니다.")
              localStorage.clear();
              this.$clearLayer();
            }else{
              alert("회원 탈퇴 처리에 실패했습니다.")
            }
          })
          .catch(error => console.log(error.message))
      }else {
        return false;
      }
    },
    backPage() {
      this.$backPage();
    },
    async join() {
      // event.preventDefault();

      // 로그인 처리 로직 작성
      let 회원가입파라미터 = {
        member_id: this.memberInfo.member_id,
        member_pw: this.memberInfo.member_pw,
        member_name: this.memberInfo.member_name,
        member_nickname: this.memberInfo.member_nickname,
        member_phone: this.memberInfo.member_phone,
        member_email: this.memberInfo.member_email,
        member_address: this.memberInfo.member_address + " " + this.memberInfo.detailAddress,
        member_del_yn: 'N',
      };
      if (this.memberInfo.member_pw == '') {
        alert("비밀번호를 입력해주세요.")
        this.$refs.memberInfo.member_pw.focus();
        return false;
      }
      if (this.member_pw_check == '') {
        alert("비밀번호확인을 입력해주세요.")
        this.$refs.member_pw_check.focus();
        return false;
      }
      if (this.memberInfo.member_nickname == '') {
        alert("닉네임을 입력해주세요.")
        this.$refs.memberInfo.member_nickname.focus();
        return false;
      }
      if (this.memberInfo.member_phone == '') {
        alert("전화번호를 입력해주세요.")
        this.$refs.memberInfo.member_phone.focus();
        return false;
      }
      if (this.memberInfo.member_email == '') {
        alert("이메일을 입력해주세요.")
        this.$refs.memberInfo.member_email.focus();
        return false;
      }
      if (this.memberInfo.member_address == '') {
        alert("주소를 입력해주세요.")
        return false;
      }
      if(this.checkPhone_memo == true) {
        alert("올바른 휴대폰번호를 입력해주세요.")
        this.$refs.memberInfo.member_phone.focus();
        return false;
      }
      if(this.checkEmail_memo == true) {
        alert("올바른 이메일 형식을 입력해주세요.")
        this.$refs.memberInfo.member_email.focus();
        return false;
      }
      // axios.post("/joinMember", 회원가입파라미터)
      //     .then((res) => {
      //       console.log("joinMember", res.data);
      //       if (res.data == 1) {
      //         this.$pushContents('Login');

      //       } else {
      //         console.log("회원가입 불가");
      //         return false;
      //       }
      //     }).catch((err) => {
      //   if (err.response) {
      //     console.log("회원가입 불가2");
      //   }
      // })
      const formData = new FormData();
      formData.append('mFile', this.$refs.fileUpload.files[0]);
      let param = 회원가입파라미터;

      formData.append('param', JSON.stringify(param));
      await axios.post("/memberUpdate", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(res => {
            if (res.data == "수정완료") {
              this.$backPage();
            }
          })
          .catch(error => console.log(error.message));


    },
    /*
        openModal() {
          this.showModal = !this.showModal;
        },
        */
    checkPw() {
      const validatePw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[~#?!@$%^&*-]).{8,}$/

      if (!(validatePw.test(this.memberInfo.member_pw)) || !(this.memberInfo.member_pw)) {
        this.valid.member_pw = false;
        return false
      }else {
        this.valid.member_pw = true;
      }
    },
    checkPw_chk() {
      const validatePwChk = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[~#?!@$%^&*-]).{8,}$/

      if (!(this.memberInfo.member_pw == this.member_pw_check) || !(validatePwChk.test(this.member_pw_check)) || !(this.member_pw_check)) {
        this.valid.member_pw_check = false;
      }else{
        this.valid.member_pw_check = true;
      }
    },
    checkPhone() {
      const validatePhone = /^010-?([0-9]{4})-?([0-9]{4})$/;
      if (!validatePhone.test(this.memberInfo.member_phone) || !this.memberInfo.member_phone) {
        this.checkPhone_memo = true;
        return false
      } else {
        this.checkPhone_memo = false;
      }
    },
    checkEmail() {
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z\\-]+/
      this.checkEmail_memo = false
      if (!validateEmail.test(this.memberInfo.member_email) || !this.memberInfo.member_email) {
        this.checkEmail_memo = true
        return false;
      }else {
        this.checkEmail_memo = false
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
    }
    ,
  },
}
;
</script>

<style scoped>
.pw-eye1 {
  cursor: pointer;
}
.pw-eye2 {
  cursor: pointer;
}
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

.ask {
  padding: 14px 0 0 5px;
  position: absolute;
  width: 20px;
  height: 20px;
}

.join_form {
  margin-top: 40px;
  display: inline-block;
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

.modal-content > ul {
  text-align: left;
  padding-left: 0.5rem;
}

.modal.open {
  display: inline-block;
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
  background-color: #d3d2d2;
}

.id_check {
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translate(-2rem, 1.5rem);
}

.id_check_memo {
  font-size: 10.5px;
  text-align: left;
  margin-top: 5px;
  margin-left: 3px;
}

.pw_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 90px;
  margin: 10px auto;
}

.pw_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_pw {
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

.pw_check {
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translate(-2rem, 1.5rem);
}
.pw_eye01 {
  position: absolute;
  transform: translate(-70px, 20px);
}
.pw_check_memo {
  font-size: 10.5px;
  text-align: left;
  margin-top: 5px;
  margin-left: 3px;

}

.pw_check_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 70px;
  margin: 10px auto;
}

.pw_check_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_pw_check {
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

.pwchk_check {
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translate(-2rem, 1.5rem);
}
.pw_eye02 {
  position: absolute;
  transform: translate(-70px, 20px);
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
  background-color: #d3d2d2;

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

.member_nickname {
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

.email_form {
  box-sizing: border-box;
  border: 0.4px solid rgba(173, 116, 227, 0.63);
  width: 700px;
  height: 90px;
  margin: 10px auto;
}

.email_form label {
  float: left;
  padding: 22px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #736d6d;
}

.member_email {
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
.email_check_memo {
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
  margin: 10px auto 0 auto;
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
.member_delete {
  text-align: right;
}
.member_delete_btn {
  font-size: 12px;
  color: #5d5dff;
  cursor: pointer;
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

/*모바일 반응형*/
/*---------------------------------------------------------------------------------------------*/

@media (max-width: 750px) {
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

  .float-right {
    width: 69%;
  }

  .join_form {
    margin-top: 40px;
    display: inline-block;
    width: 100%;
  }
  .profile_form {
    width: 80%;
    height: 90px;
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
    transform: translate(-6.9rem, 0.8rem);
    padding: 60px 0 0 60px;
    position: absolute;
  }
  .profile_Img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    transform: translate(-70%, 40%);
  }
  .id_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 90px;
  }

  .id_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_id {
    padding-left: 20px;
    width: 80%;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    margin: 12px 0 0 0;
  }

  .id_check {
    width: 13px;
    height: 13px;
    position: absolute;
    transform: translate(-1.3rem, 1.6rem);
  }

  .id_check_memo {
    font-size: 0.6rem;
    text-align: left;
    margin-top: 5px;
    margin-left: 10.5%;
    width: 80%;

  }

  .pw_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    height: 95px;
    margin: 10px auto;
    width: 80%;
  }

  .pw_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_pw {
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;

  }

  .pw_check {
    width: 13px;
    height: 13px;
    position: absolute;
    transform: translate(-1.3rem, 1.6rem);
  }

  .pw_check_memo {
    font-size: 0.6rem;
    text-align: left;
    margin-top: 5px;
    margin-left: 10.5%;
    width: 80%;
  }

  .pw_check_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 70px;
    margin: 10px auto;
  }

  .pw_check_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_pw_check {
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;
  }

  .pwchk_check {
    width: 13px;
    height: 13px;
    position: absolute;
    transform: translate(-1.3rem, 1.6rem);
  }

  .name_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 70px;
    margin: 10px auto;
  }

  .name_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_name {
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;
  }

  .nickname_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 70px;
    margin: 10px auto;
  }

  .nickname_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_nickname {
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;
  }

  .phone_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 70px;
    margin: 10px auto;
  }

  .phone_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_phone {
    background-color: white;
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;
  }

  .email_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 70px;
    margin: 10px auto;
  }

  .email_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .member_email {
    background-color: white;
    padding-left: 20px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 15px;
    width: 80%;
    margin: 12px 0 0 0;
  }

  .address_form {
    box-sizing: border-box;
    border: 0.4px solid rgba(173, 116, 227, 0.63);
    width: 80%;
    height: 220px;
    margin: 10px auto 0 auto;
  }

  .address_form label {
    float: left;
    padding: 22px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #736d6d;
  }

  .postcode {
    width: 34%;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 12px;
    background-color: white;
    height: 40px;
    float: left;
    text-align: center;
    margin-left: 10%;
    margin-right: 5px;

  }

  .execDaumPostcode {
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 12px;
    background-color: white;
    width: 43.5%;
    height: 40px;
    cursor: pointer;
    float: left;
  }

  .member_address {
    padding-left: 20px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 12px;
    background-color: white;
    width: 80%;
    height: 40px;
    margin: 0;
  }

  .detailAddress {
    padding-left: 20px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 12px;
    background-color: white;
    width: 80%;
    height: 40px;
    margin: 5px 0 0 0;
  }

  .extraAddress {
    padding-left: 20px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    color: rgba(66, 64, 64, 0.75);
    font-size: 12px;
    background-color: white;
    width: 80%;
    height: 40px;
    margin: 5px 0 0 0;
  }
  .member_delete {
    text-align: right;
    width: 90%;
  }
  .join_btn {
    text-align: center;
    color: white;
    width: 200px;
    height: 40px;
    border: 1px solid rgba(136, 135, 135, 0.34);
    border-radius: 3px;
    font-size: 14px;
    margin: 30px;
    background-color: #ad74e3;
    cursor: pointer;

  }

}

/*---------------------------------------------------------------------------------------------*/


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