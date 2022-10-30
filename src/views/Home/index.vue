<template>
  <aside>
    <ul class="menu" @click="handleClickAnchor">
      <li data-href="distribution">分布情况图</li>
      <li >趋势图</li>
      <li data-href="lastestPredict">国内突发新冠疫情预测</li>
    </ul>
  </aside>
  <main ref="main">
    <Scrollbar ref="scrollbar">
      <template #default>
        <Distribution id="distribution"></Distribution>
        <ul>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
          <li>12</li>
        </ul>
        <LatestPredict id="lastestPredict"></LatestPredict>
      </template>
    </Scrollbar>
  </main>
</template>

<script setup lang="ts">

import { onMounted, ref, reactive, computed } from 'vue'
import Distribution from './Distribution/index.vue'
import LatestPredict from './Prediction/LatestPredict.vue'
import Scrollbar from '../../components/scrollbar/index.vue'

const scrollbar = ref<any>()
const main = ref<any>()

function handleClickAnchor(event: MouseEvent) {
  const target = event.target as HTMLElement
  const anchor = target.closest('li')

  if(!anchor) return 
  const href = anchor.dataset.href
  const hrefElem = (main.value as HTMLElement).querySelector(`#${href}`)
  console.log(hrefElem)

  if(!hrefElem) return
  // scrollbar.value.scrollTo(0,500)
  scrollbar.value.scrollIntoView(hrefElem)
}

onMounted(() => {
  console.log(scrollbar.value)
})
</script>

<style lang="scss" scoped>

main {
  flex:1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height:100%;
  overflow: hidden;
}

.menu {
  color:var(--color-nav-text);
  position:relative;
  &::after {
    content:"";
    position:absolute;
    width:1px;
    height:calc(100% - 1.5rem);
    background-color: #e5e5e5;
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
        transform: translate(calc(50% - 1px), -50%);
        background-color: var(--color-background);
        border:1px solid #aaa;
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
    width: 220px;
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