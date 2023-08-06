<template>
  <div>
      <div class="title">
        {{ pageParams.BoardData.title }}
      </div>

      <div>
        조회수 : {{ hit }} 추천수 : {{ recommend }}
      </div>
      
      <div class="content">
        {{ pageParams.BoardData.content }}
        <img :src=" pageParams.BoardData.image_path" alt="">
      </div>

      <button class="btn" @click="updateRecommend( pageParams.BoardData.id )">
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
  data() {
    return {
      recommend: 0,
      hit : 0,
    }
  },
  mounted() {
    axios.post('/getBoardById', {id:this.pageParams.BoardData.id}).then(response => {
      this.hit = response.data.hit;
      this.recommend = response.data.recommend;
    });
  },

  props: ['pageParams'],
  methods:{
    backPage() {
      this.$backPage({boardParam: '백페이지에서 사용할 파람'});
    },
    
    updateRecommend(payload) {
      console.log(console.log(payload))
      let param = {
        id : payload
      }
      axios.post('/updateRecommendBoard', param)
      .then((res) => {
        console.log(res)
        this.recommend = Number(this.recommend) + 1
      })
      .catch((error) => {
        console.error('오류', error);
      })
    },
  },
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