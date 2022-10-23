<template>
  <section class="dropdown" :class="{show}">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
type Trigger = 'click' | 'hover'
const {show, trigger = 'click' } = defineProps<{
  show: boolean;
  trigger?: Trigger;
}>();


</script>

<style lang="scss">
$design_width: 1920;//设计稿的宽度，根据实际项目调整
$design_height: 1080;//设计稿的高度，根据实际项目调整

@function px2rem($px) {
   $design_font_size: 16;
   @return calc($px/$design_font_size) + rem;
}

.dropdown {
  display: block;
  position:absolute;
  width:px2rem(360);
  margin-top: 1rem;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  z-index: 10;
  overflow:hidden;
  transition: all .2s ease-in-out;
  transform:scaleY(0);
  transform-origin: top;

  &.show {
    transform:scaleY(1)
  }

  &::after {
    
  }
}
</style>