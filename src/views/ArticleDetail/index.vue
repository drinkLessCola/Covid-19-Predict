<template>
  <Suspense>
    <lineChart />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import lineChart from '@/components/charts/lineChart.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const province = useRoute().params.province
</script>