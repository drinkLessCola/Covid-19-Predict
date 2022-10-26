<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="title">新冠疫情预测系统</h1>
    <nav class="menu">
      <RouterLink to="/home">首页</RouterLink>
      <RouterLink to="/system">预测系统</RouterLink>
      <RouterLink to="/literature">参考文献</RouterLink>
      <RouterLink to="/about">关于我们</RouterLink>
    </nav>
  </header>
  <section class="body">
    <RouterView/>
  </section>
</template>

<style scoped lang="scss">
// @font-face {
//     font-family: "HanYiKuYaHei";
//     font-weight: 500;
//     src: url("https://gitee.com/zirina/font-family/raw/master/HanyiKuyahei/HYYakuHei-55W.ttf") format("ttf"),
// }

header {
  position: sticky;
  top: 0;
  grid-area: header;
  line-height: 1.5;
  z-index:50;
  background-color:var(--color-background);
  .title {
      font-size: 2rem;
      font-family: HYYakuHei;
      font-weight: normal;
      color:var(--black);
  }
  .menu {
    font-size: 1.25rem;
    font-family: "PingFang SC";
    height:100%;

    a{
      display:inline-flex;
      align-items: center;
      justify-content: center;
      height:100%;
      position:relative;
      padding:0 1.66rem;
      &::after {
        content:'';
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        margin:0 auto; //margin 0 auto 为什么生效来着？
        width:80%;
        height:3px;
        background-color:var(--primary);
        transition:all .15s ease-in-out;
        transform:scaleX(0);
        transform-origin: center;
      }
      &.router-active {
        color: var(--primary);
        &::after {
          transform:scaleX(1);
        }
      }
      &:hover {
        background-color: var(--color-hover);
      }
    }
  }
}

.body {
  grid-area:body;
  display: flex;
  width: 100%;
  height:100%;
  // height: 100vh;
  overflow: hidden;
}


@media (min-width: 1024px) {
  header {
    padding:0 10rem;
    box-sizing: border-box;
    box-shadow: 0 2px 8px var(--color-shadow);
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
}
</style>
