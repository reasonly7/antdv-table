import { useToggle } from "@vueuse/core";
import type { TablePaginationConfig } from "ant-design-vue";
import { computed, ref, shallowRef } from "vue";

export const usePagination = <
  T extends { page?: number; size?: number },
  U extends Record<string, unknown>,
>(
  apiFn: (reqParams: T) => Promise<
    | {
        page: number;
        size: number;
        total: number;
        records: U[];
      }
    | undefined
  >,
) => {
  const [loading, loadingToggle] = useToggle(false);
  const records = shallowRef<U[]>([]);
  const searchParams = ref(<Omit<T, "page" | "size">>{});
  const page = ref(1);
  const size = ref(10);
  const total = ref(0);

  const pagination = computed<TablePaginationConfig>(() => {
    return {
      position: ["bottomCenter"],
      current: page.value,
      pageSize: size.value,
      total: total.value,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total: number) => `共 ${total} 条`,
      onChange: (_page: number, _size: number) => {
        page.value = _page;
        size.value = _size;
        query();
      },
    };
  });

  async function query() {
    loadingToggle(true);
    const fullParams: T = { ...searchParams.value };
    fullParams.page = page.value;
    fullParams.size = size.value;
    const data = await apiFn(fullParams);
    loadingToggle(false);

    if (!data) {
      records.value = [];
      page.value = 1;
      size.value = 10;
      total.value = 0;
      return;
    }

    records.value = data.records;
    page.value = data.page;
    size.value = data.size;
    total.value = data.total;
  }

  function search() {
    page.value = 1;
    query();
  }

  return {
    loading,
    records,
    searchParams,
    query,
    page,
    size,
    total,
    search,
    pagination,
  };
};
