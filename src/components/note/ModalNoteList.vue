<template>
  <div class="modal" v-if="isOpen" @click="closeModalOutside">

    <div class="modal-content" :style="{ width: width+'px', height: height+'px' }">
      <i class="fa-solid fa-x modal-close" @click="closeModal"></i>
      <slot></slot> <!-- 모달 내용을 slot으로 삽입합니다. -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: Number, // 너비를 문자열로 전달 받음
    height: Number, // 높이를 문자열로 전달 받음
    clickToClose: Boolean, // 딤처리 여부
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    modalOpen() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    closeModalOutside(event) {
      // 모달 바깥을 클릭하면 모달을 닫습니다.
      if (event.target.classList.contains('modal')) {
        if(this.clickToClose == true)
          this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
/* 모달 스타일링 */
.modal {
  /* 스타일링 내용 추가 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 모달 배경의 반투명 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 표시 */
}

.modal-content {
  /* 스타일링 내용 추가 */
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  cursor: default;
  border: #0d6efd 2px solid;

}

.modal-close{
  width: 20px;
  height: 20px;
  transform: translateX(52rem);
  background-color:transparent;
  border: none;
  cursor:pointer;
}
</style>