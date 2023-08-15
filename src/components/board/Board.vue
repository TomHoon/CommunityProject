<!-- <template>
<div class="container">
    <img src="@/assets/back.png"  height="15" width="15" alt="" @click="backPage"><strong>뒤로가기</strong>
  <button type="button" class="btn btn-dark write-btn" @click="goWrite">글쓰기</button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">구분</th>
        <th scope="col">제목</th>
        <th scope="col">내용</th>
        <th scope="col">글쓴이</th>
        <th scope="col">추천</th>
        <th scope="col">조회</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in calData()" :key="idx" @click="[goDetails(item),upHit(item.id)]">  
        <th scope="row">{{item.id}}</th>
        <th scope="row">{{item.gubun}}</th>
        <td>{{item.title}}</td>
        <td>{{item.content}}</td>
        <td>{{item.writer}}</td>
        <td>{{item.recommend}}</td>
        <td>{{item.hit}}</td>
      </tr>
    </tbody>
  </table>

  <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>

</div>
</template> -->

<template>
<Header @searchBoard="searchBoard"></Header>
  <div class="board-container">
    <div class="top-box">
      <button type="button" class="btn btn-primary write-btn" @click="goWrite">글쓰기</button>

      <button type="button" class="btn btn-primary right-btn" @click="changeBest">베스트</button>
      <select class="select-date" @change="changeCreateTime">
        <option>최신 순</option>
        <option>오래된 순</option>
      </select>

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
          <div><h5 style="color:blue">[{{item.gubun}}] {{item.title}} (댓글수)</h5></div>
          <div><p>No.{{item.id}} | 추천 {{item.recommend}} | 조회 {{item.hit}} | {{item.reg_date}} </p></div>
        </div>
      </div>

    </div>
    <div class="bottom-box">
      <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    props: ['pageParams', 'transferObj'],
    computed:{
      
    },
    mounted() {
      this.$propsWatch();
      axios.post('/getBoardAll', {order: 0})
      .then((res) => {
        this.boardList = res.data;
        this.tempList = res.data;
        for(let i=0; i < this.boardList.length; i++){
          if(this.boardList[i].gubun == '공지'){
            this.noticeList.push(this.boardList[i])
          }
          if(this.boardList[i].gubun == '유머'){
            this.funnyList.push(this.boardList[i])
          }
          if(this.boardList[i].gubun == '게임'){
            this.gameList.push(this.boardList[i])
          }
          if(this.boardList[i].gubun == '공부'){
            this.studyList.push(this.boardList[i])
          }
          if(this.boardList[i].recommend >= 10){ // 다음 숫자를 변경하면 베스트 게시판의 추천수를 변경할 수 있습니다.
            this.bestList.push(this.boardList[i])
          }
        }
      });
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
      }
    },
    methods: {
      async searchBoard(emitData) {
        console.log(emitData);
        await axios.post('/searchBoard', {title: emitData})
        .then(res => this.boardList = res.data)
        .catch(error => console.log(error));
      },
      detailChain(item) {
        // if (!localStorage.getItem("isLogin")) {
        //   alert("로그인 이후 이용 가능합니다.");
        //   return;
        // }
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
        axios.post('/updateHitBoard', param).then(() => {
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
        this.boardList = this.bestList
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
    margin-top: 20px;
  }
  .page-num {
    cursor:pointer;
  }
</style>