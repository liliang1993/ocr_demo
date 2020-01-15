import fetch from "@/utils/http";

export function postOCRIdcard(data: object): any {
  return fetch({
    baseURL: "",
    url: "/aliyun/rest/160601/ocr/ocr_idcard.json",
    method: "post",
    headers: {
      post: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      Authorization: "APPCODE b1dc925d118f40289841cc06bf02fe9a"
    },
    data
  });
}
