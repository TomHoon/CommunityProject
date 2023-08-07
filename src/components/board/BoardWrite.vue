<template>
    <article>
		<div class="container" role="main">
			<h2>글쓰기</h2>
				<div class="mb-3">
					<label for="title">제목</label>
					<input type="text" class="form-control" v-model="article.title" name="title" id="title" placeholder="제목을 입력해 주세요">
				</div>
                <div class="mb-3">
                    <label for="gubun">구분</label>
                    <select class="form-select" v-model="article.gubun" aria-label="Default select example" style="margin-bottom:10px;">
                        <option value="공지" selected>공지</option>
                        <option value="유머">유머</option>
                        <option value="게임">게임</option>
                        <option value="공부">공부</option>
                    </select>
                </div>
				<div class="mb-3">
					<label for="content">내용</label>
					<textarea class="form-control" v-model="article.content" rows="5" name="content" id="content" placeholder="내용을 입력해 주세요" ></textarea>
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
				<button type="button" style="margin-right:10px;" class="btn btn-sm btn-primary" id="btnSave" @click="saveWrite">저장</button>
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
            article: {
                gubun: '',
                title: '',
                content: '',
            }
        }
    },
    methods: {
        async fileHandler(e) {
            // console.log(e.target.files[0]);
            // const formData = new FormData();
            // formData.append('uploadFile', e.target.files[0]);
            // formData.append('test', '나눠서간다');
            
            // await axios.post('/pushImage', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            
        },
        backPage() {
            this.$backPage();
        },
        async saveWrite() {
            if (!this.article.gubun || !this.article.title) {
                alert("제목, 구분을 모두 채워주세요");
                return;
            }

            const formData = new FormData();
            formData.append('uploadFile', this.$refs.fileUpload.files[0]);
            let param = {
                gubun: this.article.gubun,
                title: this.article.title,
                content: this.article.content,
                writer: 'tom',
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
            await axios.post('/addBoard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(error => console.log(error.message));

            this.$backPage();
        }
    }
}
</script>

<style>
    .container {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
    }
</style>