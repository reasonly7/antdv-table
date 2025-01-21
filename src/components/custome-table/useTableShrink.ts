import { toReactive } from "@vueuse/core";
import type { ItemType } from "ant-design-vue";
import { ref } from "vue";

export const enum TableShrinkType {
  DEFAULT = "large",
  MIDDLE = "middle",
  SMALL = "small",
}

export const useTableShrink = () => {
  const activeKey = ref<TableShrinkType>(TableShrinkType.DEFAULT);
  const menuItems: ItemType[] = [
    { label: "默认", key: TableShrinkType.DEFAULT },
    { label: "中等", key: TableShrinkType.MIDDLE },
    { label: "紧凑", key: TableShrinkType.SMALL },
  ];

  const onClick = (key: TableShrinkType) => {
    activeKey.value = key;
  };

  return toReactive({
    activeKey,
    onClick,
    menuItems,
  });
};
