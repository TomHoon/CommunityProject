<template>
  <div>
    <div class="title">
      상세 페이지
    </div>
    <button class="back" @click="backPage">
      뒤로가기
    </button>
  </div>
</template>

<script>
export default {
    methods:{
      backPage() {
        this.$backPage();
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
.back{
    color:#ad74e3;
    width: 500px;
    height: 50px;
    border: 0px;
    border-radius: 3px;
    font-size: 17px;
}
</style>