<template>
<div>
    <h1 style="margin-top:100px">관리자 페이지</h1>
    <div v-for="(item, idx) in boardData" :key="idx">
        <span>[{{ item.gubun }}] </span>
        <span>{{item.title}}</span>
        <span>{{item.image_path}}</span>
    </div>
</div>  
</template>

<script>
import { getBoardAll } from '@/api/index'

export default {
    mounted() {
        this.getBoardAll()
    },
    data() {
        return {
            boardData : '',
        }
    },
    methods: {
        async getBoardAll() {
            const res = await getBoardAll(0)
            this.boardData = res.data
        }
    },
}
</script>

<style>

</style>