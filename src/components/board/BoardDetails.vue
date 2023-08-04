<template>
  <div>
      <div class="title">
        {{ pageParams.BoardData.title }}
      </div>

      <div>
        조회수 : {{ pageParams.BoardData.recommend }} 추천수 : {{ pageParams.BoardData.hit}}
      </div>
      
      <div class="content">
        {{ pageParams.BoardData.content }}
        <img :src=" pageParams.BoardData.image_path" alt="">
      </div>

      <button class="btn" @click="Recommend( pageParams.BoardData.id )">
        추천하기
      </button>

      <button class="btn" @click="backPage">
        뒤로가기
      </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['pageParams'],
  mounted() {
    console.log('보드리스트', this.pageParams.BoardData);
    axios.post('/getBoardById', {id: 15}).then((res) => console.log(res.data));
  }, 
  methods:{
    backPage() {
      this.$backPage({boardParam: '백페이지에서 사용할 파람'});
    },
    Recommend(payload) {
        let param = {
          id : payload
        }
        console.log(payload)
        axios.post('/updateRecommendBoard', param).then(() => {
        })
        .catch((error) => {
          console.error('오류', error);
        })
      },
  }
}
</script>

<style scoped>
.title{
    color:#ad74e3;
    font-size: 40px;
    font-weight: bold;
}
.content{
  height: 200px;
}
.btn{
    color:#ad74e3;
    background-color: pink;
    width: 200px;
    margin : 5px;
    height: 50px;
    border: 0px;
    border-radius: 3px;
    font-size: 17px;
}
</style>