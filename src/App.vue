<script lang="ts" setup>
import { ConfigProvider, DatePicker } from "ant-design-vue";
import zhCN from "ant-design-vue/locale/zh_CN";
import { locale } from "dayjs";
import "dayjs/locale/zh-cn";

locale("zh-cn");
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <DatePicker></DatePicker>
  </ConfigProvider>
</template>
