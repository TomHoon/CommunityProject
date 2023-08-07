<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="title">
       [{{ pageParams.BoardData.gubun }}] {{ pageParams.BoardData.title }} [댓글수]
      </div>

      <div class="sub">
        <img src="@/assets/profile_Img.jpg" class="profile-img"> {{ pageParams.BoardData.writer }} | 추천 {{ recommend }} | 조회 {{ hit }} | 일시 {{ pageParams.BoardData.reg_date }} 
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
.main{
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  margin-top : 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
.profile-img{
  width: 30px;
  height: 30px;
  border-radius: 30px;
}
.title{
  font-size: 30px;
  font-weight: bold;
}
.content{
  margin: 20px auto;
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