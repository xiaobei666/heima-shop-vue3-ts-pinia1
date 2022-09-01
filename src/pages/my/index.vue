<template>
  <my-user-info class="my-user-container" />
  <!-- <my-login v-else /> -->
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import MyLogin from '@/components/my-login/index.vue'
import MyUserInfo from '@/components/my-userInfo/index.vue'
import { useAddress } from '@/store/address'
import { useSetBadge } from '@/utils/hooks'
useSetBadge()

const { token } = storeToRefs(useAddress())
</script>

<style lang="less" scoped></style>
