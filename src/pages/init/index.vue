<template>
  <!-- 入口加载判断 -->
  <div class=""></div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'

// 页面周期函数--监听页面加载
onLoad(() => {
  // 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
  const launchFlag = uni.getStorageSync('launchFlag')
  // 是否有登录信息，判断是否已经登录
  const userAuth = uni.getStorageSync('userAuth')

  const userinfo: Object | {} = {
    id: 14,
    pid: 1,
    mobile: '18000000002',
    avatar: '',
    memberlevel: 3,
    status: 1,
    code: '14',
    create_time: '2022-08-26 15:36:24',
    balance: '247.44',
    is_auth: 1,
    usdt: '92.8117',
    yuebao: '700.00',
    type: 1,
    realname: '张三',
    memberlevel_name: '二星会员',
    usdt_conversion_cny: '612.55',
  }

  if (launchFlag) {
    if (userAuth) {
      // 如何已经登录，直接去home首页
      uni.switchTab({
        url: '/pages/home/index',
      })
    } else {
      uni.setStorage({
        key: 'userAuth',
        data: userinfo,
      })
      // 跳到登录注册页
      uni.redirectTo({
        url: '/pages/loginpage/login/index',
      })
    }
  } else {
    // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
    uni.setStorage({
      key: 'launchFlag',
      data: true,
    })
    // alert(6666)
    uni.redirectTo({
      url: '/pages/init/guide',
    })
  }
})
// // 页面周期函数--监听页面初次渲染完成
// onReady() { },
// // 页面周期函数--监听页面显示(not-nvue)
// onShow() { },
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

<style scoped></style>
