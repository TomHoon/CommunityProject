<template>
    <div>
        <strong>chatting test</strong>
        <div class="chatting-area">
            <input type="text" v-model="message" @keyup.enter="send">
            <button @click="send">보내기</button>
        </div>
        <div class="receive-area-wrapper">
           <div class="receive-area">
                <ul class="receive-area-ul">
                    <!-- TODO: 동적 class명 방법 바꿔야함 -->
                    <li v-for="(item, index) in receiveMsg" :key="index" :class="{ar : 본인아이디 == item.아이디, al :본인아이디 != item.아이디}">
                        <div>
                            <strong :class="{colored: item.아이디 == this.본인아이디}">{{item.아이디 || '익명'}}님 :</strong> {{item.내용}}
                        </div>
                    </li>
                </ul>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            websocket: null,
            receiveMsg: [],
            본인아이디: ''
        }
    },
    mounted() {
        this.setWebSocket();
        this.본인아이디 = this.$store.state.id
    },
    methods: {
        setWebSocket() {
            // websocket 생성
            this.websocket = new WebSocket("ws://tomhoon.duckdns.org:18080/ws/chat");
            this.websocket.onmessage = this.onMessage;	// 소켓이 메세지를 받을 때
            this.websocket.onopen = this.onOpen;		// 소켓이 생성될때(클라이언트 접속)
        },
        onClose(evt) {
            console.log(">>> close event", evt);
        },  
        onOpen(evt) {
            console.log(">>> open event ", evt);
        },
        // 메세지 받을 때
        onMessage(msg) {
            console.log(">>> msg ", msg.data);
            let { chatId, chatContent }= JSON.parse(msg.data);

            let 받은메세지 = {
                아이디: chatId,
                내용: chatContent
            };

            this.receiveMsg.push(받은메세지);
        },
        send() {
            let message = this.message;

            if (message != "") {
                let msg = {
                    chatId: this.본인아이디,
                    chatContent: message
                }

                if (message != null) {
                    this.websocket.send(JSON.stringify(msg));
                }
                
            }
            this.message = '';
        }
    },
    destroyed() {
        this.websocket.onclose = this.onClose;	// 소켓이 닫힐때(클라이언트 접속해제)
    }
}
</script>
<style scoped>
    .receive-area-wrapper {
        width: 100%;
        padding:20px;
    }
    .receive-area {
        margin: 0 auto;
        border: 1px solid black;
        border-radius: 10px;
        width: 500px;
        height: 500px;
        background:white;
        overflow-y:scroll
    }
    .receive-area-ul {
        list-style: none;
    }
    .al {
        text-align: left;
        margin-left: 10px;
    }
    .ar {
        text-align: right;
        margin-right: 10px;
    }
    .colored {
        color: blue
    }
</style>