<template>
  <div class="month-picker">
    <div class="picker-input">
      <input :value="date">
    </div>
    <!-- TODO:后续将 dropdown 封装为一个组件 -->
    <section class="dropdown">
      <table class="month-table">
        <tr v-for="m, row in month" :key="row">
          <td v-for="monthStr, col in m" :key="monthStr" @click="handlePick(row * 4 + col)">
            <div class="cell">{{monthStr}}</div>
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const month = [['一月', '二月', '三月', '四月'], ['五月', '六月', '七月', '八月'], ['九月', '十月', '十一月', '十二月']]
const curMonth = new Date().getMonth()

const year = ref(new Date().getFullYear())
let selectedMonth = ref(curMonth)
const date = computed(() => `${year.value}-${selectedMonth.value}`)

function handlePick (monthIdx: number) {
  selectedMonth.value = monthIdx
}
</script>

<style lang="scss">
$design_width: 1920;//设计稿的宽度，根据实际项目调整
$design_height: 1080;//设计稿的高度，根据实际项目调整

@function px2rem($px) {
   $design_font_size: 16;
   @return calc($px/$design_font_size) + rem;
}

.month-picker {
  background-color: beige;
}
.picker-input {
  display: flex;
  align-items: center;
  width:px2rem(230);
  height:px2rem(50);
  border:1px solid var(--color-picker-border);
  border-radius: px2rem(10);
  padding: px2rem(8);
  background-color: var(--color-background);


  input {
    width:100%;
    display: inline-block;
    flex:1;
    background: none;
    border:none;
    font-size: px2rem(24);
    text-align: center;
    font-family: Gilroy;
    font-weight: 400;
    color: var(--color-picker-text);
  }
}
.dropdown {
  position:absolute;
  width:px2rem(360);
  background-color: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
}
.month-table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;

  tr {
    margin: 1rem 0;
  }

  td {
    padding: 8px 0;
    text-align: center;

    .cell {
      width: 60px;
      height: px2rem(60);
      line-height:px2rem(60);
      margin: 0 auto;
      color:var(--color-nav-text);

      &:hover {
        color:var(--color-active-text);
        cursor:pointer;
      }
    }
  }

  
}
</style>