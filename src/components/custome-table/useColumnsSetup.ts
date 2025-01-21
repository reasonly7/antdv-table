import { toReactive } from "@vueuse/core";
import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import type { CustomeTableColumnType, RowKey } from ".";
import { cloneDeep } from "lodash-es";
import type { AntTreeNodeDropEvent } from "ant-design-vue/es/tree";
import type { TreeProps } from "ant-design-vue/es/vc-tree";

type TreeDataItem = NonNullable<TreeProps["treeData"]>[number];

export const useColumnsSetup = (
  fullColumns: MaybeRefOrGetter<CustomeTableColumnType[]>,
) => {
  const leftFixedColumns = ref<RowKey[]>([]);
  const rightFixedColumns = ref<RowKey[]>([]);
  const hiddenColumns = ref<RowKey[]>([]);

  const columns = computed(() => {
    const clonedFullColumns = cloneDeep(toValue(fullColumns));
    return clonedFullColumns;
  });

  const onDrop = (info: AntTreeNodeDropEvent) => {
    if (!info.node.pos) {
      throw new Error("info.node.pos 不存在");
    }
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (
      data: TreeProps["treeData"],
      key: string | number,
      callback: any,
    ) => {
      data?.forEach((item, index) => {
        if (item.key === key) {
          return callback(item, index, data);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = cloneDeep(toValue(fullColumns));

    // Find dragObject
    let dragObj: TreeDataItem;
    loop(
      data,
      dragKey,
      (
        item: TreeDataItem,
        index: number,
        arr: NonNullable<TreeProps["treeData"]>,
      ) => {
        arr.splice(index, 1);
        dragObj = item;
      },
    );
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: TreeDataItem) => {
        item.children = item.children || [];
        /// where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: TreeDataItem) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeProps["treeData"] = [];
      let i = 0;
      loop(
        data,
        dropKey,
        (_item: TreeDataItem, index: number, arr: TreeProps["treeData"]) => {
          ar = arr;
          i = index;
        },
      );
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj!);
      } else {
        ar.splice(i + 1, 0, dragObj!);
      }
    }

    console.log(data);
  };

  return toReactive({
    onDrop,
    columns,
    leftFixedColumns,
    rightFixedColumns,
    hiddenColumns,
  });
};
