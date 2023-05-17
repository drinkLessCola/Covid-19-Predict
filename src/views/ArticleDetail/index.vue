<template>
  <Suspense>
    <h1>{{ province }}</h1>
    <lineChart v-slot="{ chartData }">
      <el-table :data="chartData" style="width: 500px; margin: 0 auto;">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="real" label="实际确诊人数" width="180" />
        <el-table-column prop="forcast" label="预测确诊人数" />
      </el-table>
    </lineChart>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import lineChart from '@/components/charts/lineChart.vue'
import { useRoute } from 'vue-router';

const province = useRoute().params.province
</script>