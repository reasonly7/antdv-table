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
  Tree,
  type TableProps,
} from "ant-design-vue";
import { SvgIcon } from "@/components/svg-icon";
import { TableShrinkType, useTableShrink } from "./useTableShrink";
import { useColumnsSetup, type CustomeTableColumnType, type RowKey } from ".";
import { computed } from "vue";
import type { TableRowSelection } from "ant-design-vue/es/table/interface";

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
              <a href="javascript:void(0)" class="reset-btn"> 重置 </a>
            </Flex>
          </template>
          <template #content>
            <main class="tree-wrapper">
              <Tree
                :selectable="false"
                checkable
                draggable
                blockNode
                showIcon
                :treeData="columnsSetup.columns"
                @drop="columnsSetup.onDrop"
              >
                <template #title="item">
                  <div class="custome-tree-title">
                    <span class="title">
                      {{ item.title }}
                    </span>
                    <span class="actions" @click.stop>
                      <a href="javascript:void(0)">
                        <SvgIcon type="vertical-align-top"></SvgIcon>
                      </a>
                      <a href="javascript:void(0)">
                        <SvgIcon type="vertical-align-bottom"></SvgIcon>
                      </a>
                    </span>
                  </div>
                </template>
              </Tree>
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
      :columns="columnsSetup.columns"
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
  .header-wrapper {
    height: 32px;
    .reset-btn {
      font-weight: normal;
    }
  }
  .tree-wrapper {
    padding-top: 8px;
    font-weight: normal;
    .ant-tree-checkbox {
      margin-block-start: 0;
    }
    .ant-tree-switcher {
      display: none;
    }
    .custome-tree-title {
      display: flex;
      align-items: center;
      .title {
        flex: 1;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: grab;
        &:active {
          cursor: grabbing;
        }
      }
      .actions {
        align-items: center;
        gap: 8px;
        cursor: pointer;
        display: none;
      }
      &:hover {
        .actions {
          display: flex;
        }
      }
    }
  }
}
</style>
