<script lang="ts" setup>
import { computed } from 'vue'
import { svgIconMap, type SvgIconType } from './svgIconMap'

const props = defineProps<{
  type: SvgIconType
  size?: number
}>()

const svgIcon = computed((): string => {
  return svgIconMap[props.type]
})
</script>

<template>
  <!-- 由于所有 svg 图标都是开发阶段预置的，都是“可信”的，所以这里使用 v-html 是安全的，不用考虑 XSS -->
  <i class="svg-icon" v-html="svgIcon" :style="size ? { fontSize: `${size}px` } : {}"></i>
</template>

<style scoped>
/* TODO 找时间分析一下这些css规则的作用（来自.anticon） */
i {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
