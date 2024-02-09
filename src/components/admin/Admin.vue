<template>
<div class="main-container">
    <div class="header-container">
        <div>
            <img src="@/assets/burger.svg" class="burger">
            <img src="@/assets/comhub.png" class="logo">
        </div>
        <div>
            관리자님 환영합니다 3 t
        </div>
    </div>

    <div class="content-container">
        <div class="content-space">
            <div class="title">
                <div>
                    최신 게시글
                </div>
                <!-- <div>
                    삭제
                </div> -->
            </div>
            <div class="content-box">
                <div v-for="(item, idx) in calData(boardData)" :key="idx" class="contents">
                    <!-- <input class="check-btn" type="checkbox"> -->
                    <div class="post-gubun">[{{ item.gubun }}]</div>
                    <div class="post-content">{{item.title}}</div>
                    <div class="post-img-box">
                        <img class="post-img" :src="image_path(item)">
                    </div>
                </div>
            </div>

            <div class="pagenations">
                <span class="page-num" v-for="i in numOfPages(boardData)" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>
            </div>
        </div>

        <div class="content-space">
            <div class="title">
                최근 댓글
            </div>
            <div class="content-box">
                <div class="contents">
                    댓글 내용
                </div>
            </div>

            <div class="pagenations">
                <!-- <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span> -->
                <span>1</span>
            </div>
        </div>
    </div>

    <div class="content-container">
        <div class="mini-space">
            <div class="title">
                회원 목록
            </div>
            <div class="content-box">
                <div v-for="(item, idx) in calData(memberData)" :key="idx" class="contents">
                    <div>/ 아이디 : {{item.member_id}} /</div>
                    <div>/ 이름 : {{item.member_name}} /</div>
                    <div>/ 닉네임 : {{item.member_nickname}} /</div> 
                    <div>/ phone : {{item.member_phone}} /</div>
                    <div>/ 가입일 : {{item.member_reg_data}} /</div>
                </div>
            </div>

            <div class="pagenations">
                <span class="page-num" v-for="i in numOfPages(memberData)" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span>
            </div>
        </div>

        <div class="mini-space">
            <div class="title">
                공지사항
            </div>
            <div class="mini-box">

            </div>

            <div class="pagenations">
                <!-- <span class="page-num" v-for="i in numOfPages()" :key="i" @click="curPageNum = i"> {{ i }} &nbsp; </span> -->
                <span>1</span>
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
            dataPerPage: 8, //한 페이지에서 볼 수 있는 게시물 개수
            curPageNum: 1, //현재 페이지
            boardData : '',
            commentData : '',
            memberData : '',
            noticeData : '',
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
        startPage(name) {
            return (this.curPageNum -1) * this.dataPerPage; 
        },
        endPage() {
            // return "end", this.startPage() + this.dataPerPage;
            return this.startPage() + this.dataPerPage;
        },
        numOfPages(payload) {
            return Math.ceil(payload.length / this.dataPerPage); // 페이지 갯수
        },
        calData(payload, name) {
            return payload.slice(this.startPage(name), this.endPage()) // dataPerPage로 나눠서 페이지당 볼 수 있는 게시글 제한
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
    padding: 10px 0px 10px 0px;
}

.content-space{
    width: 600px;
    height: 450px;
    border: 1px solid #e5e5e5;
    background-color: white;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
}

.mini-space{
    width: 600px;
    height: 450px;
    border: 1px solid #e5e5e5;
    background-color: white;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
}

.content-box{
    height: 310px;
}

.title{
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding: 30px 0px 20px 30px;
    display: flex;
    justify-content: space-between;
}

.contents{
    display: flex;
    align-items: center;
    padding: 5px 30px 0px 30px;
    font-size: 15px;
    color:black;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
}

.check-btn{
    margin: 0px 5px 0px 5px;
}

.post-content{
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: left;
    margin-left: 5px;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    text-indent: 5px;
    /* border-bottom: 1px solid black; */
}

.post-img-box{
    width: 100px;
    height: 30px;
}

.post-img{
    width: 100px;
    height: 30px;
}
</style>