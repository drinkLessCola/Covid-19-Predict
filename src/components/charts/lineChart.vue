<template>
  <div class="wrap">
    <scrollbar>
      <!-- 为 Echarts 准备一个具备大小（宽高）的 DOM -->
      <div ref="chartDom" class="chart"></div>
      <slot :chartData="chartData"></slot>
    </scrollbar>
  </div>
</template>
<script lang="ts">
export const PROVINCE = [
  '北京',
  '天津',
  '河北',
  '山西',
  '内蒙古',
  '辽宁',
  '吉林',
  '黑龙江',
  '上海',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '广西',
  '海南',
  '重庆',
  '四川',
  '贵州',
  '云南',
  '西藏',
  '陕西',
  '甘肃',
  '青海',
  '宁夏',
  '新疆',
] as const
export type IProvince = typeof PROVINCE[number]
</script>
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useRoute } from 'vue-router'
import { ElTable } from 'element-plus'
import 'element-plus/es/components/table/style/css'
import { getPredictList } from '@/api/predict'
export interface IChartData {
  date: string
  real: number
  forcast: number
}

const chartInstance = ref<echarts.EChartsType | null>(null)
// defineProps 会被提升至 setup 函数作用域之外，因此不能引用在 setup script 中定义的变量。
// 需要作为另一个模块引入 or 定义在普通 script 里
const props = defineProps({
  province: {
    type: String,
    validator(value: IProvince) {
      return PROVINCE.includes(value)
    }
  }
})

const chartDom = ref<HTMLDivElement>()
const chartData = ref<IChartData[]>([])

const province = props.province ?? useRoute().params.province as string
const predictData = await getPredictList(province)
console.log('predictData', predictData)
chartData.value = (predictData as unknown as IChartData[]).map(
  ({ date, real, forcast }) => ({ 
    date,
    real: Math.round(real),
    forcast: Math.round(forcast)
  })
)

const initChart = () => {
  const myChart = echarts.init(chartDom.value!);
  chartInstance.value = myChart
  updateChart()
}

const updateChart = () => {
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
  if(chartInstance.value) chartInstance.value.setOption(option);
}



onMounted(() => {
  initChart()
})

watch(
  () => props.province,
  async (newProvince, oldProvince) => {
    console.log('PROVINCE', newProvince, oldProvince)
    if (newProvince === oldProvince || !PROVINCE.includes(newProvince as IProvince)) return
    const predictData = await getPredictList(province)
    chartData.value = (predictData as unknown as IChartData[]).map(
      ({ date, real, forcast }) => ({ 
        date,
        real: Math.round(real),
        forcast: Math.round(forcast)
      })
    )
    updateChart()
  }
)
</script>

<style>
.wrap {
  width: 100%;
  height: 100%;
}
.chart {
  margin: 40px 20px;
  height: 400px;
}
</style>

