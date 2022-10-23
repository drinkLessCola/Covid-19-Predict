<template>
  <!-- <div id="china_map_box">
    <div id="china_map"></div>
  </div> -->
  <div class="myChart" ref="myChart"  :style="{width, height}"></div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive, defineProps } from "vue";
import * as echarts from "echarts";
import chinaJson from '@/mock/china.json'

echarts.registerMap("china", { geoJSON: JSON.stringify(chinaJson), specialAreas: {} });

const props = defineProps({
  width:String, 
  height:String
})
const myChart = ref<any>();
const myCharts = ref<any>();
interface MapData {
  name: string,
  current: number,
  increment: number,
  value:number
}
/**
 * value 为图例对应的值，在这里处理数据，加上 value 值
 * @param data 
 */
// Omit<T, K> 去除接口 T 内的属性 K
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// 接口 T 的所有属性字典组成的联合类型中，排除 K 类型， 得到新的联合类型 Exclude<keyof T, K>
// 从接口 T 中选择出 Exclude<keyof T, K> 中的属性，组成新的接口
const convertData = (data:Array<Omit<MapData, 'value'>>):Array<MapData> => {
  const res = data.map(d => {
    return Object.assign(d, { value: d.current })
  })
  return res
}
//echart data
// 要和 json 文件中的 name 对应，否则数据映射不到！
let dataList: Array<Omit<MapData, 'value'>> = [
  { name: "南海诸岛", current: 100, increment: 20 }, 
  { name: "北京", current: 540, increment: 12 }, 
  { name: "天津", current: 130, increment: 5 }, 
  { name: "上海", current: 400, increment:14 }, 
  { name: "重庆", current: 750, increment: 6 }, 
  { name: "河北", current: 130, increment: 0 }, 
  { name: "河南", current: 830, increment: 3 }, 
  { name: "云南", current: 110, increment: 14}, 
  { name: "辽宁", current: 19, increment: 20}, 
  { name: "黑龙江", current: 150, increment: 3}, 
  { name: "湖南", current: 690, increment: 10}, 
  { name: "安徽", current: 60, increment: 7}, 
  { name: "山东", current: 39, increment: 100}, 
  { name: "新疆", current: 4, increment: 5}, 
  { name: "江苏", current: 31, increment: 15}, 
  { name: "浙江", current: 104, increment: 20}, 
  { name: "江西", current: 36, increment: 54}, 
  { name: "湖北", current: 52, increment: 1}, 
  { name: "广西", current: 33, increment: 5}, 
  { name: "甘肃", current: 7, increment: 12}, 
  { name: "山西", current: 5, increment: 31}, 
  { name: "内蒙古", current: 778, increment: 20}, 
  { name: "陕西", current: 22, increment: 14}, 
  { name: "吉林", current: 4, increment: 52}, 
  { name: "福建", current: 18, increment: 1}, 
  { name: "贵州", current: 5, increment: 0}, 
  { name: "广东", current: 98, increment: 2}, 
  { name: "青海", current: 1, increment: 12}, 
  { name: "西藏", current: 0, increment: 23}, 
  { name: "四川", current: 44, increment: 24}, 
  { name: "宁夏", current: 4, increment: 1}, 
  { name: "海南", current: 22, increment: 42}, 
  { name: "台湾", current: 3, increment: 501}, 
  { name: "香港", current: 5, increment: 404}, 
  { name: "澳门", current: 555, increment: 200}, 
]
//echart 配制option
let options = {
  tooltip: {
    triggerOn: "mousemove", //mousemove、click
    enterable: 'true', // ?
    padding: 8,
    borderWidth: 1,
    borderColor: "#409eff", // TODO
    backgroundColor: "rgba(255,255,255,0.7)", // TODO
    textStyle: {
      color: "#000000",
      fontSize: 10,
    },
    /* TODO: 不要写成 anyScript */
    formatter(params: any, ticket: string, callback: (ticket: string, html: string) => string | HTMLElement | HTMLElement[]) {
      // console.log(params, ticket, callback )
      const { current, increment, name = '' } = params.data || {}
      // console.log(current, increment, name)

      let context = `
          <section class="popper">
              <title>${name}</title>
              <p class="tooltip_style"><span class="tooltip_left">现有确诊：</span><span class="tooltip_right">${current}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">新增确诊：</span><span class="tooltip_right">${increment}</span></p>
              </section>
      `;
      return context;
    },
  },
  visualMap: {
    type: 'piecewise', // 定义为分段型 visualMap 
    min: 0,
    max: 1000,
    itemWidth: 40,
    show: true, // 显示图注
    left: 20,
    bottom: 20,
    showLabel: true,
    // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
    pieces: [
      { gte: 1000, label: ">= 1000", color: "#8e98f5" },
      { gte: 500, lt: 999, label: "500 - 999", color: "#a3a8ff" },
      { gte: 100, lt: 499, label: "100 - 499", color: "#c5c7ff" },
      { gte: 10, lt: 99, label: "10 - 99", color: "#D2DAFF" },
      { lt: 10, label: "<10", color: "#f9f8fe" },
    ],
  },
  geo: {
    map: "china",
    roam: false,  // 是否开启鼠标缩放和平移漫游
    zoom: 1.6,  // 当前视角的缩放比例（地图的放大比例）
    scaleLimit: {
      min: 1,
      max: 2,
    },
    top: 150,
    label: {
      normal: {
        show: true,
        fontSize: "12",
        color: "rgba(0, 0, 0, 0.7)",
      },
      emphasis: {
        color: "#fff",
      }
    },
    // 地图区域的多边形 图形样式。
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: "rgba(37, 49, 155, 0.3)",
      },
      // 高亮状态下的多边形和标签样式
      emphasis: {
        // focus: "self",
        areaColor: "#7874F2",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
    select: {
      label:{ // 选中区域的label(文字)样式
        color: '#fff'
      },
      itemStyle: {
        areaColor: "#7975f2",
      }
    }
  },
  // 在这里配置地图区域的数据
  series: [
    {
      name: "标题", // 浮动框的标题（可以自定义） 
      type: "map",
      geoIndex: 0,
      // datasetIndex: 0,
    },
  ],
  dataset: {
    dimensions: ['name', 'current'],
    source: convertData(dataList)
  }
}

// options.series[0]["data"] = dataList;
console.log(options)
onMounted(() => {
  // 绘制图表, 初始化 echarts 实例
  myCharts.value = echarts.init(myChart.value);
  // 使用刚指定的配置项和数据显示地图数据
  myCharts.value.setOption(options);
  console.log(myCharts.value)
});

</script>

<style scoped>
#china_map_box {
  height: 100%; 
  position: relative;
}

#china_map_box #china_map {
  height: 100%;
}

#china_map_box .china_map_logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
}

.myChart {
  border:1px solid #eee; 
  overflow: hidden;
}
</style>
<style>
#china_map .tooltip_style {
  line-height: 1.7;
  overflow: hidden;
}

#china_map .tooltip_left {
  float: left;
}

#china_map .tooltip_right {
  float: right;
}
</style>