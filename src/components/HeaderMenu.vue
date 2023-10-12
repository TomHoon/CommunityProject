<template>
<div>
    <div class="menu-box">
        <div class="menu-title">게시판 목록</div>
        <div class="menu-btn" type="button" @click="boardChange('all')">전체</div>
        <div class="menu-btn" type="button" @click="boardChange('notice')">공지</div>
        <div class="menu-btn" type="button" @click="boardChange('funny')">유머</div>
        <div class="menu-btn" type="button" @click="boardChange('game')">게임</div>
        <div class="menu-btn" type="button" @click="boardChange('study')">공부</div>
    </div>
</div>
</template>

<script>
export default {
    methods:{
        boardChange(payload) {
            this.$emit('boardChange', payload)
            this.$clearLayer( { boardChange : payload } );
        }
    },
    emits: ['boardChange']

}
</script>

<style scoped>
@media (max-width: 1000px) {
  /* 화면 너비가 1000px 이하일 때 메뉴를 숨김 */
.menu-title{
    display: none;
    
}
.menu-box{
    display: none;
}
.menu-btn{
    display: none;
}
}

.menu-title{
    color: #055cf4;
    font-size: 30px;
    font-family: 'Pretendard-Black';
    
}
.menu-box{
    width: 300px;
    height: 1245px;
    background-color: #f1f1f1;
    color: black;
    border-radius: 0 0 10px 0;
    padding:10px;
    font-family: 'pretendard-Light';
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.26);
}
.menu-btn{
    padding:10px;
    margin: 10px;
    background-color: white ;
    border-radius: 10px;
}
</style>