<template>
  <tab-pane>
    <tab-item 
      v-for="{ title, route } in tabs" 
      :is-active="route === currentRoute"
      :title="title"
      @click="() => handleTabChange(route)"
    ></tab-item>
  </tab-pane>
  <router-view></router-view>
  
</template>

<script setup lang="ts">
import TabPane from '@/components/tab/tabPane.vue'
import TabItem from '@/components/tab/tabItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const tabs = [
  { title: '现有数据', route: '/admin/data/current' },
  { title: '上传数据', route: '/admin/data/upload' },
]
const currentRoute = computed(() => useRoute().path)
const router = useRouter()
const handleTabChange = (route: string) => {
  router.push(route)
}
</script>
