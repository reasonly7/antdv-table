<script lang="ts" setup>
import { Table, type TableColumnsType, type TableProps } from "ant-design-vue";

defineProps<{
  columns: TableColumnsType;
  dataSource: TableProps["dataSource"];
}>();
</script>

<template>
  <div>
    <div class="table-title"></div>
    <Table :columns="columns" :dataSource="dataSource">
      <template #bodyCell="item">
        <slot name="bodyCell" v-bind="item"></slot>
      </template>
    </Table>
  </div>
</template>

<style lang="less" scoped></style>
