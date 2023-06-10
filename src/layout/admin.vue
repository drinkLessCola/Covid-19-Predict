<template>
  <div class="admin">
    <aside class="admin-sidebar">
      <ul class="menu">
        <li 
          :class="['menuitem', path.match(menuPath) ? 'active' : '']"
          index="1"
          v-for="{ label, key, icon, path: menuPath } in menu"
          :key="key"
          @click="() => handleMenuItemClick(menuPath)"
        >
          <el-icon :size="16">
            <component :is="icon"></component>
          </el-icon>
          <span class="menuitem-label">{{ label }}</span>
        </li>
      </ul>
    </aside>
    <main class="admin-main">
      <header class="admin-main-breadcrumb">
        <h1 class="title">{{ title }}</h1>
      </header>
      <main class="content">
        <router-view></router-view>
      </main>
    </main>
  </div>
</template>
<script setup lang="ts">
import { User, Document, DataLine, ArrowRight } from '@element-plus/icons-vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import router from '@/router'

const path = ref(useRoute().path)
const menu = [
  { label: '用户管理', key: '1', icon: User, pattern: '/admin/user', path: '/admin/user' },
  { label: '参考文献', key: '2', icon: Document, path: '/admin/literature', pattern: '/admin/literature' },
  { label: '预测数据', key: '3', icon: DataLine, path: '/admin/data', pattern: '/admin/data/(.*)' },
  { label: '关于我们', key: '4', icon: User, path: '/admin/about', pattern: '/admin/about' }
]
const title = computed(() => menu.filter((item) => path.value.match(item.path))[0].label)
const handleMenuItemClick = (targetPath: string) => {
  router.push(targetPath)
}

onBeforeRouteUpdate((to, from) => {
  if (to.path !== from.path) {
    path.value = to.path
  }
})
</script>
<style lang="scss">
.admin {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: minmax(200px, 20%) 1fr;

  .admin-sidebar {
    height: 100%;
    background-color: var(--white);

    .menu {
      padding: 20px 10px;
      border-right: 1px solid var(--grey);
      height: 100%;
    }

    .menuitem {
      font-size: 15px;
      padding: 12px 20px;
      box-sizing: border-box;
      margin: 2px 0;
      color: var(--color-text);
      border-radius: 5px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: var(--primary-light);
        cursor: pointer;
      }
      
      &.active {
        background-color: var(--primary-light);
        color: var(--primary);
      }

      .menuitem-label {
        margin: 0 10px;
      }
    }
  }

  .admin-main {
    padding: 20px 30px;
    box-sizing: border-box;
    .title {
      font-size: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px 0;
      height: calc(100% - 20px);
      box-sizing: border-box;
    }
  }
}
</style>