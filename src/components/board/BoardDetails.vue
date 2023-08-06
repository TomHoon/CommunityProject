<template>
  <div>
      <div class="title">
       [{{ pageParams.BoardData.gubun }}] {{ pageParams.BoardData.title }} [댓글수]
      </div>

      <div class="sub">
        추천 {{ recommend }} | 조회 {{ hit }} |  
      </div>
      
      <div class="content">
        <div>
          <img :src=" pageParams.BoardData.image_path" alt="">
        </div>
        <div class="content-text">
          {{ pageParams.BoardData.content }}
        </div>
      </div>

      <button class="btn" @click="updateRecommend( pageParams.BoardData.id )">
        <div> {{ recommend }}</div>
        추천
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
      let param = {
        id : payload
      }
      axios.post('/updateRecommendBoard', param)
      .then(() => {
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
    font-size: 40px;
    font-weight: bold;
}
.content{
  margin:20px auto;
}
.content-text{
  margin : 20px auto;
}

.btn{
    color:#ad74e3;
    background-color: pink;
    width: 200px;
    margin : 5px;
    height: 100px;
    border: 0px;
    /* border-radius: 3px; */
    font-size: 17px;
}
</style>