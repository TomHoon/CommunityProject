import axios from 'axios';

class Request {
    constructor() {
    }
    get(url, param) {
        return axios.get(url, param)
    }
    post(url, param) {
        return axios.post(url,param)
    }
}

function getBoardAll(payload) {
    return new Request().post('/getBoardAll', {order : payload})
}

function searchBoard(payload) {
    return new Request().post('/searchBoard', {title: payload})
}

function updateHitBoard(payload){
    return new Request().post('/updateHitBoard', payload)
}


//BoardDetails.vue
function getOneMember(payload){
    return new Request().post('/getOneMember', {member_id: payload})
}

function getOneFile(payload){
    return new Request().post('/getOneFile', {file_idx: payload})
}

function getBoardById(payload){
    return new Request().post('/getBoardById', {id: payload})
}

function deleteBoard(payload){
    return new Request().post('/deleteBoard', {'id': payload})
}

function updateRecommendBoard(payload){
    return new Request().post('/updateRecommendBoard', payload)
}

function getCommentByBoard(payload){
    return new Request().post('/getCommentByBoard', {id: payload});
}

function addComment(payload){
    return new Request().post('/addComment', payload);
}

function deleteComment(payload){
    return new Request().post('/deleteComment', {comment_idx : payload});
}

function recommendUpDown(payload){
    return new Request().post('/recommendUpDown', payload);
}

//BoardModify.vue
function updateBoard(payload){
    return new Request().post('/updateBoard', payload)
}


//BoardWrite.vue
function addBoard(payload){
    return new Request().post('/addBoard', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Join.vue
function tempImg(payload){
    return new Request().post('/tempImg', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}

function joinMember(payload){
    return new Request().post("/joinMember", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Login.vue
function loginMember(payload){
    return new Request().post("/loginMember", payload)
}

function joinOut(payload){
    return new Request().post('/joinOut', payload)
}

function memberUpdate(payload){
    return new Request().post("/memberUpdate", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}

export {
    getBoardAll,
    searchBoard,
    updateHitBoard,
    getOneMember,
    getOneFile,
    getBoardById,
    deleteBoard,
    updateRecommendBoard,
    getCommentByBoard,
    addComment,
    deleteComment,
    recommendUpDown,
    updateBoard,
    addBoard,
    tempImg,
    joinMember,
    loginMember,
    joinOut,
    memberUpdate,
    Request,
}