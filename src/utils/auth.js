const TokenKey = "t";

// 获取token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

// 设置token
export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

// 删除token
export function removeToken() {
  localStorage.removeItem(TokenKey);
  // localStorage.removeItem("tabview");
  sessionStorage.clear();
  // localStorage.clear();
  // location.reload();
}
