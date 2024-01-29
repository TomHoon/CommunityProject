<template>
  <div class="title">
    <img src="@/assets/comhub.png" class="logo">
    <div class="title" @keyup="handleKeyPress">
      404 NOT FOUND
    </div>
    <!-- <p>키를 입력하세요: {{ userInput }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
    };
  },
  methods: {
    handleKeyDown(event) {
      // 키 입력 감지 시 호출되는 메서드
      this.userInput += event.key;

      // 특정 조건을 충족하면 원하는 동작 수행
      if (this.userInput === 'comhubadmin') {
        console.log('comhubAdmin 입력 감지!');
        // 여기에서 원하는 동작 수행
        this.$router.push('/AdminLogin'); // '/other-component'는 이동할 경로에 맞게 수정
      }
    },
  },
  mounted() {
    // 컴포넌트가 마운트된 후에 이벤트 리스너를 등록
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // 컴포넌트가 소멸되기 전에 이벤트 리스너를 제거 (메모리 누수 방지)
    window.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style>
.title{
    margin-top: 100px;
    font-size: 50px;
    font-weight: bold;
}

</style>