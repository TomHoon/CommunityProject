<template>
  <div v-if="isVisible" class="alert">
    <div class="alert-content">
      <span>{{ host }}의 내용: </span><br>
      <p>{{ message }}</p>
      <button @click="closeAlert">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      message: '',
      host: window.location.host,
    }
  },
  mounted() {
  },
  methods: {
    showAlert(message) {
      this.isVisible = true;
      this.message = message;

    },
    closeAlert() {
      this.isVisible = false;
    },
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.alert-content {
  background-color: white;
  padding: 20px 20px 15px 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 400px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.alert-content span {
  float: left;
  font-size: 17px;
}
.alert-content p {
  margin: 0;
  margin-bottom: 40px;
  margin-top: 5px;
  text-align: left;
  font-size: 13px;
}
.alert-content button {
  border: 2px solid #0d6efd;
  border-radius: 60px;
  background-color: #0d6efd;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: 75px;
  height: 45px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>