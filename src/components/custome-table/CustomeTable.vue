<script lang="ts" setup>
import {
  Button,
  Dropdown,
  Menu,
  Table,
  Tooltip,
  type TableColumnsType,
  type TableProps,
} from "ant-design-vue";
import { SvgIcon } from "@/components/svg-icon";
import { TableShrinkType, useTableShrink } from "./useTableShrink";
import { usetableSelect } from "./useTableSelect";

defineProps<{
  columns: TableColumnsType;
  dataSource: TableProps["dataSource"];
  title: string;
  loading: boolean;
  // selectedRowKeys: (string | number)[];
}>();

defineEmits<{
  create: [];
  refresh: [];
}>();

const tableShrink = useTableShrink();
const tableSelect = usetableSelect();
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

        <Tooltip title="刷新">
          <Button type="text">
            <template #icon>
              <SvgIcon type="refresh"></SvgIcon>
            </template>
          </Button>
        </Tooltip>

        <Dropdown trigger="click">
          <template #overlay>
            <Menu
              style="width: 6em"
              :selectedKeys="[tableShrink.activeKey]"
              :items="tableShrink.menuItems"
              @click="tableShrink.onClick($event.key as TableShrinkType)"
            ></Menu>
          </template>
          <Tooltip title="密度">
            <Button type="text">
              <template #icon>
                <SvgIcon type="shrink"></SvgIcon>
              </template>
            </Button>
          </Tooltip>
        </Dropdown>

        <Tooltip title="列设置">
          <Button type="text">
            <template #icon>
              <SvgIcon type="gearwheel"></SvgIcon>
            </template>
          </Button>
        </Tooltip>
      </div>
    </div>

    <Table
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :size="tableShrink.activeKey"
      :loading="loading"
      :rowSelection="{
        selectedRowKeys: tableSelect.selectedKeys,
        onChange: tableSelect.onSelect,
      }"
    >
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
