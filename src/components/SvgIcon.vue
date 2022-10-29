<template>
  <svg 
    :class="svgClass" 
    aria-hidden="true" 
    @click="emits('click')"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup lang="ts"> 
import { computed } from 'vue';

const emits = defineEmits(["click"])
const props = defineProps({
  icon:{
    type: String,
    required: true,
  },
  className: {
    type: String,
    default:""
  }
})

const iconName = computed(() => `#icon-${props.icon}`)
const svgClass = computed(() => {
  return "svg-icon" + ` ${props.className}`
})
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
  overflow: hidden;
  display: inline-block;
}
</style>