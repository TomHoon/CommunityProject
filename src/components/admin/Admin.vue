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
                <div class="post-gubun">[{{ item.gubun }}]</div>
                <div class="post-content">{{item.title}}</div>
                <div class="post-img-box">
                    <img class="post-img" :src="image_path(item)">
                </div>
            </div>

            <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>

            <div class="pagenations">

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

    <div class="manage-container">
        <div class="member-container">
            <div>
                <div v-for="(item, idx) in memberData" :key="idx" class="posts">
                <div>/ 아이디 : {{item.member_id}} /</div>
                <div>/ 이름 : {{item.member_name}} /</div>
                <div>/ 닉네임 : {{item.member_nickname}} /</div> 
                <div>/ phone : {{item.member_phone}} /</div>
                <div>/ 가입일 : {{item.member_reg_data}} /</div>
            </div>
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
import { getBoardAll, getMemberAll } from '@/api/index'
import comhubImg from '@/assets/comhub.png'

export default {
    mounted() {
        this.getBoardAll()
        this.getMemberAll()
    },
    data() {
        return {
            dataPerPage: 10, //한 페이지에서 볼 수 있는 게시물 개수
            curPageNum: 1, //현재 페이지
            boardData : '',
            memberData : '',
            default_image_path : comhubImg,
        }
    },
    methods: {
        async getBoardAll() {
            const res = await getBoardAll(0)
            this.boardData = res.data
        },
        async getMemberAll() {
            const res = await getMemberAll()
            this.memberData = res.data
            console.log(res.data)
        },
        image_path(item) {
            if (item.image_path) {
                return item.image_path
            }
            return this.default_image_path
        },
        startPage() {
            return ((this.curPageNum - 1) * this.dataPerPage);
        },
        endPage() {
            return ("end", this.startPage() + this.dataPerPage);
        },
        numOfPages() {
            return Math.ceil(this.boardData.length / this.dataPerPage); // 페이지 갯수
        },
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
    align-items: center;
    justify-content: space-between;
}

.post-container{
    width: 600px;
    max-height: 800px;
    border: 1px solid #e5e5e5;
    background-color: white;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
}

.new-posts{
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding: 50px 0px 20px 50px;
}

.posts{
    display: flex;
    align-items: center;
    padding: 10px 50px 5px 50px;
    font-size: x-large;
    color:black;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
}

.post-content{
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: left;
    margin-left: 5px;
    /* border-bottom: 1px solid black; */
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    text-indent: 5px;
}

.post-img-box{
    width: 200px;
    padding: 0 0px 0 10px;
}

.post-img{
    width:150px;
}

.comment-container{
    width: 600px;
    border: 1px solid black;
    background-color: white;
    max-height: 800px;
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

.manage-container{
    display:flex;
    justify-content: space-between;
    align-items: center;
}

.member-container{
    width: 600px;
}

.notice-container{
    width: 600px;
}

</style>