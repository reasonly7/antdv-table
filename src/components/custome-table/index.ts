import type { TableColumnType } from "ant-design-vue";

export { default as CustomeTable } from "./CustomeTable.vue";

export type RowKey = number | string;

export { usePagination } from "./usePagination";

export { useColumnsSetup } from "./useColumnsSetup";

// + key 是为了兼容 TreeProps['treeData'] 
export type CustomeTableColumnType = TableColumnType & { key: RowKey }; 
