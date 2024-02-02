<template>
    <Header></Header>
    <article>
		<div class="container" role="main">
                <div class="mb-3 flex">
                    <select class="form-select" v-model="article.gubun" aria-label="Default select example">
                        <option value="공지">공지</option>
                        <option value="유머">유머</option>
                        <option value="게임">게임</option>
                        <option value="공부">공부</option>
                    </select>
					<input type="text" class="form-control title" v-model="article.title" name="title" id="title" placeholder="제목을 입력해 주세요">
                </div>
				<div class="mb-4" v-if="ImgPath">
                    <img :src="ImgPath" alt="" class="content-img">
                </div>
                <!-- <div id="editor" contenteditable="true"> -->

                <!-- </div> -->
				<div class="mb-4">
					<textarea contenteditable="true" class="form-control" v-model="article.content" rows="10" name="content" id="content" placeholder="내용을 입력해 주세요" ></textarea>
				</div>
				<div>
                    <label for="fileUpload" type="button">
                      <img src="@/assets/fileUpload.svg" style="width:30px; margin-right:5px;"/>
                    </label>
					<input type="file" id="fileUpload" ref="fileUpload" style="width:210px;" @change="fileHandler">
				</div>

			<div style="padding-top:40px; height:0px;">
				<button type="button" style="margin-right:10px;" class="btn btn btn-primary" id="btnSave" @click="saveWrite">작성</button>
				<button type="button" class="btn btn btn-primary" @click="backPage">목록</button>
			</div>
		</div>
	</article>
</template>

<script>
import { addBoard } from '@/api/index';



export default {
    props: ['pageParams', 'transferObj'],
    data() {
        return {
            article: {
                gubun: '공지',
                title: '',
                content: '',
            },
            ImgPath : null
        }
    },
    methods: {
        fileHandler(e) {
            // console.log(e.target.files[0]);
            // const formData = new FormData();
            // formData.append('uploadFile', e.target.files[0]);
            // formData.append('test', '나눠서간다');
            
            // await axios.post('/pushImage', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            const file = e.target.files[0];
            if (file) {
                // 이미지 파일이 선택된 경우, ImgPath 변수에 파일 경로를 저장
                this.ImgPath = URL.createObjectURL(file);
            }
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
            await addBoard(formData).catch(error => console.log(error.message));

            this.$backPage();
        },
    }
}
</script>

<style scoped>
    .container {
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
    .flex {
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
    .content-img {
  max-width: 1050px;
  border-radius: 10px;
}
</style>