<template>
  <ul class="date-picker">
    <li v-for="date in dateNumber" @click="isAvailable(date) && $emit('changeDate', date)">
      <div class="dot" :class="{ available: isAvailable(date), milestone: !(date % 5), selected: date === selectedDate}"></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  year: {
    type:Number,
    required: true
  },
  month: {
    type:Number,
    required: true
  },
  selectedDate: {
    type:Number,
    required: true
  }
})
// const selectedDate = ref(date)
// console.log(selectedDate)

let dateNumber = computed(() => {
  const {year, month} = props
  return getDateNum(year, month)
})

const curDate = new Date().getDate(),
      curMonth = new Date().getMonth() + 1

/**
 * 日期是否是过去 / 今天的日期
 * @param date 
 */
function isAvailable(date:number):boolean {
  const { month } = props
  return (curMonth > month) || (curMonth === month && date <= curDate)
}  

function isSelected(date:number):boolean {
  const { selectedDate } = props
  console.log(selectedDate)
  return date === selectedDate
}
/**
 * 获取某年某月的总天数
 * @param year 
 * @param month 
 */
function getDateNum(year:number, month:number):number {
  return new Date(year, month, 0).getDate()
}
</script>

<style lang="scss">
$design_width: 1920;//设计稿的宽度，根据实际项目调整
$design_height: 1080;//设计稿的高度，根据实际项目调整

@function px2rem($px) {
   $design_font_size: 18;
   @return calc($px / $design_font_size) + rem;
}

.date-picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  counter-reset: date;
  li {
    margin: .5rem;
    .available{
      cursor: pointer;
    }
  }
}
.dot {
  position:relative;
  width: px2rem(10);
  height: px2rem(10);
  background-color: #e5e5e5;
  border-radius: 50%;
  counter-increment: date;

  &.available {
    width: px2rem(14);
    height: px2rem(14);
    background-color: #c9c9c9;

    &::after {
      color: #aaa;
    }
  }
  &.available.milestone {
    width: px2rem(16);
    height: px2rem(16);
  }

  &.selected, &.selected.milestone {
    width: px2rem(25);
    height: px2rem(25);
    background-color: var(--primary);
    &::after {
      color: var(--primary);
      font-size: px2rem(24);
    }
  }

  &::after {
    content:counter(date);
    position:absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    font-size: px2rem(20);
    font-family: DIN;
    color: #c9c9c9;
  }

}
</style>