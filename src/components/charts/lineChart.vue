<template>
  <div class="wrap">
    <scrollbar>
      <h1>{{ province }}</h1>
      <!-- 为 Echarts 准备一个具备大小（宽高）的 DOM -->
      <div ref="chartDom" class="chart"></div>
      <el-table :data="chartData" style="width: 500px; margin: 0 auto;">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="real" label="实际确诊人数" width="180" />
        <el-table-column prop="forcast" label="预测确诊人数" />
      </el-table>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useRoute } from 'vue-router'
import { ElTable } from 'element-plus'
import 'element-plus/es/components/table/style/css'
export interface IChartData {
  date: string
  real: number
  forcast: number
}

const chartDom = ref<HTMLDivElement>()
const chartData = ref<IChartData[]>([])

const { province } = useRoute().params
const json = await import(`/src/mock/predict/${province}.json`)
console.log(json.default)
chartData.value = (json.default as IChartData[]).map(
  ({ date, real, forcast }) => ({ 
    date,
    real: Math.round(real),
    forcast: Math.round(forcast)
  })
)

const initChart = () => {
  const myChart = echarts.init(chartDom.value!);
  console.log(chartData.value)
  const option = {
    title: {
      text: '确诊人数'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['实际确诊人数', '预测确诊人数']
    },
    xAxis: {
      type: 'category',
      data: chartData.value.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '实际确诊人数',
        type: 'line',
        data: chartData.value.map(item => item.real)
      },
      {
        name: '预测确诊人数',
        type: 'line',
        data: chartData.value.map(item => item.forcast)
      }
    ]
  }

  myChart.setOption(option);
}



onMounted(() => {
  console.log(chartDom.value, chartData.value)
  initChart()
})
</script>

<style>
.wrap {
  width: 100%;
}
.chart {
  margin: 40px 20px;
  height: 400px;
}
</style>

