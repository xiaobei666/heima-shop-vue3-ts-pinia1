<template>
  <view class="login-container">
    <!-- <uni-icons type="contact-filled" color="#afafaf" size="100" /> -->
    <!--  @getuserinfo="getUserInfo"-->
    <button class="btn-login" open-type="getUserInfo" @click="getResg">注 册</button>

    <button class="btn-login" open-type="getUserInfo" @click="getmuser">登 录</button>

    <view class="mgbox"></view>
    <!-- <text class="tips-text"> 登录后享受更多权益 </text> -->
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { postToken } from '@/api/my'
// import UniIcons from '@/components/uni-icons/uni-icons.vue'
// import { useAddress } from '@/store/address'
import { showMsg, useLogin, useUserProfile } from '@/utils/hooks'
const props = defineProps()
// const store = useAddress()
/* type Info={
  [keys:string]:unknown
  detail:UniApp.GetUserInfoRes
}

const getUserInfo=(info:Info)=>{
  if(info.detail.errMsg=='getUserInfo:fail auth deny')return showMsg('您取消了登录授权！')
  store.userInfo=info.detail.userInfo
  store.setUserInfo(info.detail.userInfo)

  getToken(info.detail)
} */

const getmuser = () => {
  uni.switchTab({
    url: '/pages/my/index',
  })
}
const getUserProfile = async () => {
  const detail = await useUserProfile({
    desc: '登录',
  })
  if (detail.errMsg == 'getUserProfile:fail auth deny') return showMsg('您取消了登录授权！')
  store.userInfo = detail.userInfo
  store.setUserInfo(detail.userInfo)
  getToken(detail)
}

const getToken = async (detail: UniApp.GetUserProfileRes) => {
  try {
    const res = await useLogin()
    if (res.errMsg != 'login:ok') return showMsg('登录失败！')
    const query = {
      code: res.code,
      encryptedData: detail.encryptedData,
      rawData: detail.rawData,
      iv: detail.iv,
      signature: detail.signature,
    }
    try {
      const data = await postToken(query)
      //if (data.meta.status != 200) return showMsg(data.meta.msg);
      showMsg('登录成功')
      store.token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      uni.setStorageSync('token', store.token)
      //判断是否有重定向信息，如果有就重定向
      if (store.redirectInfo && store.redirectInfo.openType == 'switchTab') {
        uni.switchTab({
          url: store.redirectInfo.from,
          //跳转之后得清除不然下次登录会跳转
          success: (success) => {
            store.redirectInfo = undefined
          },
        })
      }
    } catch (error) {
      showMsg('出现未知错误')
    }
  } catch (error) {
    showMsg('登录失败！')
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  height: 100%;
  background: url('@/static/bg_imgs/startpage.png') center center no-repeat;
  background-size: cover;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
  .btn-login {
    // background-color: #c00000;
    border-radius: 100px;
    width: 70%;
    margin: 23rpx 0;
    color: #5259d8;
    font-size: 30rpx;
  }
  .mgbox {
    height: 117rpx;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
  //设置末尾半椭圆
  // &::after {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 96rpx;
  //   background-color: white;
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   border-radius: 100%;
  //   transform: translate(0, 50%);
  // }
}
</style>
