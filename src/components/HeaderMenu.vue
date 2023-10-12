<template>
<div>
    <div class="menu-box">
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
.menu-box{
    width: 100px;
    background-color: #f1f1f1;
    color: black;
    border-radius: 10px;
    padding:10px;
}
.menu-btn{
    padding:10px;
    margin: 10px;
    background-color: white ;
    border-radius: 10px;
}
</style>