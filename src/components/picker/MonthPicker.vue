<template>
  <div class="month-picker" ref="monthPicker">
    <div class="picker-input" @click="toggleDropdown">
      <input :value="date">
    </div>
    <dropdown :show="dropdownVisible" >
      <template #default>
        <table class="month-table">
          <tr v-for="m, row in month" :key="row">
            <td v-for="monthStr, col in m" :key="monthStr" @click="handlePick(row * 4 + col)">
              <div class="cell">{{monthStr}}</div>
            </td>
          </tr>
        </table>
      </template>
    </dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import dropdown from '../dropdown/index.vue';

const emit = defineEmits(['changeMonth'])
const month = [['一月', '二月', '三月', '四月'], ['五月', '六月', '七月', '八月'], ['九月', '十月', '十一月', '十二月']]
const curMonth = new Date().getMonth()

const monthPicker = ref<any>()
const year = ref(new Date().getFullYear())
let selectedMonth = ref(curMonth)
let dropdownVisible = ref(false)
const date = computed(() => `${year.value}-${selectedMonth.value + 1}`)



function toggleDropdown () {
  // dropdown 可见
  if(dropdownVisible.value) {
    dropdownVisible.value = false
    document.removeEventListener('click', handleGlobalClick)
  } else {
    dropdownVisible.value = true
    // nextTick(() => {
      document.addEventListener('click', handleGlobalClick)
    // })
  }
}

function handleGlobalClick (event:Event) {
  if(!dropdownVisible.value) return
  const target = event.target as HTMLElement
  // 点击 dropdown 外侧区域
  if(!monthPicker.value.contains(target)) {
    dropdownVisible.value = false
  }
}
function handlePick (month: number) {
  selectedMonth.value = month
  dropdownVisible.value = false
  emit('changeMonth', 2022, month + 1)
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

.month-table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  height:fit-content;

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