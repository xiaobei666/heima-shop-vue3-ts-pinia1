<template>
  <view class="uni-breadcrumb-item">
    <view
      :class="{
        'uni-breadcrumb-item--slot': true,
        'uni-breadcrumb-item--slot-link': to && currentPage !== to.path
      }"
      @click="navTo"
    >
      <slot />
    </view>
    <i
      v-if="separatorClass"
      class="uni-breadcrumb-item--separator"
      :class="separatorClass"
    />
    <text
      v-else
      class="uni-breadcrumb-item--separator"
    >
      {{ separator }}
    </text>
  </view>
</template>
<script>
	/**
	 * BreadcrumbItem 面包屑导航子组件
	 * @property {String/Object} to 路由跳转页面路径/对象
	 * @property {Boolean} replace 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录(仅 h5 支持）
	 */
	export default {
		inject: ['uniBreadcrumb'],
		props: {
			to: {
				type: [String, Object],
				default: ''
			}
		},
		data() {
			return {
				currentPage: ''
			}
		},
		computed: {
			separator() {
				return this.uniBreadcrumb.separator
			},
			separatorClass() {
				return this.uniBreadcrumb.separatorClass
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(val) {
					this.currentPage = val.path
				}
			}
		},
		methods: {
			navTo() {
				const {
					to,
					$router
				} = this
				if (this.currentPage === to.path) return
				if (to && $router) {
					this.replace ?
						$router.replace(to) :
						$router.push(to)

				}
			}
		}
	}
</script>
<style lang="scss">
	$uni-primary: #2979ff !default;
	$uni-base-color: #6a6a6a !default;
	$uni-main-color: #3a3a3a !default;
	.uni-breadcrumb-item {
		display: flex;
		align-items: center;
		white-space: nowrap;
		font-size: 14px;

		&--slot {
			color: $uni-base-color;
			padding: 0 10px;

			&-link {
				color: $uni-main-color;
				font-weight: bold;
				/* #ifndef APP-NVUE */
				cursor: pointer;
				/* #endif */

				&:hover {
					color: $uni-primary;
				}
			}
		}

		&--separator {
			font-size: 12px;
			color: $uni-base-color;
		}

		&:last-child &--separator {
			display: none;
		}
		&:first-child &--slot {
			padding-left: 0;
		}
	}
</style>
