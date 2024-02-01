<template>
<Header @searchBoard="searchBoard" @AllBoard="allBoard" @boardChange="boardChange"></Header>
  <div class="board-container">
    <div class="top-box">
      <button type="button" class="btn btn-primary write-btn" @click="goWrite">글쓰기</button>
      <span class="message_image note_modalOpen"  @click="ModalNoteList">
        <img src="@/assets/icons8-message_white-48.png" alt="쪽지함" class="message_white_btn" title="쪽지함">
        <span class="countRecvChk" v-if="this.$store.getters.isLogin">{{readCount}}</span>

      </span>
      <button type="button" class="btn btn-primary right-btn" @click="changeBest">베스트</button>
      <button type="button" class="btn btn-primary right-btn" @click="changeCreateTime">날짜순</button>

      <select class="select-date" @change="changeGubun">
        <option value="all">전체</option>
        <option value="notice">공지</option>
        <option value="funny">유머</option>
        <option value="game">게임</option>
        <option value="study">공부</option>
      </select>

    </div>
    <hr>
    <div class="board-table">
      <div class="board-table-row" v-for="(item, idx) in calData()" :key="idx" @click="detailChain(item)">
        <div class="board-table-cell1">
          <img class="product-img" :src="image_path(item)">
          <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
        </div>
        <div class="board-table-cell2">
          <div>
            <span>[{{item.gubun}}] </span>
            <span style="font-size:x-large; color:black;">{{item.title}}</span>
            <span style="font-size:20px; color:blue;" v-if="item.comment_count > 0"> [{{ item.comment_count }}]</span>
          </div>
          <div>
            <p>No.{{item.id}} | 추천 {{item.recommend}} | 조회 {{item.hit}} | {{item.reg_date}} </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bottom-box">
      <div class="btn-box">
        <button type="button" class="btn btn-primary write-btn" @click="goWrite">글쓰기</button>
        <button type="button" class="btn btn-primary right-btn" @click="changeBest">베스트</button>
        <button type="button" class="btn btn-primary right-btn" @click="changeCreateTime">날짜순</button>
        <select class="select-date" @change="changeGubun">
          <option value="all">전체</option>
          <option value="notice">공지</option>
          <option value="funny">유머</option>
          <option value="game">게임</option>
          <option value="study">공부</option>
        </select>
      </div>
      <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>
      <div class="search-box">
        <select class="search-select">
          <option>제목</option>
          <!-- <option>내용</option> -->
        </select>
        <input @keyup.enter="searchBoard(searchData)" v-model="searchData">
      </div>
    </div>
  </div>

