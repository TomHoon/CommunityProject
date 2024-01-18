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

// function getBoardAll() {
    // return new Request().post('/getBoardAll',{order : 0})
// }

function getBoardAll(payload) {
    return new Request().post('/getBoardAll', {order : payload})
}

function searchBoard(payload) {
    return axios.post('/searchBoard', {title: payload})
}

function updateHitBoard(payload){
    return axios.post('/updateHitBoard', payload)
}


//BoardDetails.vue
function getOneMember(payload){
    return axios.post('/getOneMember', {member_id: payload})
}

function getOneFile(payload){
    return axios.post('/getOneFile', {file_idx: payload})
}

function getBoardById(payload){
    return axios.post('/getBoardById', {id: payload})
}

function deleteBoard(payload){
    return axios.post('/deleteBoard', {'id': payload})
}

function updateRecommendBoard(payload){
    return axios.post('/updateRecommendBoard', payload)
}

function getCommentByBoard(payload){
    return axios.post('/getCommentByBoard', {id: payload});
}

function addComment(payload){
    return axios.post('/addComment', payload);
}

function deleteComment(payload){
    return axios.post('/deleteComment', {comment_idx : payload});
}

function recommendUpDown(payload){
    return axios.post('/recommendUpDown', payload);
}

//BoardModify.vue
function updateBoard(payload){
    return axios.post('/updateBoard', payload)
}


//BoardWrite.vue
function addBoard(payload){
    return axios.post('/addBoard', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Join.vue
function tempImg(payload){
    return axios.post('/tempImg', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}

function joinMember(payload){
    return axios.post("/joinMember", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Login.vue
function loginMember(payload){
    return axios.post("/loginMember", payload)
}

function joinOut(payload){
    return axios.post('/joinOut', payload)
}

function memberUpdate(payload){
    return axios.post("/memberUpdate", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
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