<template>
  <div class="user-box">
    
    <div class="user-btn" type="button" @click="logOut">로그아웃</div>
    <div class="user-btn" type="button" @click="memberUpdate">회원수정</div>
    <div class="user-btn" type="button" @click="goChat">채팅_test</div>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies'

export default {
    methods: {
        async logOut() {
            this.$store.commit('clearId')
            this.$store.commit('clearToken')
            deleteCookie("token")
            deleteCookie("id")
            await this.$clearLayer();
            location.reload();
            return;
        },
        memberUpdate() {
            this.$pushContents('MemberUpdate');
        },
        goChat() {
            this.$pushContents('Chat');
        }
    },

}
</script>

<style>

.user-box{
    width: 200px;
    height: 100%;
    background-color: #f1f1f1;
    color: black;
    border-radius: 0 0 10px 10px;
    padding:10px;
    font-family: 'pretendard-Light';
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.26);
}
.user-btn{
    padding:10px;
    margin: 10px;
    background-color: white ;
    border-radius: 10px;
}

</style>