<!-- 쪽지함리스트 -->
  <ModalNoteList ref="ModalNoteList" :width="900" :height="650"  :clickToClose=true>
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
      <div class="note_list_chk_area">
        <span class="note_list_allNote">전체쪽지&nbsp;<strong>{{ noteList.length }}</strong> 개</span>
        <span class="note_list_newNote" :class="{'noteNone': NoteSelected === 'sendNote'}">새쪽지&nbsp;<strong>{{readCount}}</strong> 개 </span>
      </div>
      <div class="note_list_noteList">
        <div class="note_list_form" v-for="(item, idx) in noteList" :key="idx">
          <div>
            <hr>
            <div class="note_list_row" @click="ModalNoteDetail(item.note_idx)">
              <strong class="note_list_send_id">{{ item.send_id }}</strong>
              <span class="note_list_send_date">{{ item.send_date }}</span>
              <div>
                <span class="note_list_title">{{ item.note_title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalNoteList>

  <!-- 쪽지쓰기 -->
  <ModalNoteInsert ref="ModalNoteInsert" :width="800" :height="500" :clickToClose=true>
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
               maxlength="13" :disabled="findId == 'Y'" autocomplete="off">
        <button @click="sendIdCheck()" class="sendIdCheck">아이디 확인</button>
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
        <strong class="note_detail_send_id">{{ noteDetail.send_id }}</strong>
        <span class="note_detail_send_date">{{ noteDetail.send_date }}</span>
      </div>
      <div>
        <div class="note_detail_light_hr"/>
        <span class="note_detail_note_title">{{ noteDetail.note_title }}</span>
        <span class="note_detail_note_content">{{ noteDetail.note_content }}</span>
        <div class="note_detail_light_hr02"/>
        <span class="note_detail_read_date">확인날짜 : {{noteDetail.read_date}}</span>
      </div>
      <div class="note_detail_button">
        <button class="note_detail_back" @click="closeModal()">쪽지함</button>
        <button class="note_detail_delete" v-show="recvShow" @click="deleteRecv()">삭제</button>
        <button class="note_detail_delete" v-show="!recvShow" @click="deleteSend()">삭제</button>
      </div>

    </div>
    </ModalNoteDetail>

</template>
<script>
import {getBoardAll, searchBoard, updateHitBoard, deleteRecv, deleteSend, countReadYN } from '@/api/index'
import comhubImg from '@/assets/comhub.png'
import ModalNoteInsert from '@/components/note/ModalNoteInsert.vue';
import ModalNoteList from '@/components/note/ModalNoteList.vue';
import ModalNoteDetail from '@/components/note/ModalNoteDetail.vue';
import axios from "axios";
import dayjs from 'dayjs'
  export default {
    props: ['pageParams', 'transferObj'],
    data() {
      return {
        dataPerPage: 10, //한 페이지에서 볼 수 있는 게시물 개수
        curPageNum: 1, //현재 페이지
        boardList: [],
        noticeList: [],
        funnyList: [],
        gameList: [],
        studyList: [],
        tempList: [],
        bestList: [],
        bestToggle: false,
        searchData: '',
        default_image_path: comhubImg,
        noteInsert: {
          recv_id: '',
          note_title: '',
          note_content: '',
        },
        noteList: [],
        noteDetail: [],
        findId: 'N',
        sendList: [],
        recvList: [],
        recvShow: true,
        readCount: '',
        NoteSelected: 'recvNote',
        // newNote : this.readCount,
      }
    },
    computed: {
    },
    watch: {
    },
    components: {
      ModalNoteInsert,
      ModalNoteList,
      ModalNoteDetail,
      dayjs,
    },
    async mounted() {
      this.$propsWatch();
      this.getBoardAll();
      this.getNoteById(); // 쪽지리스트
      this.countReadYN(); // 받은쪽지갯수
      this.currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      console.log("this.readCount" , this.readCount.data)
    },
    methods: {
      // isLogin() {
      // console.log("로그인?",this.$store.getters.isLogin)
      // console.log("id값?",this.$store.state.id)
      // },
      async getBoardAll() {
        const res = await getBoardAll(0)

        this.boardList = res.data;
        this.tempList = res.data;

        this.boardSort()

        if (this.transferObj?.boardChange) {
          this.boardChange(this.transferObj.boardChange)
        }
        if (this.transferObj?.searchWord) {
          const res = await searchBoard(this.transferObj.searchWord)
          this.boardList = res.data.reverse()
        }
      },
      boardSort() {
        const gubunType = ['공지', '유머', '게임', '공부']
        const lists = {'공지': this.noticeList, '유머': this.funnyList, '게임': this.gameList, '공부': this.studyList,}

        this.boardList.forEach(board => {
          if (gubunType.includes(board.gubun)) {
            lists[board.gubun].push(board);
          }
          if (board.recommend >= 10) {
            this.bestList.push(board)
          }
        })
      },
      async searchBoard(emitData) {
        const res = await searchBoard(emitData)
        this.boardList = res.data.reverse()
      },
      detailChain(item) {
        this.goDetails(item);
        this.upHit(item.id);
      },
      backPage() {
        this.$backPage({test: 'hello'});
      },
      goWrite() {
        if (!this.$store.getters.isLogin) {
          alert("로그인 이후 이용 가능합니다.");
          return;
        }
        this.$pushContents('BoardWrite');
      },
      goDetails(item) {
        this.$pushContents('BoardDetails', {boardData: item});
      },
      async upHit(payload) {
        let param = {
          id: payload
        }
        await updateHitBoard(param)
      },

      startPage() {
        return ((this.curPageNum - 1) * this.dataPerPage);
      },
      endPage() {
        return ("end", this.startPage() + this.dataPerPage);
      },
      numOfPages() {
        return Math.ceil(this.boardList.length / this.dataPerPage); // 페이지 갯수
      },
      calData() {
        return this.boardList.slice(this.startPage(), this.endPage()) // dataPerPage로 나눠서 페이지당 볼 수 있는 게시글 제한
      },
      propsChanged() {
        console.log(this.transferObj);
      },
      changeCreateTime() {
        this.boardList.reverse()
      },
      changeGubun(event) { // 게시판 변경을 위한 메소드
        if (event.target.value === 'all') {
          this.boardList = this.tempList
        }
        if (event.target.value === 'notice') {
          this.boardList = this.noticeList
        }
        if (event.target.value === 'funny') {
          this.boardList = this.funnyList
        }
        if (event.target.value === 'game') {
          this.boardList = this.gameList
        }
        if (event.target.value === 'study') {
          this.boardList = this.studyList
        }
      },
      changeBest() {
        if (this.bestToggle == false) {
          this.boardList = this.bestList
          this.bestToggle = true
        } else {
          this.boardList = this.tempList
          this.bestToggle = false
        }
      },
      allBoard() {
        this.boardList = this.tempList
      },
      boardChange(event) { // 햄버거 버튼을 위한 메소드
        if (event == 'all') {
          this.boardList = this.tempList
        }
        if (event == 'notice') {
          this.boardList = this.noticeList
        }
        if (event == 'funny') {
          this.boardList = this.funnyList
        }
        if (event == 'game') {
          this.boardList = this.gameList
        }
        if (event == 'study') {
          this.boardList = this.studyList
        }
      },
      image_path(item) {
        if (item.image_path) {
          return item.image_path
        }
        return this.default_image_path
      },
      // 쪽지리스트 모달열기
      ModalNoteList() {
        if (!this.$store.getters.isLogin) {
          alert("로그인 이후 이용 가능합니다.");
          return;
        }
        this.$refs.ModalNoteList.modalOpen();
      },
      // 쪽지쓰기 모달열기
      ModalNoteInsert() {
        this.$refs.ModalNoteInsert.modalOpen();
      },
      // 쪽지 상세클릭(데이터변경)
      async updateReadDate(payload) {
        let param = {
          note_idx: payload,
          read_date: this.currentDate,
          read_last_date: this.currentDate
        }
        //------------------------------------------------------------------------처리중
        const res = await axios.post('/updateReadDate', param)
        this.noteDetail = res.data;
      },
      // 쪽지상세확인 모달열기
      async ModalNoteDetail(payload) {
        this.$refs.ModalNoteDetail.modalOpen();
        let param = {
          note_idx: payload,
        }
        await this.updateReadDate(payload); // 쪽지 상세클릭(데이터변경) 함수

        await this.countReadYN(); // 새쪽지 카운터 함수
        const res = await axios.post('/findOneNote', param)
        // if(res.data.read_yn == 1) {
        //   res.data.read_date = '';
        // }
        this.noteDetail = res.data;

      },
      // 쪽지보내기 - 아이디 확인
      async sendIdCheck() {
        if(this.noteInsert.recv_id == ''){
          alert("아이디를 입력해주세요.")
          return false;
        }
        let param = {
          member_id: this.noteInsert.recv_id,
        }
        const res = await axios.post('/findIdNote', param);
        if (res.data == '1') {
          this.findId = 'Y';
          alert("확인되었습니다.")
        } else {
          alert("잘못된 아이디 입니다.")
        }
      },
      // 쪽지보내기 - 보내기버튼
      async note_btn() {
        if (this.findId == 'N') {
          alert("아이디 확인 바랍니다.")
          return false;
        }
        if (this.noteInsert.note_title == '') {
          alert("제목을 입력해주세요.")
          return false;
        }
        if (this.noteInsert.note_content == '') {
          alert("내용을 입력해주세요.")
          return false;
        }
        this.send_id = this.$store.state.id;
        let noteParam = {
          send_id: this.send_id,
          note_title: this.noteInsert.note_title,
          recv_id: this.noteInsert.recv_id,
          note_content: this.noteInsert.note_content,
          send_date: this.currentDate,
          read_yn: false,
        };
        const res = await axios.post('/insertNote', noteParam);
        this.noteList = res.data;
        location.reload();
      },
      // 쪽지리스트 불러오기
      async getNoteById() {
        this.recv_id = this.$store.state.id;
        let recvParam = {
          recv_id: this.recv_id,
        }
        const res = await axios.post('/recvList', recvParam);
        this.noteList = res.data;
      },
      async noteGubun($event) {
        if ($event.target.value == 'recvNote') { // 받은편지함 불러오기
          let recvParam = {
            recv_id: this.$store.state.id
          }
          this.recvShow = true; // 받은편지함 삭제버튼
          const res = await axios.post('/recvList', recvParam);
          this.noteList = res.data;
        }
        if ($event.target.value == 'sendNote') { // 보낸편지함 불러오기
          let sendParam = {
            send_id: this.$store.state.id
          }
          this.recvShow = false; // 보낸편지함 삭제버튼
          const res = await axios.post('/sendList', sendParam);
          this.noteList = res.data;
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
          alert("쪽지가 삭제되었습니다.");
          location.reload();
        } else
          alert("취소하였습니다.")

      },
      async deleteSend() { // 보낸쪽지함 삭제
        if (confirm("쪽지를 삭제하시겠습니까?")) {
          await (deleteSend(this.noteDetail.note_idx))
          alert("쪽지가 삭제되었습니다.");
          location.reload();
        } else
          alert("취소하였습니다.")
      },
      // 새쪽지 갯수
      async countReadYN() {
        let countParam = {
          recv_id: this.$store.state.id
        }
        this.recvShow = false; // 보낸편지함 삭제버튼
        const res = await axios.post('/countReadYN', countParam);
        console.log("res.data111", res.data);
        this.readCount = res.data;
      }
    }
  }
</script>

<style>
  .top-box{
    height: 50px;
    }
  .write-btn {
    float: left;
    margin-top: 5px;
  }
  .right-btn{
    float: right;
    margin-top: 5px;
    margin-left: 10px;
  }
  .select-date{
    margin-top: 5px;
    margin-left: 10px;
    height: 40px;
    float: right;
  }
  .writing-title {
    cursor: pointer;
  }
    .board-container {
    max-width: 1100px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin: 20px auto;
    text-align: center;
  }
  .board-table {
    text-align:center;
    display:table;
    /*border:1px solid #cecece;*/
    width:100%;
    /* height:250px; */
  }

  .board-table-row {
    display: table-row;
    cursor: pointer;
    /*border-bottom: dashed silver;*/
  }

  .board-table-cell1 {
    display:table-cell;
    vertical-align:middle;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    width: 30%
  }

  .board-table-cell2 {
    display:table-cell;
    vertical-align:middle;
    border-bottom: 1px solid #ddd;
    width: 70%;
    padding: 10px;
  }

  .product-img {
    max-width:100px;
    max-height:100px;
    /* max-width:180px; */
    /* max-height:180px; */
  }
  .bottom-box {
    height: 130px;
  }
  .btn-box {
    height: 50px;
    margin-top:10px;
  }
  .page-num {
    cursor:pointer;
  }
  .search-box{
    padding: 10px;
  }
  .search-select{
    /* height: 29.5px; */
    margin-top:-1px;
    height: 30px;
  }
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
  .noteNone {
    display: none;
  }
  .note_list_allNote {
    float: right;
  }
  .note_list_noteList {
    margin-top: 45px;
    height: 400px;
    overflow-y: auto;
    padding-right: 15px;
  }
  .note_list_form {
    margin-top: 10px;

  }
  .note_list_send_id {
    margin-left: 17px;
    float: left;
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

  }
  .note_detail_send_date {
    display: block;
    float: right;

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
  .note_detail_read_date {
    text-align: right;
    width: 100%;
    margin-top: 10px;
    display: block;

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