import fetch from "@/utils/http";

export function getWxConfig(data: object): any {
  return fetch({
    url: "/api/third/wx/wx_jssdk",
    method: "get",
    data
  });
}
