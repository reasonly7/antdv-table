<script lang="ts" setup>
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/locale/zh_CN";
import { locale } from "dayjs";
import "dayjs/locale/zh-cn";
import { CustomeTable } from "./components/custome-table";

locale("zh-cn");
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <CustomeTable></CustomeTable>
  </ConfigProvider>
</template>
