<script lang="ts" setup>
import { Tree } from "ant-design-vue";
import type { AntTreeNodeDropEvent } from "ant-design-vue/es/tree";
import type { TreeProps } from "ant-design-vue/es/vc-tree";
import type { Key } from "ant-design-vue/es/vc-tree/interface";
import { TooltipIconButton } from "./tooltip-icon-button";
import { FixedTreeType } from ".";
import { SvgIcon } from "@/components/svg-icon";

defineProps<{
  checkedKeys: Key[];
  treeData: TreeProps["treeData"];
  fixedType: FixedTreeType;
  title: string;
}>();

defineEmits<{
  drop: [e: AntTreeNodeDropEvent];
  "update:checkedKeys": [keys: Key[]];
  fixedLeft: [key: Key];
  fixedRight: [key: Key];
  unfixed: [key: Key];
}>();
</script>

<template>
  <div class="tree-wrapper">
    <div class="tree-title" v-if="title">{{ title }}</div>
    <Tree
      :selectable="false"
      :checkedKeys="checkedKeys"
      checkable
      draggable
      blockNode
      showIcon
      :treeData="treeData"
      @drop="$emit('drop', $event)"
      @update:checkedKeys="$emit('update:checkedKeys', $event)"
    >
      <template #title="item">
        <div class="custome-tree-title">
          <span class="title">
            {{ item.title }}
          </span>

          <span class="actions" @click.stop>
            <TooltipIconButton
              v-if="fixedType !== FixedTreeType.LEFT"
              tip="固定在列首"
              @click="$emit('fixedLeft', item.key)"
            >
              <SvgIcon type="vertical-align-top"></SvgIcon>
            </TooltipIconButton>

            <TooltipIconButton
              v-if="fixedType !== FixedTreeType.UNFIXED"
              tip="不固定"
              @click="$emit('unfixed', item.key)"
            >
              <SvgIcon type="vertical-align-middle"></SvgIcon>
            </TooltipIconButton>

            <TooltipIconButton
              v-if="fixedType !== FixedTreeType.RIGHT"
              tip="固定在列尾"
              @click="$emit('fixedRight', item.key)"
            >
              <SvgIcon type="vertical-align-bottom"></SvgIcon>
            </TooltipIconButton>
          </span>
        </div>
      </template>
    </Tree>
  </div>
</template>

<style scoped lang="less">
.tree-wrapper {
  font-weight: normal;
  .tree-title {
    font-size: 12px;
    opacity: 0.6;
    margin: 6px 0 6px 32px;
  }
  :deep(.ant-tree) {
    .ant-tree-checkbox {
      margin-block-start: 0;
    }
    .ant-tree-treenode {
      padding-left: 4px;
      padding-right: 4px;
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
