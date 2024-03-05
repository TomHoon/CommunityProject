<template>
  <div class="user-box">
    <div> {{nickname}} 님 안녕하세요! </div>
    <div class="id"> @{{id}} </div>
    <div class="user-btn" type="button" @click="logOut">로그아웃</div>
    <div class="user-btn" type="button" @click="memberUpdate">회원수정</div>
    <div class="user-btn" type="button" @click="noteOpen">쪽지_beta</div>
    <div class="user-btn" type="button" @click="goChat">채팅_test</div>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies'
import { getOneMember, getOneFile, tempImg } from '@/api/index'

export default {
    data() {
        return {
            id: '',
            nickname: '',
            memberData: '',
        }
    },
    mounted() {
        this.getOneMember()
    },
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
        },
        async getOneMember() {
            const getOneMemberRes = await getOneMember(this.$store.state.id)
            this.memberData = getOneMemberRes.data;
            this.id = getOneMemberRes.data.member_id
            this.nickname = getOneMemberRes.data.member_nickname
            console.log('멤버데이터에용',this.memberData)
            this.$store.getters.isLogin ? this.isLogin = true : this.$store.getters.clearUserAll;
        },
        noteOpen() {
            this.$store.state.showNote = true;
        }
    },
}
</script>

<style scoped>

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