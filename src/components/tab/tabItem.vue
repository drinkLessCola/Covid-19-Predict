<template>
  <div class="tab-item" :class="{ 'is-active': isActive }">
    {{ title }}
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  isActive: Boolean,
  title: String
})


</script>
<style lang="scss">
.tab-item {
  display: inline-block;
  position: relative;
  width: 120px;
  text-align: center;
  font-size: 1rem;
  padding: 10px 0;
  cursor: pointer;

  &.is-active {
    border: 2px solid var(--primary-light);
    border-radius: 10px 10px 0 0;
  }

  &.is-active::after {
    content: '';
    position: absolute;
    height: 10px;
    width: 100%;
    border-radius: 2px;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 5px);
    background-color: #fff;
  }
}
</style>