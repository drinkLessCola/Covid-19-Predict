<template>
  <div class="distribution">
    <section class="map">
      <header class="header">
        <!-- 月份选择器 -->
        <MonthPicker :year="year" :month="month" @changeMonth="handleMonthChange"></MonthPicker>
      </header>
      <!-- 疫情地图 -->
      <cumulativeMap width="65rem" height="42rem"></cumulativeMap>
      <footer>
        <!-- 日选择器 -->
        <DateDotPicker :year="year" :month="month" :selectedDate="date" @changeDate="handleDateChange"></DateDotPicker>
      </footer>
    </section>
    <section class="right-panel">
      <div class="date">
        <span class="date-left">{{dateStr}}</span>
        <span class="date-right">
          <span>{{year}}</span>
          <span>{{day}}</span>
        </span>
      </div>
      <ul class="info">
        <li class="info-item">
          <div class="data-cell">
            <span class="data-title">全国现有本土确诊</span>
            <span class="data">{{joinCommaInNumber(data.currentDiagnose)}}</span>
          </div>
          <div class="data-cell">
            <span class="data-title">本土无症状</span>
            <span class="data">{{joinCommaInNumber(data.currentSymptomless)}}</span>
          </div>
        </li>
        <li class="info-item">
          <div class="data-cell">
            <span class="data-title">全国新增本土确诊</span>
            <span class="data">{{joinCommaInNumber(data.incrementDiagnose)}}</span>
          </div>
          <div class="data-cell">
            <span class="data-title">本土无症状</span>
            <span class="data">{{joinCommaInNumber(data.incrementSymptomless)}}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import cumulativeMap from '@/components/charts/cumulativeMap.vue'
import MonthPicker from '@/components/picker/MonthPicker.vue'
import DateDotPicker from '@/components/picker/DateDotPicker.vue'


const now = new Date()
const dayMap = ['SUN', 'MON', 'TUE', 'WEDN', 'THU', 'FRI', 'SAT']

let year = ref(now.getFullYear()),
    month = ref(now.getMonth() + 1),
    date = ref(now.getDate()),
    day = computed(() => dayMap[new Date(year.value, month.value - 1, date.value).getDay()]),
    dateStr = computed(() => `${`0${month.value}`.slice(-2)}.${`0${date.value}`.slice(-2)}`)

// fake data
const data = reactive({
  currentDiagnose: 3808,
  currentSymptomless: 182,
  incrementDiagnose: 14679,
  incrementSymptomless: 534
})



function joinCommaInNumber(num: number):string {
  let arr = []
  while(num) {
    arr.push(num % 1000)
    num = Math.floor(num / 1000)
  }
  arr.reverse()
  return arr.join(',')
}
function handleDateChange(newDate: number):void {
  date.value = newDate
}
function handleMonthChange(newYear: number, newMonth:number):void {
  month.value = newMonth
  year.value = newYear
}
</script>
<style scoped lang="scss">
$design_width: 1920;//设计稿的宽度，根据实际项目调整
$design_height: 1080;//设计稿的高度，根据实际项目调整

@function px2rem($px) {
   $design_font_size: 16;
   @return calc($px/$design_font_size) + rem;
}
.distribution {
  display: flex;
  margin: px2rem(30) 1rem;
}
.right-panel {
  margin-left: px2rem(30);
  display: flex;
  flex:1;
  flex-direction: column;
}


.date {
  display:flex;
  color: #3d3d3d;
  align-items: center;
  padding-left: 1rem;
  margin-bottom: px2rem(10);
  line-height: px2rem(35);
  .date-left {
    font-family: Gilroy;
    font-weight:500;
    font-size: px2rem(56);
    margin-right: px2rem(10);
  }
  .date-right {
    display:flex;
    flex-direction: column;
    font-family: DIN Light;
    font-size: px2rem(22);
    line-height: px2rem(24);
  }
}

.info {
  display: flex;
  flex-direction: column;
  .info-item {
    display: flex;
    margin: 1rem 0;

    .data-cell {
      position:relative;
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      line-height:px2rem(35);
      & + .data-cell::after {
        position:absolute;
        content:'';
        left:0;
        top:px2rem(7);
        width:1px;
        height:px2rem(20);
        background-color: #555;
      }

      .data-title {
        font-size:px2rem(18);
        font-weight: 400;
        color:#555;
        margin-bottom:px2rem(10);
      }
      .data {
        width: 100%;
        color:var(--highlight);
        font-family: DIN;
        font-weight: 700;
        font-size: px2rem(42);
        text-align: right;
      }
    }
  }
}

</style>