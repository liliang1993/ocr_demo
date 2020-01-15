import Apis from "@/apis";
import wx from "weixin-js-sdk";
import { Dialog } from "vant";

const { getWxConfig: getWxConfigApi } = Apis;
// console.log("apis", Apis.getWxConfig);
export const getWxConfig = function() {
  let params = {
    url: window.location.href
  };
  getWxConfigApi(params).then(res => {
    const { appId, timestamp, nonceStr, signature } = res.wx_config;
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ["chooseImage", "previewImage", "uploadImage", "downloadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.error(function(res) {
      Dialog.alert({
        message: res
      });
    });
    // console.log(res);
  });
};
