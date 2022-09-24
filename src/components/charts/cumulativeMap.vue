<template>
  <!-- <div id="china_map_box">
    <div id="china_map"></div>
  </div> -->
  <div class="myChart" ref="myChart" style="width:800px;height:800px;border:1px solid #eee"></div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import chinaJson from './china.json'

echarts.registerMap("china", { geoJSON: JSON.stringify(chinaJson), specialAreas:{} });

const myChart = ref<any>();
const myCharts = ref<any>();
interface MapData {
  name: string,
  value: number,
  eventTotal?: number | unknown
  specialImportant?: number | unknown
  import?: number | unknown
  compare?: number | unknown
  common?: number | unknown
  specail?: number | unknown

}
//echart data
let dataList:Array<MapData> = [
  {
    name: "南海诸岛",
    value: 100,
    eventTotal: 100,
    specialImportant: 10,
    import: 10,
    compare: 10,
    common: 40,
    specail: 20,
  },
  {
    name: "北京",
    value: 540,
  },
  {
    name: "天津",
    value: 130,
  },
  {
    name: "上海",
    value: 400,
  },
  {
    name: "重庆",
    value: 750,
  },
  {
    name: "河北",
    value: 130,
  },
  {
    name: "河南",
    value: 830,
  },
  {
    name: "云南",
    value: 110,
  },
  {
    name: "辽宁",
    value: 19,
  },
  {
    name: "黑龙江",
    value: 150,
  },
  {
    name: "湖南",
    value: 690,
  },
  {
    name: "安徽",
    value: 60,
  },
  {
    name: "山东",
    value: 39,
  },
  {
    name: "新疆",
    value: 4,
  },
  {
    name: "江苏",
    value: 31,
  },
  {
    name: "浙江",
    value: 104,
  },
  {
    name: "江西",
    value: 36,
  },
  {
    name: "湖北",
    value: 52,
  },
  {
    name: "广西",
    value: 33,
  },
  {
    name: "甘肃",
    value: 7,
  },
  {
    name: "山西",
    value: 5,
  },
  {
    name: "内蒙古",
    value: 778,
  },
  {
    name: "陕西",
    value: 22,
  },
  {
    name: "吉林",
    value: 4,
  },
  {
    name: "福建",
    value: 18,
  },
  {
    name: "贵州",
    value: 5,
  },
  {
    name: "广东",
    value: 98,
  },
  {
    name: "青海",
    value: 1,
  },
  {
    name: "西藏",
    value: 0,
  },
  {
    name: "四川",
    value: 44,
  },
  {
    name: "宁夏",
    value: 4,
  },
  {
    name: "海南",
    value: 22,
  },
  {
    name: "台湾",
    value: 3,
  },
  {
    name: "香港",
    value: 5,
  },
  {
    name: "澳门",
    value: 555,
  },
]
 
//echart 配制option
let options = reactive({
  tooltip: {
    triggerOn: "mousemove", //mousemove、click
    padding: 8,
    borderWidth: 1,
    borderColor: "#409eff",
    backgroundColor: "rgba(255,255,255,0.7)",
    textStyle: {
      color: "#000000",
      fontSize: 10,
    },
    /* TODO: 不要写成 anyScript */
    formatter: function (e:any, t:any, n:any) {
      console.log(e, t, n)
      const data = e.data
      console.log(data)
      //模拟数据
      const specialImportant = ref((Math.random() * 1000) | 0)
      const important = ref((Math.random() * 1000) | 0)
      const compare = ref((Math.random() * 1000) | 0)
      const common = ref((Math.random() * 1000) | 0)
      const specail = ref((Math.random() * 1000) | 0)

      let context = `
          <div>
              <p><b style="font-size:15px;">${name}</b>(2020年第一季度)</p>
              <p class="tooltip_style"><span class="tooltip_left">事件总数</span><span class="tooltip_right">${data.value}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">特别重大事件</span><span class="tooltip_right">${specialImportant}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">重大事件</span><span class="tooltip_right">${important}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">较大事件</span><span class="tooltip_right">${compare}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">一般事件</span><span class="tooltip_right">${common}</span></p>
              <p class="tooltip_style"><span class="tooltip_left">特写事件</span><span class="tooltip_right">${specail}</span></p>
          </div>
      `;
      return context;
    },
  },
  visualMap: {
    show: true,
    left: 26,
    bottom: 40,
    showLabel: true,
    pieces: [
      {
        gte: 100,
        label: ">= 1000",
        color: "#1f307b",
      },
      {
        gte: 500,
        lt: 999,
        label: "500 - 999",
        color: "#3c57ce",
      },
      {
        gte: 100,
        lt: 499,
        label: "100 - 499",
        color: "#6f83db",
      },
      {
        gte: 10,
        lt: 99,
        label: "10 - 99",
        color: "#9face7",
      },
      {
        lt: 10,
        label: "<10",
        color: "#bcc5ee",
      },
    ],
  },
  geo: {
    map: "china",
    scaleLimit: {
      min: 1,
      max: 2,
    },
    zoom: 1,
    top: 120,
    label: {
      normal: {
        show: true,
        fontSize: "12",
        color: "rgba(0,0,0,0.7)",
      },
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
      emphasis: {
        areaColor: "#f2d5ad",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
  },
  series: [
    {
      name: "突发事件",
      type: "map",
      geoIndex: 0,
      data: [] as Array<MapData>,
    },
  ],
})
options.series[0]["data"] = dataList;

onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value);
  myCharts.value.setOption(options);
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