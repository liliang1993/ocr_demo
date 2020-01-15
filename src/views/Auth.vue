<template>
  <div>
    <van-button type="info" @click="uploadIDCard">拍摄身份证</van-button>
    <img :src="base64Img" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Icon, CellGroup, Cell } from "vant";
import wx from "weixin-js-sdk";
import Apis from "@/apis";
const { postOCRIdcard } = Apis;

@Component({
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  }
})
export default class Auth extends Vue {
  base64Img: any = "";

  created() {
    (this as any).$getWxConfig();
    this.postOCRIdcard();
  }

  uploadIDCard() {
    let _this = this;
    wx.ready(() => {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let localIds = res.localIds;
          _this.urlTobase64(localIds);
        }
      });
    });
  }

  urlTobase64(url) {
    let _this = this;
    wx.getLocalImgData({
      localId: url[0], //图片的本地ID
      success: function(res) {
        var localData = res.localData;
        if (localData.indexOf("data:image") != 0) {
          //判断是否有这样的头部
          localData = "data:image/jpeg;base64," + localData;
        }
        _this.base64Img = localData
          .replace(/\r|\n/g, "")
          .replace("data:image/jpg", "data:image/jpeg"); // 此处的localData 就是你所需要的base64位
        console.log("base64Img", _this.base64Img);
        _this.postOCRIdcard();
      }
    });
  }

  postOCRIdcard() {
    let params = {
      image: this.base64Img,
      configure: JSON.stringify({
        side: "face"
      })
    };
    postOCRIdcard(params)
      .then(res => {
        console.log("res1", res);
      })
      .catch(err => {});
  }
}
</script>
