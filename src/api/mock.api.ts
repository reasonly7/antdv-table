export const mockApi = {
  query() {
    return {
      page: 1,
      size: 10,
      total: 1000,
      records: Array.from({ length: 10 }).map((_, index) => {
        return {
          id: index,
          ruleName: "TradeCode 99",
          desc: "这是一段描述",
          times: "64万",
          status: "已上线",
          time: "2025-01-17 14:02:46",
        };
      }),
    };
  },
};
