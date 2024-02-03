<template>
<div>
<div class="main-container">
    <div class="header-container">
        <div>
            <img src="@/assets/burger.svg" class="burger">
            <img src="@/assets/comhub.png" class="logo">
        </div>
        <div>
            관리자님 환영합니다.
        </div>
    </div>

    <div class="content-container">
        <div class="post-container">
            <div class="new-posts">
                최신 게시글
            </div>
            <div v-for="(item, idx) in boardData" :key="idx" class="posts">
                <div>[{{ item.gubun }}] </div>
                <div>{{item.title}}</div>
                <div>{{item.image_path}}</div>
            </div>
        </div>

        <div class="comment-container">
            <div class="new-comments">
                최근 댓글
            </div>

            <div>

            </div>
        </div>
    </div>

    <div>
        <div class="member-container">
            <div>
                회원
            </div>
        </div>

        <div class="notice-container">
            <div>
                공지사항
            </div>
        </div>
    </div>
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

<style scoped>
.main-container{
    width:1280px;
    margin: auto;
}

.header-container{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo{
    margin: 10px;
}

.content-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-container{
    width: 600px;
    border: 1px solid black;
}

.new-posts{
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding:10px;
    
}

.posts{
    display: flex;
    padding: 10px;
}

.comment-container{
    width: 600px;
    border: 1px solid black;
}

.new-comments{
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding:10px;
}

.comments{
    display: flex;
    padding: 10px;
}

</style>