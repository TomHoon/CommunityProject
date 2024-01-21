function saveAuthToCookie(value) {
  document.cookie = `token=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `id=${value}`;
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)comhub_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)comhub_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

//function deleteCookie(value) {
//  const expirationDate = new Date();
//  expirationDate.setTime(expirationDate.getTime() - 10 * 1000); // 테스트용 10초
  //expirationDate.setTime(expirationDate.getTime() - 30 * 60 * 1000); // 현재 시간에서 30분 뺀 시간을 설정

//  document.cookie = `${value}=; expires=${expirationDate.toUTCString()};`;
//}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};
