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

//Board.vue
function getBoardAll(payload) {
  return axios.post('/getBoardAll', {order : payload})
}

function searchBoard(payload) {
  return axios.post('/searchBoard', {title: payload})
}

function updateHitBoard(payload){
  return axios.post('/updateHitBoard', payload)
}

function sendList(payload){
  return axios.post('/sendList', payload)
}

function recvList(payload){
  return axios.post('/recvList', payload)
}

function findOneNote(payload){
  return axios.post('/findOneNote', {note_idx:payload})
}

function updateReadDate(payload){
  return axios.post('/updateReadDate', {note_idx:payload})
}

function deleteRecv(payload){
  return axios.post('/deleteRecv', {note_idx:payload})
}

function deleteSend(payload){
  return axios.post('/deleteSend', {note_idx:payload})
}

function insertNote(payload){
  return axios.post('/insertNote', payload)
}

function findIdNote(payload){
  return axios.post('/findIdNote', payload)
}

function countReadYN(payload){
  return axios.post('/countReadYN', {note_idx:payload})
}

function countRecv(payload){
  return axios.post('/countRecv', {note_idx:payload})
}

function countSend(payload){
  return axios.post('/countSend', {note_idx:payload})
}

function sendListChk(payload){
  return axios.post('/sendListChk', payload)
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
  return instance.post('/addComment', payload);
}

function deleteComment(payload){
  return axios.post('/deleteComment', {comment_idx : payload});
}

function recommendUpDown(payload){
  return axios.post('/recommendUpDown', payload);
}

//BoardModify.vue
function updateBoard(payload){
  return axios.post('/updateBoard', payload);
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

//admin
function getMemberAll(){
  return axios.get("/getMemberAll")
}

//all
function checkToken(id,token) {
  return axios.post('/checkToken', {id:id, token:token})
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
  checkToken,
  // Request,
}