<template>
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
      <!-- 페이징 처리 이전 코드 -->
      <!-- <tr v-for="(item, idx) in getBoardList" :key="idx"> -->
      
      <!-- 페이징 처리 이후 코드 -->
      <tr v-for="(item, idx) in calData()" :key="idx">  
        <th scope="row">{{item.id}}</th>
        <th scope="row">{{item.gubun}}</th>
        <td @click="[goDetails(item),upHit(item.id)]">{{item.title}}</td>
        <td>{{item.content}}</td>
        <td>{{item.writer}}</td>
        <td>{{item.recommend}}</td>
        <td>{{item.hit}}</td>
      </tr>
    </tbody>
  </table>

  <!-- 페이징 처리 코드 -->
  <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>


</div>
</template>

<script>
import axios from 'axios';

  export default {
    props: ['pageParams', 'transferObj'],
    computed: {
      getBoardList() {
        return this.boardList
      }
    },
    mounted() {
      this.$propsWatch();
      axios.post('/getBoardAll', {order: 0})
        .then((res) => {
          this.boardList = res.data;
        });
    },
    data() {
      return {
        dataPerPage: 10, //한 페이지에서 볼 수 있는 게시물 개수
        curPageNum: 1, //현재 페이지
        boardList: []
      }
    },
    methods: {
      backPage() {
        this.$backPage({test: 'hello'});
      },
      goWrite() {
        this.$pushContents('BoardWrite');
      },
      goDetails(payload) {
        this.$pushContents('BoardDetails', {BoardData: payload});
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