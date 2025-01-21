export { default as CustomeTable } from "./CustomeTable.vue";

export type RowKey = number | string;

export { usePagination } from "./usePagination";

export { useColumnsSetup } from "./useColumnsSetup";

export type CustomeTableColumnType = {
  title: string;
  dataIndex: string;
  key: RowKey;
  sorter?: boolean;
};
