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
<Header></Header>
  <div class="board-container">
    <button type="button" class="btn btn-dark write-btn" @click="goWrite">글쓰기</button>
    <div class="board-table">

      <div class="board-table-row" v-for="(item, idx) in calData()" :key="idx" @click="[goDetails(item),upHit(item.id)]">  
        <div class="board-table-cell1">
          <img class="product-img" :src="item.image_path">
        </div>
        <div class="board-table-cell2">
          <div><h5 style="color:blue">{{item.title}}(5)</h5></div>
          <div><p>[{{item.gubun}}] No.{{item.id}} | 조회수: {{item.hit}} | 추천수: {{item.recommend}} | {{item.reg_date}} </p></div>
        </div>
      </div>

    </div>
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
          console.log(this.boardList)
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
    max-width:60px;
    max-height:60px;
    /* max-width:180px; */
    /* max-height:180px; */
  }
</style>