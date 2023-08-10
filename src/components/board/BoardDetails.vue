<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="title left-align">
       {{ BoardData.title }}
      </div>

      <div class="sub left-align">
        <img src="@/assets/profile_Img.jpg" class="profile-img"> {{ BoardData.writer }} | 조회 {{ hit }} | 추천 {{ recommend }} | 일시 {{ BoardData.reg_date }} 
      </div>
      
      <hr>

      <div class="content left-align">
        <div>
          <img :src=" BoardData.image_path" alt="">
        </div>
        <div class="content-text">
          {{ BoardData.content }}
        </div>
      </div>

      <button class="btn" @click="updateRecommend( BoardData.id )">
        <div> {{ recommend }}</div>
        추천
      </button>

      <button class="btn" @click="backPage">
        뒤로가기
      </button>
    </div>
    <div class="comment_wrap">
      <div class="comment_form">
        <div>
          댓글구역(수정중)
        </div>
      </div>
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
  computed:{
    BoardData() {
      return this.pageParams.BoardData;
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
.left-align{
  text-align: left;
  padding: 10px;
}
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
    width: 100px;
    margin : 5px;
    height: 80px;
    border: 0px;
    /* border-radius: 3px; */
    font-size: 17px;
}
.comment_wrap {

}
.comment_form {
  box-sizing: border-box;
  border: 1px solid gray;
  width: 900px;
  height: 200px;
  margin: 30px auto ;
}
</style>