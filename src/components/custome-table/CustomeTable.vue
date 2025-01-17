<script lang="ts" setup>
import {
  Button,
  Table,
  type TableColumnsType,
  type TableProps,
} from "ant-design-vue";
import { SvgIcon } from "@/components/svg-icon";

defineProps<{
  columns: TableColumnsType;
  dataSource: TableProps["dataSource"];
  title: string;
}>();
</script>

<template>
  <div class="custome-table">
    <div class="table-title-wrapper">
      <span class="table-title">
        {{ title }}
      </span>

      <div class="action-wrapper">
        <Button type="primary">
          <template #icon>
            <SvgIcon type="plus"></SvgIcon>
          </template>
          新增
        </Button>

        <Button type="text">
          <template #icon>
            <SvgIcon type="refresh"></SvgIcon>
          </template>
        </Button>

        <Button type="text">
          <template #icon>
            <SvgIcon type="shrink"></SvgIcon>
          </template>
        </Button>

        <Button type="text">
          <template #icon>
            <SvgIcon type="gearwheel"></SvgIcon>
          </template>
        </Button>
      </div>
    </div>

    <Table :columns="columns" :dataSource="dataSource" size="small">
      <template #bodyCell="item">
        <slot name="bodyCell" v-bind="item"></slot>
      </template>
    </Table>
  </div>
</template>

<style lang="less" scoped>
.custome-table {
  .table-title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    .table-title {
      font-size: 16px;
      font-weight: 500;
    }
    .action-wrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }
  }
}
</style>
