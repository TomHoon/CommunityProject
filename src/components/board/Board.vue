<template>
<Header @searchBoard="searchBoard" @AllBoard="allBoard" @boardChange="boardChange"></Header>
  <div class="board-container">
    <div class="top-box">
      <button type="button" class="btn btn-primary write-btn" @click="goWrite">글쓰기</button>
      <span class="message_image note_modalOpen" @mouseover="hovering = true" @mouseout="hovering = false"  @click="modal_note_list">
        <img src="@/assets/icons8-message_white-48.png" v-show="!hovering" alt="쪽지함" class="message_white_btn" title="쪽지함">
        <img src="@/assets/icons8-message_black-64.png" v-show="hovering" alt="쪽지함" class="message_black_btn" title="쪽지함">
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
  <Modal_note_list ref="modal_note_list" :width="900" :height="600"  :clickToClose=true>
    <div class="note_list_area">
      <div>
        <span class="note_insert_area_title">쪽지함</span>
      </div>
      <div>
        <select class="note_select" v-model="list.gubun" aria-label="Default select example">
          <option value="받은쪽지함">받은쪽지함</option>
          <option value="보낸쪽지함">보낸쪽지함</option>
        </select>
      </div>
      <div>
        <button class="modal_note_insert" @click="modal_note_insert">쪽지보내기</button>
      </div>
      <div class="note_list_chk_area">
        <div class="note_list_check">
          <input type="checkbox" id="note_list_allCheck" class="note_list_allCheck" name="note_list_allCheck">
          <label for="note_list_allCheck">전체선택</label>
        </div>
        <span class="note_list_allNote">전체쪽지&nbsp; 개</span>
        <span class="note_list_newNote">새쪽지&nbsp; 개 </span>
      </div>
      <div>
        <table>
          <tbody>
            <tr v-for="(item, idx) in noteList" :key="idx" >
              <td>
                <strong>{{item.send_id}}</strong>
              </td>
            <td>
                <strong>{{item.recv_id}}</strong>
              </td>
              <td>
                <strong>{{item.note_title}}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Modal_note_list>

<!-- 쪽지쓰기 -->
  <Modal_note_insert ref="modal_note_insert" :width="800" :height="500"  :clickToClose=true>
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
        <input type="text" placeholder="제목을 입력하세요." v-model="insert.note_title" name="note_title" id="note_title" class="note_title">
      </div>
      <div class="send_id_area">
        <input type="text" placeholder="받는아이디" v-model="insert.send_id" name="send_id" id="send_id" class="send_id" maxlength="13">
        <button @click="sendIdCheck" class="sendIdCheck">아이디 확인</button>
      </div>
      <div class="note_content_area">
        <textarea placeholder="내용을 입력하세요." v-model="insert.note_content" name="note_content" id="note_content" class="note_content" ></textarea>
      </div>
      <div>
        <button class="note_btn" @click="note_btn">보내기</button>
      </div>
    </div>
  </Modal_note_insert>

</template>
<script>
import { getBoardAll, searchBoard, updateHitBoard } from '@/api/index'
import comhubImg from '@/assets/comhub.png'
import Modal_note_insert from '@/components/Modal_note_insert.vue';
import Modal_note_list from '@/components/Modal_note_list.vue';

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
        bestToggle : false,
        searchData : '',
        default_image_path : comhubImg,
        hovering: false,
        insert: {
          send_id: '',
          note_title: '',
          note_content: '',
        },
        list: {
          gubun: '받은쪽지함',

        },
      }
    },
    computed:{
    },
    components:{
      Modal_note_insert,
      Modal_note_list,
    },
    mounted() {
      this.$propsWatch();
      this.getBoardAll();
      this.isLogin();
    },
    methods: {
      isLogin() {
        console.log("로그인?",this.$store.getters.isLogin)
      },
      async getBoardAll() {
        const res = await getBoardAll(0)

        this.boardList = res.data;
        this.tempList = res.data;

        this.boardSort()

        if(this.transferObj?.boardChange){
          this.boardChange(this.transferObj.boardChange)
        }
        if(this.transferObj?.searchWord){
          const res = await searchBoard(this.transferObj.searchWord)
          this.boardList = res.data.reverse()
        }
      },
      boardSort(){
        const gubunType = ['공지', '유머', '게임', '공부' ]
        const lists = { '공지': this.noticeList, '유머': this.funnyList, '게임': this.gameList, '공부': this.studyList, }

        this.boardList.forEach(board => {
          if( gubunType.includes(board.gubun)) {
            lists[board.gubun].push(board);
          }
          if( board.recommend >= 10) {
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
        if (!localStorage.getItem('isLogin')) {
          alert("로그인 이후 이용 가능합니다.");
          return;
        }
        this.$pushContents('BoardWrite');
      },
      goDetails(payload) {
        this.$pushContents('BoardDetails', {boardData: payload});
      },
      async upHit(payload) {
        let param = {
          id : payload
        }
        await updateHitBoard(param)
      },

      startPage() {
        return ((this.curPageNum - 1 ) * this.dataPerPage);
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
        if(event.target.value === 'all'){
          this.boardList = this.tempList
        }
        if(event.target.value === 'notice'){
          this.boardList = this.noticeList
        }
        if(event.target.value === 'funny'){
          this.boardList = this.funnyList
        }
        if(event.target.value === 'game'){
          this.boardList = this.gameList
        }
        if(event.target.value === 'study'){
          this.boardList = this.studyList
        }
      },
      changeBest(){
        if(this.bestToggle == false){
          this.boardList = this.bestList
          this.bestToggle = true
        }
        else{
          this.boardList = this.tempList
          this.bestToggle = false
          }
      },
      allBoard(){
        this.boardList = this.tempList
      },
      boardChange(event){ // 햄버거 버튼을 위한 메소드
        if(event == 'all'){
          this.boardList = this.tempList
        }
        if(event == 'notice'){
          this.boardList = this.noticeList
        }
        if(event == 'funny'){
          this.boardList = this.funnyList
        }
        if(event == 'game'){
          this.boardList = this.gameList
        }
        if(event == 'study'){
          this.boardList = this.studyList
        }
      },
      image_path(item) {
        if(item.image_path) {
          return item.image_path
        }
        return this.default_image_path
      },
      // 쪽지리스트 모달열기
      modal_note_list() {
        this.$refs.modal_note_list.modalOpen();
      },
      // 쪽지쓰기 모달열기
      modal_note_insert() {
        this.$refs.modal_note_insert.modalOpen();
      },
      sendIdCheck() {
        alert("쪽지쓰기 - 아이디 확인")
      },
      note_btn() {
        alert("쪽지쓰기 - 보내기")
      },
      note_list_send() {
        alert("쪽지관리 - 쪽지쓰기")
      },
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
  }
  .message_image:hover {
    background-image: url('@/assets/icons8-message_black-64.png');
  }
  .message_white_btn {
    width: 50px;
    height: 55px;
    transform: translate(-3px, -5px);
  }
  .message_black_btn {
    transform: translate(-10px, -10px);
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
  .send_id {
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
  // 쪽지리스트
  .note_insert_area_title {
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
  .modal_note_insert {
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
    margin-top: 30px;
  }
  .note_list_check {
    float: left;

  }
  .note_list_allCheck {
    margin-right: 5px;
  }
  .note_list_newNote {
    float: right;
    margin-right: 15px;
  }
  .note_list_allNote {
    float: right;
  }
  .hr {
    margin-top: 10px;
  }

</style>