import { toReactive } from "@vueuse/core";
import { ref } from "vue";

export type RowKey = number | string;

export const usetableSelect = () => {
  const selectedKeys = ref<RowKey[]>([]);

  const onSelect = (newSelectedKeys: RowKey[]) => {
    selectedKeys.value = newSelectedKeys;
  };

  return toReactive({
    selectedKeys,
    onSelect,
  });
};
