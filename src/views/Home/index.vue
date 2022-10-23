<template>
  <aside>
    <ul class="menu">
      <li>分布情况图</li>
      <li>趋势图</li>
      <li>国内突发新冠疫情预测</li>
    </ul>
  </aside>
  <main ref="main">
    <cumulativeMap></cumulativeMap>
    
  </main>
</template>

<script setup lang="ts">
import cumulativeMap from '@/components/charts/cumulativeMap.vue';
import { onMounted, ref } from 'vue';

const mainDom = ref<any>()
function onScroll (e:Event) {
  console.log('!!!')
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, true)
})

</script>

<style lang="scss" scoped>

main {
  margin-left:5rem;
  flex:1;
  display: flex;
  justify-content: center;
}

.menu {
  color:var(--color-nav-text);
  position:relative;
  &::after {
    content:"";
    position:absolute;
    width:1px;
    height:calc(100% - 1.5rem);
    background-color: #ddd;
    top:50%;
    right:0;
    transform: translateY(-50%);
  }
    li {
      position:relative;
      z-index:5;
      & + li {
        margin-top:50px;
      }
      &::after {
        content:'';
        position:absolute;
        right:0;
        top:50%;
        height:8px;
        width:8px;
        transform: translate(50%, -50%);
        background-color: var(--color-background);
        border:1px solid var(--color-nav-text);
        border-radius:50%;
      }
      &.active {
        &::after {
          border:1px solid var(--primary);
        }
      }
    }
}

@media (min-width: 1024px) {
  aside {
    width: 250px;
  }
  .menu {
      position:fixed;
      // top:calc(50% + var(--header-height));
      top:50%;
      transform: translateY(-50%);
      width:200px;
  }
}
</style>