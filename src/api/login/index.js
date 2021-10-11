import request from "@/utils/request";

// 举例
export function loginApi(data) {
  return request({
    url: "/admin/usermgr/v1.0.0/login",
    method: "post",
    data
  });
}

export function getCodeApi() {
  return request({
    url: "/admin/usermgr/v1.0.0/codeImg",
    method: "get"
  });
}
