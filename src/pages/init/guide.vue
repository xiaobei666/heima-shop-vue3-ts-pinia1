<template>
  <view id="guide">
    <video
      id="video"
      src="@/static/bg_imgs/startpage_video.mp4"
      :direction="6"
      :loop="true"
      :autoplay="true"
      :controls="false"
      :show-play-btn="false"
      :show-center-play-btn="false"
      :enable-progress-gesture="false"
      objectFit="fill"
      @timeupdate="timeupdate"
      @ended="goIndex"
    ></video>
    <!-- <cover-view @click="goIndex">立即体验</cover-view> -->
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'

// 页面周期函数--监听页面加载

// // 页面周期函数--监听页面显示(not-nvue)
onShow(() => {
  // 或许video的播放属性
  let videoContext = uni.createVideoContext('video', this)
  videoContext.play()
})

const timeupdate = (event) => {
  uni.getSystemInfo({
    success: (data) => {
      if (data.platform == 'ios') {
        if (event.detail) {
          event.detail.diff = event.detail.duration - event.detail.currentTime
          if (event.detail.diff < 0.4) {
            goIndex()
          }
        }
      }
    },
  })
}
// 立即跳转
const goIndex = () => {
  uni.switchTab({
    url: '/pages/home/index',
  })
}
// // 页面周期函数--监听页面初次渲染完成
// onReady() { },

// // 页面周期函数--监听页面隐藏
// onHide() { },
// // 页面周期函数--监听页面卸载
// onUnload() { },
// // 页面处理函数--监听用户下拉动作
// // onPullDownRefresh() { uni.stopPullDownRefresh(); },
// // 页面处理函数--监听用户上拉触底
// // onReachBottom() {},
// // 页面处理函数--监听页面滚动(not-nvue)
// // onPageScroll(event) {},
// // 页面处理函数--用户点击右上角分享
// // onShareAppMessage(options) {},
</script>

<style lang="scss" scoped>
view {
  width: 100%;
  height: 1200px;
  uni-video {
    width: 100%;
    height: 100%;
  }
}
</style>
