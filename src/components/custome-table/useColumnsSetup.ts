import { toReactive } from "@vueuse/core";
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { CustomeTableColumnType, RowKey } from ".";
import { cloneDeep } from "lodash-es";
import type { AntTreeNodeDropEvent } from "ant-design-vue/es/tree";
import type { TreeProps } from "ant-design-vue/es/vc-tree";

type TreeDataItem = NonNullable<TreeProps["treeData"]>[number];

const dropHandler = (
  info: AntTreeNodeDropEvent,
  columns: CustomeTableColumnType[],
) => {
  if (!info.node.pos) {
    return [];
  }
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split("-");
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (
    data: CustomeTableColumnType[],
    key: RowKey,
    callback: (
      item: CustomeTableColumnType,
      index: number,
      data: CustomeTableColumnType[],
    ) => void,
  ) => {
    data?.forEach((item, index) => {
      if (item.key === key) {
        return callback(item, index, data);
      }
      // 暂不考虑嵌套的情况
      // if (item.children) {
      //   return loop(item.children, key, callback);
      // }
    });
  };

  // Find dragObject
  let dragObj: TreeDataItem;
  loop(columns, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });
  if (!info.dropToGap) {
    // 暂不考虑嵌套的情况
    // Drop on the content
    loop(columns, dropKey, (item: TreeDataItem) => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else if (
    (info.node.children || []).length > 0 && // Has children
    info.node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(columns, dropKey, (item: TreeDataItem) => {
      item.children = item.children || [];
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj);
    });
  } else {
    let ar: TreeProps["treeData"] = [];
    let i = 0;
    loop(columns, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj!);
    } else {
      ar.splice(i + 1, 0, dragObj!);
    }
  }

  return columns;
};

export const useColumnsSetup = (
  _fullColumns: MaybeRefOrGetter<CustomeTableColumnType[]>,
) => {
  const fullColumns = computed(() => toValue(_fullColumns));
  const leftFixedCheckedKeys = ref<RowKey[]>([]);
  const unfixedCheckedKeys = ref<RowKey[]>([]);
  const rightFixedCheckedKeys = ref<RowKey[]>([]);
  const leftFixedColumns = ref<CustomeTableColumnType[]>([]);
  const rightFixedColumns = ref<CustomeTableColumnType[]>([]);
  const unfixedColumns = ref<CustomeTableColumnType[]>([]);

  const resetColumns = () => {
    leftFixedCheckedKeys.value = [];
    unfixedCheckedKeys.value = fullColumns.value.map((column) => column.key);
    rightFixedCheckedKeys.value = [];

    leftFixedColumns.value = [];
    unfixedColumns.value = cloneDeep(fullColumns.value);
    rightFixedColumns.value = [];
  };

  watch(
    () => fullColumns.value,
    () => {
      resetColumns();
    },
    { immediate: true },
  );

  const onLeftFixedDrop = (info: AntTreeNodeDropEvent) => {
    leftFixedColumns.value = dropHandler(info, leftFixedColumns.value);
  };
  const onRightFixedDrop = (info: AntTreeNodeDropEvent) => {
    rightFixedColumns.value = dropHandler(info, rightFixedColumns.value);
  };
  const onUnfixedDrop = (info: AntTreeNodeDropEvent) => {
    unfixedColumns.value = dropHandler(info, unfixedColumns.value);
  };

  const fixedChangeHandler = (
    targetKey: RowKey,
    originColumns: CustomeTableColumnType[],
    targetColumns: CustomeTableColumnType[],
  ) => {
    const targetColumnIndex = originColumns.findIndex(
      (column) => column.key === targetKey,
    );
    if (targetColumnIndex === -1) {
      return;
    }
    targetColumns.push(originColumns[targetColumnIndex]);
    originColumns.splice(targetColumnIndex, 1);
  };

  const onClickFixedLeft = (
    targetKey: RowKey,
    columns: CustomeTableColumnType[],
  ) => {
    fixedChangeHandler(targetKey, columns, leftFixedColumns.value);
  };

  const onClickUnfixed = (
    targetKey: RowKey,
    columns: CustomeTableColumnType[],
  ) => {
    fixedChangeHandler(targetKey, columns, unfixedColumns.value);
  };

  const onClickFixedRight = (
    targetKey: RowKey,
    columns: CustomeTableColumnType[],
  ) => {
    fixedChangeHandler(targetKey, columns, rightFixedColumns.value);
  };

  return toReactive({
    leftFixedCheckedKeys,
    unfixedCheckedKeys,
    rightFixedCheckedKeys,

    leftFixedColumns,
    rightFixedColumns,
    unfixedColumns,

    resetColumns,

    onLeftFixedDrop,
    onUnfixedDrop,
    onRightFixedDrop,

    onClickFixedLeft,
    onClickUnfixed,
    onClickFixedRight,
  });
};
