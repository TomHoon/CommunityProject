<template>
    <Header></Header>
    <article>
		<div class="container" role="main">
				<div class="mb-3 flex">
                    <select class="form-select" v-model="board.gubun" aria-label="Default select example">
                        <option value="공지" selected>공지</option>
                        <option value="유머">유머</option>
                        <option value="게임">게임</option>
                        <option value="공부">공부</option>
                    </select>
					<input type="text" class="form-control title" v-model="board.title" name="title" id="title" placeholder="제목을 입력해 주세요">
				</div>
				
                <div class="mb-4">
					<textarea class="form-control" v-model="board.content" rows="10" name="content" id="content" placeholder="내용을 입력해 주세요" ></textarea>
				</div>
				<div>
                    <label for="fileUpload" type="button">
                      <img src="@/assets/fileUpload.svg" style="width:30px; margin-right:5px;"/>
                    </label>
					<input type="file" id="fileUpload" ref="fileUpload" style="width:210px;">
				</div>
                
			<div style="padding-top:40px; height:0px;">
				<button type="button" style="margin-right:10px;" class="btn btn btn-primary" id="btnSave" @click="modify">수정</button>
				<button type="button" class="btn btn btn-primary" @click="backPage">목록</button>
			</div>
		</div>
	</article>
</template>
<script>
import { updateBoard } from '@/api/index'

export default {
    data() {
        return {
            board: {}
        }
    },
    props: ['pageParams', 'transferObj'],
    mounted() {
        this.board = this.pageParams.board;
    },
    methods: {
        async modify() {
            await updateBoard(this.board)
            .then(res => console.log(res), this.backPage())
            .catch(err => console.log(err));
        },
        backPage() {
            this.$backPage();
        },
    }
}
</script>

<style scoped>
.container{
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  margin-top : 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  padding-bottom: 4rem;
  border:none;
}
.flex{
    display: flex;
}
.form-select{
    width: 100px;
    height: 50px;
    margin-right:10px;
}
.title{
    width: 100%;
}
</style>