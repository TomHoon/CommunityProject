<template>
<Header @searchBoard="searchBoard" @AllBoard="allBoard" @boardChange="boardChange"></Header>
  <div class="board-container">
    <div class="top-box">
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
    <hr>
    <div class="board-table">
      <div class="board-table-row" v-for="(item, idx) in calData()" :key="idx" @click="detailChain(item)">  
        <div class="board-table-cell1">
          <img class="product-img" :src="item.image_path">
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
import axios from 'axios';
import { getBoardAll, searchBoard, updateHitBoard } from '@/api/index'

  export default {
    props: ['pageParams', 'transferObj'],
    computed:{
    },
    mounted() {
      this.$propsWatch();
      this.getBoardAll(0);
    },
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
      }
    },
    methods: {
      async getBoardAll(payload) {
        const res = await getBoardAll(payload)
        this.boardList = res.data;
        this.tempList = res.data;

        this.boardSort()

        if(this.transferObj?.boardChange){
          this.boardChange(this.transferObj.boardChange)
        }
        if(this.transferObj?.searchWord){
          searchBoard(this.transferObj.searchWord)
            .then(res => this.boardList = res.data.reverse())
            .catch(error => console.log(error));
        }
      },
      boardSort(){
        const types = [ '공지', '유머', '게임', '공부' ]
        const lists = { '공지': this.noticeList, '유머': this.funnyList, '게임': this.gameList, '공부': this.studyList, }

        this.boardList.forEach(board => {
          if( types.includes(board.gubun)) {
            lists[board.gubun].push(board);
          }
          if( board.recommend >= 10) {
            this.bestList.push(board)
          }
        })
      },
      async searchBoard(emitData) {
        console.log(emitData);
        await searchBoard(emitData)
        .then(res => this.boardList = res.data.reverse())
        .catch(error => console.log(error));
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
      upHit(payload) {
        let param = {
          id : payload
        }
        updateHitBoard(param)
        .then(() => {
        })
        .catch((error) => {
          console.error('오류', error);
        })
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
      changeGubun(event) {
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
      boardChange(event){
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
</style>