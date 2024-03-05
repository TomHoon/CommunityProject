<template>
<!-- 쪽지함리스트 -->
  <ModalNoteList ref="ModalNoteList" @close="closeModal" :width="900" :height="650"  :clickToClose=true>
    <div class="note_list_area">
      <div class="note_list_area_main">
        <span class="note_list_area_title">쪽지함</span>
      </div>
      <div>
        <select class="note_select" @change="noteGubun($event)" v-model="NoteSelected" aria-label="Default select example">
          <option value="recvNote">받은쪽지함</option>
          <option value="sendNote">보낸쪽지함</option>
        </select>
      </div>
      <div>
        <button class="ModalNoteInsert" @click="ModalNoteInsert">쪽지보내기</button>
      </div>
      <!--      받은쪽지함      -->
      <div :class="{'noteRecvNone': NoteSelected === 'sendNote'}">
        <div class="note_list_chk_area">
          <span class="note_list_allNote">전체쪽지&nbsp;<strong>{{ countRecvList }}</strong> 개</span>
          <span class="note_list_newNote"
                :class="{'noteRecvNone': NoteSelected === 'sendNote'}">새쪽지&nbsp;<strong>{{ readCount }}</strong> 개 </span>
        </div>
        <div class="note_list_noteList">
          <div class="note_list_form" v-for="(item, idx) in recvList" :key="idx">
            <div>
              <hr>
              <div class="note_list_row" @click="ModalNoteDetail(item.note_idx)">
                <span class="note_list_send_id">보낸이 : <strong>{{ item.send_id }}</strong></span>
                <img src="@/assets/icons8-new-24.png" alt="new" class="NewNoteImg"
                     v-bind:class="{'newNote': item.read_yn === true,'noteRecvNone': NoteSelected === 'sendNote'}"/>
                <span class="note_list_send_date">{{ item.send_date }}</span>
                <div>
                  <span class="note_list_title">{{ item.note_title }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="currentPageArea">
            <button @click="previousRecvPage" :disabled="currentRecvPage <= 1" class="previousRecvPage">&lt;</button>
            <span class="currentPage">{{ currentRecvPage }}</span>
            <button @click="nextRecvPage" :disabled="currentRecvPage >= pageRecvCount" class="nextRecvPage">&gt;</button>
          </div>
        </div>
      </div>
      <!--      보낸쪽지함      -->
      <div :class="{'noteSendNone': NoteSelected === 'recvNote'}">
        <div class="note_list_chk_area">
          <span class="note_list_allNote">전체쪽지&nbsp;<strong>{{ countSendList }}</strong> 개</span>
          <span class="note_list_newNote"></span>
        </div>
        <div class="note_list_noteList">
          <div class="note_list_form" v-for="(item, idx) in sendList" :key="idx">
            <div>
              <hr>
              <div class="note_list_row" @click="ModalNoteDetail(item.note_idx)">
                <span class="note_list_send_id">보낸이 : <strong>{{ item.send_id }}</strong></span>
                <span class="note_list_send_date">{{ item.send_date }}</span>
                <div>
                  <span class="note_list_title">{{ item.note_title }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="currentPageArea">
            <button @click="previousSendPage" :disabled="currentSendPage <= 1" class="previousSendPage">&lt;</button>
            <span class="currentPage">{{ currentSendPage }}</span>
            <button @click="nextSendPage" :disabled="currentSendPage >= pageSendCount" class="nextSendPage">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  </ModalNoteList>

  <!-- 쪽지쓰기 -->
  <ModalNoteInsert ref="ModalNoteInsert" :width="800" :height="550" :clickToClose=true>
    <div class="note_insert_area">
      <span class="note_insert_area_title">쪽지보내기</span>
    </div>
    <div>
      <ul class="note_insert_area_ul">
        <li class="note_insert_area_li"> - &nbsp; 받는 아이디를 정확히 입력해주세요.</li>
        <li class="note_insert_area_li"> - &nbsp; 보낸 후 취소는 불가합니다.</li>
      </ul>
    </div>
    <div class="note_insert_area_input">
      <div class="note_insert_title_area">
        <input type="text" placeholder="제목을 입력하세요." v-model="noteInsert.note_title" name="note_title" id="note_title"
               class="note_title" autocomplete="off">
      </div>
      <div class="send_id_area">
        <input type="text" placeholder="받는아이디" v-model="noteInsert.recv_id" name="recv_id" id="recv_id" class="recv_id"
               maxlength="30" :disabled="findId == 'Y'" autocomplete="off">
        <button @click="sendIdCheck()" class="sendIdCheck">아이디 확인</button>
      </div>
      <div class="send_id_list_area">
        <select class="send_select" aria-label="Default select example" @change="sendListchange($event)" v-model="send_select">
          <option selected :value="null" :class="{'noteRecvNone': send_select != null}" >보낸아이디 목록</option>
          <option v-for="(item, idx) in sendIdListChk" :value="item.recv_id" :key="idx">{{item.recv_id}}</option>
        </select>

        <div class="send_chk_area">
          <input type="checkbox" class="send_check" id="send_chk" v-model="send_chk" @change="sendMyChk()">
          <label for="send_chk">나에게 보내기</label>
        </div>
      </div>
      <div class="note_content_area">
        <textarea placeholder="내용을 입력하세요." v-model="noteInsert.note_content" name="note_content" id="note_content"
                  class="note_content"></textarea>
      </div>
      <div>
        <button class="note_btn" @click="note_btn">보내기</button>
      </div>
    </div>
  </ModalNoteInsert>
  <ModalNoteDetail ref="ModalNoteDetail" :width="550" :height="750" :clickToClose=true>
    <div class="note_detail_area">
      <div>
        <div direction=right class="note_detail_area_title">[쪽지]{{ noteDetail.note_title }}</div>
        <div class="note_detail_deep_hr"></div>
      </div>
      <div class="note_detail_area_titlePart">
        <span class="note_detail_send_id">보낸이 : <strong>{{ noteDetail.send_id }}</strong></span>
        <span class="note_detail_send_date">보낸시간 : <span>{{ noteDetail.send_date }}</span></span>
      </div>
      <div>
        <div class="note_detail_light_hr"/>
        <span class="note_detail_note_title">제목 : {{ noteDetail.note_title }}</span>
        <span class="note_detail_note_content">{{ noteDetail.note_content }}</span>
        <div class="note_detail_light_hr02"/>
        <span class="note_detail_recv_id">받는이 : <span>{{noteDetail.recv_id}}</span></span>
        <span class="note_detail_read_date">확인 : <span>{{noteDetail.read_date}}</span></span>
      </div>
      <div class="note_detail_button">
        <button class="note_detail_back" @click="closeModal()">쪽지함</button>
        <button class="note_detail_delete" v-show="recvShow" @click="deleteRecv()">삭제</button>
        <button class="note_detail_delete" v-show="!recvShow" @click="deleteSend()">삭제</button>
      </div>
    </div>
  </ModalNoteDetail>

  <!--Custom alert-->
  <CustomAlert ref="alert" />
</template>

<script>
import ModalNoteInsert from '@/components/note/ModalNoteInsert.vue';
import ModalNoteList from '@/components/note/ModalNoteList.vue';
import ModalNoteDetail from '@/components/note/ModalNoteDetail.vue';
import dayjs from 'dayjs';
import CustomAlert from '@/components/note/CustomAlert.vue';

export default {
    components: {
        ModalNoteInsert,
        ModalNoteList,
        ModalNoteDetail,
        dayjs,
        CustomAlert,
    },
    mounted() {
        this.getNoteById(); // 쪽지리스트
        this.countReadYN(); // 받은쪽지갯수
        this.countSend(); // 받은쪽지 총갯수
        this.countRecv(); // 보낸쪽지 총갯수
        this.sendListChk(); // 보낸쪽지 아이디리스트
        this.$refs.ModalNoteList.modalOpen();
        this.currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    methods: {
        // 쪽지리스트 모달열기
        // ModalNoteList() {
        //   if (!this.$store.getters.isLogin) {
        //     this.openAlert(this.message= '로그인 후 이용 가능합니다.')

        //     return;
        //   }
        //   this.$refs.ModalNoteList.modalOpen();
        // },
        // 쪽지쓰기 모달열기
        ModalNoteInsert() {
        this.$refs.ModalNoteInsert.modalOpen();
        },
        // 쪽지 상세클릭(데이터변경)
        async updateReadDate(payload) {
        let param = {
            note_idx: payload,
            read_date: this.currentDate,
        }
        // const res = await axios.post('/updateReadDate', param)
        // this.noteDetail = res.data;
        //------------------------------------------------------------------------처리중
        },
        // 쪽지상세확인 모달열기
        async ModalNoteDetail(payload) {
        this.$refs.ModalNoteDetail.modalOpen();
        let param = {
            note_idx: payload,
        }
        await this.updateReadDate(payload); // 쪽지 상세클릭(데이터변경) 함수
        await this.countReadYN(); // 새쪽지 카운터 함수
        await this.countRecv(); // 새쪽지 카운터 함수
        // const res = await axios.post('/findOneNote', param)
        // this.noteDetail = res.data;
        },
        // 쪽지보내기 - 아이디 확인
        async sendIdCheck() {
        if (this.noteInsert.recv_id == '') {
            this.openAlert(this.message= '아이디를 입력해주세요.')
            return false;
        }
        let param = {
            member_id: this.noteInsert.recv_id,
        }
        // const res = await axios.post('/findIdNote', param);
        // if (res.data == '1') {
        //   this.findId = 'Y';
        //   this.openAlert(this.message= '확인되었습니다.')

        // } else {
        //   this.openAlert(this.message= '잘못된 아이디 입니다.')
        // }
        },
        // 쪽지보내기 - 보내기버튼
        async note_btn() {
        if (this.findId == 'N') {
            this.openAlert(this.message= '아이디 확인 바랍니다.')
            return false;
        }
        if (this.noteInsert.note_title == '') {
            this.openAlert(this.message= '제목을 입력해주세요.')
            return false;
        }
        if (this.noteInsert.note_content == '') {
            this.openAlert(this.message= '내용을 입력해주세요.')
            return false;
        }
        this.send_id = this.$store.state.id;
        let noteParam = {
            send_id: this.send_id,
            note_title: this.noteInsert.note_title,
            recv_id: this.noteInsert.recv_id,
            note_content: this.noteInsert.note_content,
            read_yn: false,
            send_date: this.currentDate,
        };
        // const res = await axios.post('/insertNote', noteParam);
        // this.noteList = res.data;
        location.reload();
        },
        // 쪽지리스트 불러오기
        async getNoteById() {
        this.recv_id = this.$store.state.id;
        let recvParam = {
            recv_id: this.recv_id,
        }
        // const res = await axios.post('/recvList', recvParam);
        // this.recvList = res.data.reverse();
        },
        async noteGubun($event) {
        if ($event.target.value == 'recvNote') { // 받은편지함 불러오기
            let recvParam = {
            recv_id: this.$store.state.id
            }
            this.recvShow = true; // 받은편지함 삭제버튼
            // const res = await axios.post('/recvList', recvParam);
            // this.recvList = res.data.reverse();
        }
        if ($event.target.value == 'sendNote') { // 보낸편지함 불러오기
            let sendParam = {
            send_id: this.$store.state.id
            }
            this.recvShow = false; // 보낸편지함 삭제버튼
            // const res = await axios.post('/sendList', sendParam);
            // this.sendList = res.data.reverse();
        }
        },
        // 쪽지상세보기 닫기
        closeModal() {
        this.$refs.ModalNoteDetail.closeModal();
        },
        // 쪽지 삭제
        async deleteRecv() { // 받은쪽지함 삭제
        if (confirm("쪽지를 삭제하시겠습니까?")) {
            await (deleteRecv(this.noteDetail.note_idx))
            this.openAlert(this.message= '쪽지가 삭제되었습니다.')
            location.reload();
        } else
            this.openAlert(this.message= '취소하였습니다.')

        },
        async deleteSend() { // 보낸쪽지함 삭제
        if (confirm("쪽지를 삭제하시겠습니까?")) {
            await (deleteSend(this.noteDetail.note_idx))
            this.openAlert(this.message= '쪽지가 삭제되었습니다.')
            location.reload();
        } else
            this.openAlert(this.message= '취소하였습니다.')
        },
        // 새쪽지 갯수
        async countReadYN() {
        let countParam = {
            recv_id: this.$store.state.id
        }
        // const res = await axios.post('/countReadYN', countParam);
        // this.readCount = res.data;
        },
        // 받은쪽지 총 갯수
        async countRecv() {
        let countParam = {
            recv_id: this.$store.state.id
        }
        // const res = await axios.post('/countRecv', countParam);
        // this.countRecvList = res.data;
        },
        // 보낸쪽지 총 갯수
        async countSend() {
        let countParam = {
            send_id: this.$store.state.id
        }
        // const res = await axios.post('/countSend', countParam);
        // this.countSendList = res.data;
        },
        // 받은쪽지 페이징
        nextRecvPage() {
        if (this.currentRecvPage < this.pageRecvCount) {
            this.currentRecvPage++;
        }
        },
        previousRecvPage() {
        if (this.currentRecvPage > 1) {
            this.currentRecvPage--;
        }
        },
        // 보낸쪽지 페이징
        nextSendPage() {
        if (this.currentSendPage < this.pageSendCount) {
            this.currentSendPage++;
        }
        },
        previousSendPage() {
        if (this.currentSendPage > 1) {
            this.currentSendPage--;
        }
        },
        openAlert() {
        this.$refs.alert.showAlert(this.message);
        },
        async sendListChk() {
        let sendListParam = {
            send_id: this.$store.state.id
        }
        // const res = await axios.post('/sendListChk', sendListParam);
        // this.sendIdListChk = res.data;
        },
        async sendListchange($event) {
        if ($event.target.value) { // 보낸쪽지 아이디리스트
            this.noteInsert.recv_id = $event.target.value;
        }
        if(this.send_chk === true) {
            this.send_chk = false;
        }
        },
        async sendMyChk() {
            if(this.send_chk === true){
                this.noteInsert.recv_id = this.$store.state.id;
                this.send_select = null;

            }else if (this.send_chk === false){
                this.noteInsert.recv_id = "";
                this.send_select = null;
            }
        },
        closeModal() {
            this.$store.state.showNote = false;
        }
    }
}
</script>
<style scoped>
 .message_image {
    float: left;
    margin-left: 20px;
    width: 40px;
    height: 40px;
    z-index: 1;
  }
  .message_white_btn {
    width: 50px;
    height: 55px;
    transform: translate(-3px, -5px);
    cursor: pointer;
    transition: all 0.2s linear;
    overflow: hidden;
  }
  .message_white_btn:hover {
    transform: scale(1.1) translate(-3px,-3px);
  }
  .countRecvChk {
    box-sizing: border-box;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 100%;
    background-color: #cb0303;
    z-index: 2;
    transform: translate(2rem, -4rem);
    display: block;
    color: white;
    font-size: 0.9rem;
  }
  .note_insert_area_title {
    color: #0d6efd;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .note_insert_area_ul {
    margin-top: 10px;
  }
  .note_insert_area_li {
    text-align: left;
    list-style: none;
    font-size: 0.8rem;
    line-height: 1.4rem;
  }
  .note_insert_area_input {
    width: 700px;
    margin: 0 auto;
  }
  .note_insert_title_area {
    margin-bottom: 10px;
  }
  .note_title {
    width: 650px;
    height: 40px;
    outline: none;
    padding: 0 10px;
    border: #c2c2c2 1px solid;
  }
  .send_id_area {
    margin-bottom: 10px;
  }
  .recv_id {
    width: 500px;
    margin-right: 60px;
    height: 40px;
    outline: none;
    padding: 0 10px;
    border: #c2c2c2 1px solid;
  }
  .sendIdCheck {
    background-color: #0d6efd;
    border: none;
    color: rgb(237, 237, 237);
    width: 90px;
    height: 42px;
    border-radius: 4px;
    font-size: 14px;
  }
  .send_id_list_area {
    width: 53%;
    margin-bottom: 10px;
  }
  .send_select {
    width: 200px;
    height: 40px;
    outline: none;
    padding: 0 10px;
    border: #c2c2c2 1px solid;
  }
  .send_chk_area {
    margin-top: 7px;
    float: right;
  }
  .send_check {
    margin-right: 10px;
  }
  .note_content {
    width: 650px;
    height: 160px;
    resize: none;
    outline: none;
    padding: 10px;
    border: #c2c2c2 1px solid;
  }
  .note_btn {
    width: 652px;
    height: 40px;
    background-color: #0d6efd;
    color: rgb(237, 237, 237);
    border-radius: 4px;
    border: none;
    margin-top: 20px;
  }
  .note_list_area {
    width: 730px;
    margin: 0 auto;
  }
  /* // 쪽지리스트 */
  .note_list_area_main {
    margin-bottom: 10px;


  }
  .note_list_area_title {
    color: #0d6efd;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .note_select {
    width: 700px;
    height: 40px;
    padding-left: 10px;
    outline: none;
  }
  .ModalNoteInsert {
    width: 700px;
    height: 40px;
    background-color: #0d6efd;
    color: rgb(237, 237, 237);
    border-radius: 4px;
    border: none;
    margin-top: 15px;
    font-weight: 600;
    letter-spacing: 1px;

  }
  .note_list_chk_area{
    margin-top: 15px;
  }
  .note_list_newNote {
    float: right;
    margin-right: 15px;
  }
  .noteRecvNone {
    display: none;
  }
  .noteSendNone {
    display: none;
  }
  .note_list_allNote {
    float: right;
    margin-bottom: 5px;
  }
  .note_list_noteList {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    padding-right: 15px;
    overscroll-behavior: contain;
  }
  .note_list_form {
    margin-top: 10px;

  }
  .note_list_send_id {
    margin-left: 17px;
    float: left;
    font-size: 14px;
  }
  .note_list_send_id>strong {
    font-size: 16px;
  }
  .newNote {
    display: none;
  }
  .NewNoteImg {
    float: left;
    margin-left: 5px;
    margin-top: 4px;
    width: 21px;
    height: 17px;
  }
  .note_list_send_date {
    text-align: right;
    display: block;
  }
  .note_list_title {
    text-align: left;
    padding-left: 18px;
    margin-top: 8px;
    display: block;
  }
  .currentPageArea {
    margin: 15px 0 10px 0;
  }
  .currentPage {
    margin: 0 10px;
  }
  .previousRecvPage {
    box-sizing: border-box;
    border-radius: 99%;
    border: none;
    background-color: #0d6efd;
    color : white;
    width: 27px;
    height: 27px;
  }
  .nextRecvPage {
    box-sizing: border-box;
    border-radius: 99%;
    border: none;
    background-color: #0d6efd;
    color : white;
    width: 27px;
    height: 27px;
  }
  .previousSendPage {
    box-sizing: border-box;
    border-radius: 99%;
    border: none;
    background-color: #0d6efd;
    color : white;
    width: 27px;
    height: 27px;
  }
  .nextSendPage {
    box-sizing: border-box;
    border-radius: 99%;
    border: none;
    background-color: #0d6efd;
    color : white;
    width: 27px;
    height: 27px;
  }
  .note_detail_area {
    width: 450px;
    margin: 0 auto;
  }
  .note_detail_area_title {
    color: #0d6efd;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .note_detail_deep_hr {
    border: rgba(197, 193, 193, 0.76) 0.8px solid;
    margin-bottom: 15px;

  }
  .note_detail_send_id {
    display: block;
    float: left;
    font-size: 14px;
  }
  .note_detail_send_id > strong {
    font-size: 16px;
  }
  .note_detail_send_date {
    display: block;
    float: right;
    font-size: 14px;
  }
  .note_detail_send_date span{
    font-size: 16px;
  }

.note_detail_light_hr {
    border: rgba(220, 217, 217, 0.2) 1px solid;
    margin-top: 50px;
  }
  .note_detail_note_title {
    float: left;
    margin: 10px 0;
    display: block;

  }
  .note_detail_note_content {
    width: 100%;
    height: 400px;
    margin-top: 40px;
    padding: 10px 15px;
    overflow-y: auto;
    display: block;
    text-align: left;

  }
  .note_detail_light_hr02 {
    border: rgba(220, 217, 217, 0.2) 1px solid;
    margin-top: 10px;
  }
  .note_detail_recv_id {
    display: block;
    font-size: 14px;
    text-align: left;
    margin-top: 10px;
  }
  .note_detail_recv_id span{
    font-size: 16px;
  }
  .note_detail_read_date {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
  }
  .note_detail_read_date span{
    font-size: 16px;
  }
  .note_detail_button {
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }
  .note_detail_delete {
    margin-left: 15px;
    background-color: #0d6efd;
    color: rgb(237, 237, 237);
    border-radius: 4px;
    border: none;
    width: 55px;
    height: 35px;
  }
  .note_detail_back {
    background-color: #0d6efd;
    color: rgb(237, 237, 237);
    border-radius: 4px;
    border: none;
    width: 75px;
    height: 35px;
  }
    
</style>