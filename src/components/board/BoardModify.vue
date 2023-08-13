<template>
    <article>
		<div class="container" role="main">
			<h2>글 수정</h2>
				<div class="mb-3">
					<label for="title">제목</label>
					<input type="text" class="form-control" v-model="board.title" name="title" id="title" placeholder="제목을 입력해 주세요">
				</div>
                <div class="mb-3">
                    <label for="gubun">구분</label>
                    <select class="form-select" v-model="board.gubun" aria-label="Default select example" style="margin-bottom:10px;">
                        <option value="공지" selected>공지</option>
                        <option value="유머">유머</option>
                        <option value="게임">게임</option>
                        <option value="공부">공부</option>
                    </select>
                </div>
				<div class="mb-3">
					<label for="content">내용</label>
					<textarea class="form-control" v-model="board.content" rows="5" name="content" id="content" placeholder="내용을 입력해 주세요" ></textarea>
				</div>
				<div class="mb-3">
					<label for="content">파일첨부</label>
					<input type="file" ref="fileUpload">
				</div>
				<!-- <div class="mb-3">
					<label for="tag">TAG</label>
					<input type="text" class="form-control" name="tag" id="tag" placeholder="태그를 입력해 주세요">
				</div> -->
			<div >
				<button type="button" style="margin-right:10px;" class="btn btn-sm btn-primary" id="btnSave" @click="modify">수정</button>
				<button type="button" class="btn btn-sm btn-primary" @click="backPage">목록</button>
			</div>
		</div>
	</article>
</template>
<script>
import axios from 'axios';

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
            await axios.post('/updateBoard', this.board)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }
}
</script>