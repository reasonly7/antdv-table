const records = Array.from({ length: 503 }).map((_, index) => {
  return {
    id: index,
    ruleName: "TradeCode " + index,
    desc: "这是一段描述",
    times: "64万",
    status: "已上线",
    time: "2025-01-17 14:02:46",
  };
});

export const mockApi = {
  query(
    params: { page?: number; size?: number } = { page: 1, size: 10 },
  ): Promise<{ page: number; size: number; total: number; records: any[] }> {
    return new Promise((resolve) => {
      params.page = params.page || 1;
      params.size = params.size || 10;

      if ((params.page - 1) * params.size <= records.length) {
        setTimeout(() => {
          resolve({
            page: params.page!,
            size: params.size!,
            total: records.length,
            records: records.slice(
              (params.page! - 1) * params.size!,
              params.page! * params.size!,
            ),
          });
        }, 1000);
      } else {
        setTimeout(() => {
          resolve({
            page: params.page!,
            size: params.size!,
            total: records.length,
            records: [],
          });
        }, 1000);
      }
    });
  },
};
