<template>
<div class="container">
  <img src="@/assets/back.png"  height="15" width="15" alt="" @click="backPage"><strong>뒤로가기</strong>
  <button type="button" class="btn btn-dark write-btn" @click="goWrite">글쓰기</button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">구분</th>
        <th scope="col" >제목</th>
        <th scope="col">내용</th>
        <th scope="col">글쓴이</th>
        <th scope="col">추천</th>
        <th scope="col">조회</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="(item, idx) in getBoardList" :key="idx"> -->
      <tr v-for="(item, idx) in calData()" :key="idx">  
        <th scope="row">{{item.id}}</th>
        <th scope="row">{{item.gubun}}</th>
        <td @click="goDetails">{{item.title}}</td>
        <td>{{item.content}}</td>
        <td>{{item.writer}}</td>
        <td>{{item.recommend}}</td>
        <td>{{item.hit}}</td>
      </tr>
    </tbody>
  </table>

  <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>
  

</div>
</template>

<script>
import axios from 'axios';

  export default {
    computed: {
      getBoardList() {
        return this.boardList
      }
    },
    mounted() {
      axios.get('/getBoardAll')
        .then((res) => {
          this.boardList = res.data;
          // console.log("res data : ", res.data)
          // console.log("boardList : ", this.boardList)
          // console.log("boardList[0] : ", this.boardList[0])
          // console.log("boardList[0].id : ", this.boardList[0].id)
          // console.log("boardList.length : ", this.boardList.length)
        });
    },
    data() {
      return {
        dataPerPage: 10, //한 페이지에서 볼 수 있는 게시물 개수
        curPageNum: 1, //이거머임?
        boardList: []
      }
    },
    methods: {
      backPage() {
        this.$backPage();
      },
      goWrite() {
        this.$pushContents('BoardWrite');
      },
      goDetails() {
        this.$pushContents('BoardDetails');
      },
      startPage() {
        return ((this.curPageNum - 1 ) * this.dataPerPage); // 0
      },
      endPage() {
        console.log(this.startPage() + this.dataPerPage)
        return ("end", this.startPage() + this.dataPerPage); // 0 + 10 = 10
      },
      numOfPages() {
        return Math.ceil(this.boardList.length / this.dataPerPage); // 페이지 갯수
      },
      calData() {
        return this.boardList.slice(this.startPage(), this.endPage())
      }
    }
}
</script>

<style>
  .write-btn {
    float: right;
  }
  .writing-title {
    cursor: pointer;
  }
  .page-num {
    cursor:pointer;
  }
</style>