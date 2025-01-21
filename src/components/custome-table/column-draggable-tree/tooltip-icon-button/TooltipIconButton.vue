<script lang="ts" setup>
import { Tooltip } from "ant-design-vue";

defineProps<{
  tip: string;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <Tooltip :title="tip">
    <a href="javascript:void(0)" @click="$emit('click')">
      <slot></slot>
    </a>
  </Tooltip>
</template>
