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
            board: {
                gubun : '공지',
                title : '',
                content : '',
            }

        }
    },
    props: ['pageParams', 'transferObj'],
    mounted() {
        this.board = this.pageParams.board;
    },
    methods: {
        async modify() {
            if (!this.board.gubun || !this.board.title) {
                alert("제목, 구분을 모두 채워주세요");
                return;
            }

            const formData = new FormData();
            formData.append('uploadFile', this.$refs.fileUpload.files[0]);
            let param = {
                gubun: this.board.gubun,
                title: this.board.title,
                content: this.board.content,
                writer: this.$store.state.id,
                recommend: '1',
                hit: '1',
            };

            /**
            * 💕알림1) 
            * Backend에서 @RequestPart를 사용하기 때문에 
            * 백엔드 파라미터 변수명과 같이해야함
            * 
            * 백엔드에서 받는 파라미터 변수명이
            * ✨param 이기 때문에 변수명을 그대로 사용해야함
            * 
            * 
            * 💕알림2)
            * @RequestPart 는 
            * 데이터 타입을 String으로만 받을 수 있어
            * stringify 처리함 
            */
            formData.append('param', JSON.stringify(param));
            await updateBoard(formData).catch(error => console.log(error.message));
            // await addBoard(formData).catch(error => console.log(error.message));

            this.$backPage();
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