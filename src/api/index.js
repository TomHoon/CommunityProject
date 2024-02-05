import axios from 'axios';
import { setInterceptors } from '@/api/common/interceptors'

// class Request {
//     constructor() {
//     }
//     get(url, param) {
//         setInterceptors();
//         return axios.get(url, param)
//     }
//     post(url, param) {
//         return axios.post(url,param)
//     }
// }

function createInstance() {
  const instance = axios.create({
  });
  return setInterceptors(instance);
}

const instance = createInstance();

//axios 기본형
//axios.post('/getBoardAll', { order : 0 })

// const newInterceptors = setInterceptors()

function getBoardAll(payload) {
  return instance.post('/getBoardAll', {order : payload})
}

function searchBoard(payload) {
  return instance.post('/searchBoard', {title: payload})
}

function updateHitBoard(payload){
  return instance.post('/updateHitBoard', payload)
}

function sendList(payload){
  return instance.post('/sendList', payload)
}
function recvList(payload){
  return instance.post('/recvList', payload)
}
function findOneNote(payload){
  return instance.post('/findOneNote', {note_idx:payload})
}
function updateReadDate(payload){
  return instance.post('/updateReadDate', {note_idx:payload})
}
function deleteRecv(payload){
  return instance.post('/deleteRecv', {note_idx:payload})
}
function deleteSend(payload){
  return instance.post('/deleteSend', {note_idx:payload})
}
function insertNote(payload){
  return instance.post('/insertNote', payload)
}
function findIdNote(payload){
  return instance.post('/findIdNote', payload)
}
function countReadYN(payload){
  return instance.post('/countReadYN', {note_idx:payload})
}
function countRecv(payload){
  return instance.post('/countRecv', {note_idx:payload})
}
function countSend(payload){
  return instance.post('/countSend', {note_idx:payload})
}
function sendListChk(payload){
  return instance.post('/sendListChk', payload)
}


//BoardDetails.vue
function getOneMember(payload){
  return instance.post('/getOneMember', {member_id: payload})
}

function getOneFile(payload){
  return instance.post('/getOneFile', {file_idx: payload})
}

function getBoardById(payload){
  return instance.post('/getBoardById', {id: payload})
}

function deleteBoard(payload){
  return instance.post('/deleteBoard', {'id': payload})
}

function updateRecommendBoard(payload){
  return instance.post('/updateRecommendBoard', payload)
}

function getCommentByBoard(payload){
  return instance.post('/getCommentByBoard', {id: payload});
}

function addComment(payload){
  return instance.post('/addComment', payload);
}

function deleteComment(payload){
  return instance.post('/deleteComment', {comment_idx : payload});
}

function recommendUpDown(payload){
  return instance.post('/recommendUpDown', payload);
}

//BoardModify.vue
function updateBoard(payload){
  return instance.post('/updateBoard', payload);
}


//BoardWrite.vue
function addBoard(payload){
  return instance.post('/addBoard', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Join.vue
function tempImg(payload){
  return instance.post('/tempImg', payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}

function joinMember(payload){
  return instance.post("/joinMember", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}


//Login.vue
function loginMember(payload){
  return instance.post("/loginMember", payload)
}

function joinOut(payload){
  return instance.post('/joinOut', payload)
}

function memberUpdate(payload){
  return instance.post("/memberUpdate", payload, { headers: { 'Content-Type': 'multipart/form-data' } } )
}

//admin
function getMemberAll(){
  return instance.get("/getMemberAll")
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
  sendList,
  recvList,
  findOneNote,
  updateReadDate,
  deleteRecv,
  deleteSend,
  insertNote,
  findIdNote,
  countReadYN,
  getMemberAll,
  countRecv,
  countSend,
  sendListChk,
  // Request,
}