<template>
  <view class="center">
    <uni-sign-in ref="signIn" />
    <view
      class="userInfo"
      @click.capture="toUserInfo"
    >
      <cloud-image
        v-if="userInfo.avatar_file&&userInfo.avatar_file.url"
        width="150rpx"
        height="150rpx"
        :src="userInfo.avatar_file.url"
      />
      <image
        v-else
        class="logo-img"
        src="@/static/uni-center/defaultAvatarUrl.png"
      />
      <view class="logo-title">
        <text
          v-if="hasLogin"
          class="uer-name"
        >
          {{ userInfo.nickname||userInfo.username||userInfo.mobile }}
        </text>
        <text
          v-else
          class="uer-name"
        >
          {{ $t('mine.notLogged') }}
        </text>
      </view>
    </view>
    <uni-grid
      class="grid"
      :column="4"
      :show-border="false"
      :square="true"
    >
      <uni-grid-item
        v-for="(item,index) in gridList"
        :key="index"
        class="item"
        @click.native="tapGrid(index)"
      >
        <uni-icons
          class="icon"
          color="#007AFF"
          :type="item.icon"
          size="26"
        />
        <text class="text">
          {{ item.text }}
        </text>
      </uni-grid-item>
    </uni-grid>
    <uni-list
      v-for="(sublist , index) in ucenterList"
      :key="index"
      class="center-list"
    >
      <uni-list-item
        v-for="(item,i) in sublist"
        :key="i"
        :title="item.title"
        link
        :right-text="item.rightText"
        :clickable="true"
        :to="item.to"
        :show-extra-icon="true"
        :extra-icon="{type:item.icon,color:'#999'}"
        @click="ucenterListClick(item)"
      >
        <template #footer>
          <view
            v-if="item.showBadge"
            class="item-footer"
          >
            <text class="item-footer-text">
              {{ item.rightText }}
            </text>
            <view class="item-footer-badge" />
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<!-- <script>
export default {
  name: "ucenter",
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}

</script> -->


<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	// import checkUpdate from '@/components/uni-upgrade-center-app/utils/check-update';
	// import callCheckVersion from '@/components/uni-upgrade-center-app/utils/call-check-version';
	// #ifdef APP
	// import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	// const uniShare = new UniShare()
	// #endif
	// const db = uniCloud.database();
	export default {
		// #ifdef APP
		onBackPress({from}) {
			if(from == 'backbutton') {
				this.$nextTick(function() {
					uniShare.hide()
				})
				return uniShare.isShow
			}
		},
		// #endif
		data() {
			return {
				gridList: [{
						"text": this.$t('mine.showText'),
						"icon": "chat"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "cloud-upload"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "contact"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "download"
					}
				],
				ucenterList: [
					[
						// #ifdef APP-PLUS
						{
							"title": this.$t('mine.signInByAd'),
							"event": 'signInByAd',
							"icon": "compose"
						},
						// #endif
						{
							"title": this.$t('mine.signIn'),
							"event": 'signIn',
							"icon": "compose"
						},
						// #ifdef APP-PLUS
						{
							"title": this.$t('mine.toEvaluate'),
							"event": 'gotoMarket',
							"icon": "hand-thumbsup"
						},
						//#endif
						{
							"title":this.$t('mine.readArticles'),
							"to": '/pages/ucenter/read-news-log/read-news-log',
							"icon": "flag"
						},
						{
							"title": this.$t('mine.myScore'),
							"to": '',
							"event": 'getScore',
							"icon": "paperplane"
						}
						// #ifdef APP-PLUS
						, {
							"title": this.$t('mine.invite'),
							"event": 'share',
							"icon": "redo"
						}
						// #endif
					],
					[{
						"title": this.$t('mine.feedback'),
						"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
						"icon": "help"
					}, {
						"title": this.$t('mine.settings'),
						"to": '/pages/ucenter/settings/settings',
						"icon": "gear"
					}],
					[{
						"title": this.$t('mine.about'),
						"to": '/pages/ucenter/about/about',
						"icon": "info"
					}]
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		onLoad() {
			// console.log(313,this.userInfo,this.hasLogin);
			//#ifdef APP-PLUS
			// this.ucenterList[this.ucenterList.length - 2].unshift({
			// 	title:this.$t('mine.checkUpdate'),// this.this.$t('mine.checkUpdate')"检查更新"
			// 	rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
			// 	event: 'checkVersion',
			// 	icon: 'loop',
			// 	showBadge: this.appVersion.hasNew
			// })
			//#endif
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			signIn() { //普通签到
				this.$refs.signIn.open()
			},
			signInByAd() { //看激励视频广告签到
				this.$refs.signIn.showRewardedVideoAd()
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]()
				}
			},
			// async checkVersion() {
			// 	let res = await callCheckVersion()
			// 	console.log(res);
			// 	if (res.result.code > 0) {
			// 		// checkUpdate()
			// 	} else {
			// 		uni.showToast({
			// 			title: res.result.message,
			// 			icon: 'none'
			// 		});
			// 	}
			// },
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			tapGrid(index) {
				uni.showToast({
					// title: '你点击了，第' + (index + 1) + '个',
					title: this.$t('mine.clicked') + " " + (index + 1) ,
					icon: 'none'
				})
			},
			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					const appstoreid = this.appConfig.marketId.ios // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8')
				}
				if (uni.getSystemInfoSync().platform == "android") {
					const Uri = plus.android.importClass("android.net.Uri")
					const uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android)
					const Intent = plus.android.importClass('android.content.Intent')
					const intent = new Intent(Intent.ACTION_VIEW, uri)
					const main = plus.android.runtimeMainActivity()
					main.startActivity(intent)
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: this.$t('mine.checkScore'),
					icon: 'none'
				})
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores")
					.where('"user_id" == $env.uid')
					.field('score,balance')
					.orderBy("create_date", "desc")
					.limit(1)
					.get()
					.then((res) => {
						console.log(res)
						const data = res.result.data[0]
						let msg = ''
						msg = data ? (this.$t('mine.currentScore') + data.balance) : this.$t('mine.noScore')
						uni.showToast({
							title: msg,
							icon: 'none'
						})
					})
.finally(() => {
						uni.hideLoading()
					})
			},
			async share() {
				const {
					result
				} = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'getUserInviteCode'
					}
				})
				console.log(result)
				const myInviteCode = result.myInviteCode || result.userInfo.my_invite_code
				console.log(myInviteCode)
				const {
					appName,
					logo,
					company,
					slogan
				} = this.appConfig.about
				// #ifdef APP-PLUS
				uniShare.show({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.appConfig.h5.url +
							`/#/pages/ucenter/invite/invite?code=uniInvitationCode:${myInviteCode}`,
						title: appName,
						summary: slogan,
						imageUrl: logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": this.$t('common.wechatFriends'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": this.$t('common.wechatBbs'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": this.$t('common.weibo'),
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": this.$t('common.copy'),
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": this.$t('common.more'),
							"share": "shareSystem"
						}
					],
					cancelText: this.$t('common.cancelShare'),
				}, e => { //callback
					console.log(e)
				})
				// #endif
			}
		}
	}
</script>


<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}
	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		padding: 20rpx;
		padding-top: 50px;
		background-image: url(../../static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.uer-name {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #007AFF;
		height: 40rpx;
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 16px;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list ::v-deep .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list ::v-deep .uni-list--border-top,
	.center-list ::v-deep .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>