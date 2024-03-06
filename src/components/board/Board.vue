<template>
<Header @searchBoard="searchBoard" @AllBoard="allBoard" @boardChange="boardChange"></Header>
  <div class="board-container">
    <div class="top-box">
      <button type="button" class="btn btn-primary write-btn" @click="goWrite">글쓰기</button>
      <!-- <span class="message_image note_modalOpen"  @click="ModalNoteList">
        <img src="@/assets/icons8-message_white-48.png" alt="쪽지함" class="message_white_btn" title="쪽지함">
        <span class="countRecvChk" v-if="this.$store.getters.isLogin">{{readCount}}</span>
      </span> -->
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
          <img :style="productImg(item)" :src="image_path(item)">
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
</template>
<script>
import {getBoardAll, searchBoard, updateHitBoard, deleteRecv, deleteSend, } from '@/api/index'
import comhubImg from '@/assets/comhub.png'
import ModalNoteInsert from '@/components/note/ModalNoteInsert.vue';
import ModalNoteList from '@/components/note/ModalNoteList.vue';
import ModalNoteDetail from '@/components/note/ModalNoteDetail.vue';
import dayjs from 'dayjs';
import CustomAlert from '@/components/note/CustomAlert.vue';
import axios from "axios";
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
      // sendList: [],
      // recvList: [],
      recvShow: true,
      readCount: '',
      NoteSelected: 'recvNote',
      perRecvPage: 5,
      currentRecvPage: 1,
      perSendPage: 5,
      currentSendPage: 1,
      countRecvList: '',
      countSendList: '',
      message: '',
      sendIdListChk: [],
      send_select: null,
      send_chk: false,
    }
  },
  computed: {
    // 쪽지함 페이징
    recvList() {
      const start = (this.currentRecvPage - 1) * this.perRecvPage;
      const end = start + this.perRecvPage;
      return this.recvList.slice(start, end);
    },
    pageRecvCount() {
      return Math.ceil(this.recvList.length / this.perRecvPage);
    },
    sendList() {
      const start = (this.currentSendPage - 1) * this.perSendPage;
      const end = start + this.perSendPage;
      return this.sendList.slice(start, end);
    },
    pageSendCount() {
      return Math.ceil(this.sendList.length / this.perSendPage);
    },
  },
  watch: { },
  components: {
    ModalNoteInsert,
    ModalNoteList,
    ModalNoteDetail,
    dayjs,
    CustomAlert,

  },
  mounted() {
    this.$propsWatch();
    this.getBoardAll();
    // this.getNoteById(); // 쪽지리스트
    // this.countReadYN(); // 받은쪽지갯수
    // this.countSend(); // 받은쪽지 총갯수
    // this.countRecv(); // 보낸쪽지 총갯수
    // this.sendListChk(); // 보낸쪽지 아이디리스트
    // this.currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
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
        this.openAlert(this.message= '로그인 후 이용 가능합니다..')
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
      // console.log(this.transferObj);
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
    productImg(item) {
      if (item.image_path) {
        return 'width: 100px; height: 100px; border-radius: 12px; margin: 10px;'
      }else{
        return 'width: 70px;'
      }
    },
    image_path(item) {
      if (item.image_path) {
        return item.image_path
      }
      return this.default_image_path
    },

  }, // method
}
</script>

<style scoped>
p {
  margin: 0;
}

.top-box {
  height: 50px;
}

.write-btn {
  float: left;
    margin-top: 5px;
    margin-left: 10px;
  }
  .right-btn{
    float: right;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .select-date{
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
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
    width:100%;
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
    width: 20%;
    height: 121px;
  }

  .board-table-cell2 {
    display:table-cell;
    vertical-align:middle;
    border-bottom: 1px solid #ddd;
    width: 80%;
    padding: 10px;
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
</style>