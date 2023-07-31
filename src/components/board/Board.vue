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
      <tr v-for="(item, idx) in getBoardList" :key="idx">
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
</div>
</template>

<script>
import axios from 'axios';

  export default {
    computed: {
      getBoardList() {
        axios.get('/getBoardAll')
        .then((res) => {
          this.boardList = res.data;
        });
        return this.boardList;
      }
    },
    mounted() {
      axios.get('/getBoardAll')
        .then((res) => {
          this.boardList = res.data;
          console.log(res.data);
        });
    },
    data() {
      return {
        boardList: []
      }
    },
    methods: {
      backPage() {
        this.$backPage();
      },
      goWrite() {
        this.$pushContents('BoardWrite');
      }
    }
  }
</script>
<style>
  .write-btn {
    float: right;
  }
</style>