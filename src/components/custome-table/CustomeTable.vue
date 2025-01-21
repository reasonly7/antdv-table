<script lang="ts" setup>
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Menu,
  Popover,
  Table,
  Tooltip,
  type TableProps,
} from "ant-design-vue";
import { SvgIcon } from "@/components/svg-icon";
import { TableShrinkType, useTableShrink } from "./useTableShrink";
import { useColumnsSetup, type CustomeTableColumnType, type RowKey } from ".";
import { computed } from "vue";
import type { TableRowSelection } from "ant-design-vue/es/table/interface";
import { ColumnDraggableTree, FixedTreeType } from "./column-draggable-tree";

const props = defineProps<{
  columns: CustomeTableColumnType[];
  dataSource: TableProps["dataSource"];
  title: string;
  loading: boolean;
  selectedRowKeys?: RowKey[];
  pagination?: TableProps["pagination"];
}>();

const emits = defineEmits<{
  create: [];
  refresh: [];
  "update:selectedRowKeys": [keys: RowKey[]];
}>();

const tableShrink = useTableShrink();
const columnsSetup = useColumnsSetup(() => props.columns);

const rowSelection = computed(() => {
  return !props.selectedRowKeys
    ? undefined
    : ({
        selectedRowKeys: props.selectedRowKeys,
        onChange: (keys: RowKey[]) => emits("update:selectedRowKeys", keys),
      } satisfies TableRowSelection);
});
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
          <Button type="text" @click="emits('refresh')">
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

        <Popover
          trigger="click"
          placement="bottomRight"
          :arrow="false"
          overlayClassName="table-columns-setup"
        >
          <template #title>
            <Flex justify="space-between" align="center" class="header-wrapper">
              <Checkbox>列展示</Checkbox>
              <a
                href="javascript:void(0)"
                class="reset-btn"
                @click="columnsSetup.resetColumns()"
              >
                重置
              </a>
            </Flex>
          </template>
          <template #content>
            <main class="tree-wrapper">
              <ColumnDraggableTree
                v-if="columnsSetup.leftFixedColumns.length"
                title="固定在左侧"
                :fixedType="FixedTreeType.LEFT"
                :treeData="columnsSetup.leftFixedColumns"
                v-model:checkedKeys="columnsSetup.leftFixedCheckedKeys"
                @drop="columnsSetup.onLeftFixedDrop"
                @fixedRight="
                  columnsSetup.onClickFixedRight(
                    $event,
                    columnsSetup.leftFixedColumns,
                  )
                "
                @unfixed="
                  columnsSetup.onClickUnfixed(
                    $event,
                    columnsSetup.leftFixedColumns,
                  )
                "
              >
              </ColumnDraggableTree>

              <ColumnDraggableTree
                v-if="columnsSetup.unfixedColumns.length"
                :title="
                  columnsSetup.leftFixedColumns.length ||
                  columnsSetup.rightFixedColumns.length
                    ? '不固定'
                    : ''
                "
                :fixedType="FixedTreeType.UNFIXED"
                :treeData="columnsSetup.unfixedColumns"
                v-model:checkedKeys="columnsSetup.unfixedCheckedKeys"
                @drop="columnsSetup.onUnfixedDrop"
                @fixedLeft="
                  columnsSetup.onClickFixedLeft(
                    $event,
                    columnsSetup.unfixedColumns,
                  )
                "
                @fixedRight="
                  columnsSetup.onClickFixedRight(
                    $event,
                    columnsSetup.unfixedColumns,
                  )
                "
              >
              </ColumnDraggableTree>

              <ColumnDraggableTree
                v-if="columnsSetup.rightFixedColumns.length"
                title="固定在右侧"
                :fixedType="FixedTreeType.RIGHT"
                :treeData="columnsSetup.rightFixedColumns"
                v-model:checkedKeys="columnsSetup.rightFixedCheckedKeys"
                @drop="columnsSetup.onRightFixedDrop"
                @fixedLeft="
                  columnsSetup.onClickFixedLeft(
                    $event,
                    columnsSetup.rightFixedColumns,
                  )
                "
                @unfixed="
                  columnsSetup.onClickUnfixed(
                    $event,
                    columnsSetup.rightFixedColumns,
                  )
                "
              >
              </ColumnDraggableTree>
            </main>
          </template>

          <Tooltip title="列设置">
            <Button type="text">
              <template #icon>
                <SvgIcon type="gearwheel"></SvgIcon>
              </template>
            </Button>
          </Tooltip>
        </Popover>
      </div>
    </div>

    <Table
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :size="tableShrink.activeKey"
      :loading="loading"
      :rowSelection="rowSelection"
      :pagination="pagination"
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

<style lang="less">
.table-columns-setup {
  width: 240px;
  .ant-popover-inner {
    padding: 12px 8px;
  }
  .header-wrapper {
    height: 32px;
    padding: 0 4px;
    .reset-btn {
      font-weight: normal;
    }
  }
}
</style>
