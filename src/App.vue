<template>
  <router-view></router-view>
  <button @click="test">추가버튼</button>
  <button @click="del">삭제버튼</button>
</template>

<script>

export default {
  components: {
  },
  methods: {
    test() {
      console.log("hello");
      this.$pushContents('Login')
    },
    del() {
      this.$clearLayer();
    }
  }
}
</script>

<style>
</style>
