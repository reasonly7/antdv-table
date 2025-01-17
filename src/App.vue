<script lang="ts" setup>
import {
  Card,
  ConfigProvider,
  Flex,
  type TableColumnsType,
} from "ant-design-vue";
import zhCN from "ant-design-vue/locale/zh_CN";
import { locale } from "dayjs";
import "dayjs/locale/zh-cn";
import {
  CustomeTable,
  usePagination,
  type RowKey,
} from "./components/custome-table";
import { mockApi } from "./api/mock.api";
import { onMounted, ref } from "vue";

locale("zh-cn");

const columns: TableColumnsType = [
  { title: "规则名称", dataIndex: "ruleName" },
  { title: "描述", dataIndex: "desc" },
  { title: "服务调用次数", dataIndex: "times", sorter: true },
  { title: "状态", dataIndex: "status" },
  { title: "上次调度时间", dataIndex: "time", sorter: true },
  { title: "操作", dataIndex: "action" },
];
const selectedRowKeys = ref<RowKey[]>([]);
const { query, loading, pagination, records } = usePagination(mockApi.query);

onMounted(query);
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <div class="card-wrapper">
      <Card :bordered="false">
        <div style="width: 1200px">
          <CustomeTable
            title="查询表格"
            :loading="loading"
            :columns="columns"
            :dataSource="records"
            :pagination="pagination"
            v-model:selectedRowKeys="selectedRowKeys"
          >
            <template #bodyCell="{ column }">
              <template v-if="column.dataIndex === 'action'">
                <Flex :gap="16">
                  <a href="javascript:void(0)">配置</a>
                  <a href="javascript:void(0)">订阅警报</a>
                </Flex>
              </template>
            </template>
          </CustomeTable>
        </div>
      </Card>
    </div>
  </ConfigProvider>
</template>

<style>
:root {
  background-color: #f5f5f5;
}
.card-wrapper {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  padding-top: 150px;
  align-items: flex-start;
}
</style>
