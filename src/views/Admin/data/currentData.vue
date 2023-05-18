<template>
    <el-autocomplete
    v-model="province"
    :fetch-suggestions="querySearch"
    placeholder="选择省份"
    @select="handleSelectProvince"
    clearable
  >
    <template #suffix>
      <el-icon class="el-input__icon">
        <ArrowDown />
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete>

  <Suspense>
    <line-chart :province="province" v-slot="{ chartData }">
      <el-table :data="chartData" style="width: 700px; margin: 0 auto;">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="real" label="实际确诊人数" width="180" />
        <el-table-column prop="forcast" label="预测确诊人数" />
        <el-table-column label="操作">
          <el-button type="text">修改</el-button>
        </el-table-column>
      </el-table>
    </line-chart>
    <template #fallback>
      Loading...
    </template>
  </Suspense>

  <!-- <el-dialog v-model="editFormVisible" :title="editDialogTitle">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormElem" label-width="100px">
      <el-form-item :label="label" :prop="prop" v-for="{ label, prop, isNumber, values, options } in editFields">
        <el-radio-group v-model="editForm[prop]" v-if="values">
          <el-radio :label="value" v-for="value in values"></el-radio>
        </el-radio-group>
        <el-select v-model="editForm[prop]" v-else-if="options">
          <el-option
            v-for="{ label, value } in options"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
        <el-input v-model.number="editForm[prop]" autocomplete="off" v-else-if="isNumber" />
        <el-input v-model="editForm[prop]" autocomplete="off" :disabled="prop === id" v-else />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleUpdate">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog> -->

</template>
<script setup lang="ts">
import { ref } from 'vue'
import LineChart, { PROVINCE } from '@/components/charts/lineChart.vue';

interface ListItem {
  value: string
}

const province = ref('北京')
const provinceList = Array.from(PROVINCE).map(p => ({ value: p }))
const querySearch = (queryStr: string, cb: any) => {
  const results = queryStr
    ? provinceList.filter((province) => !!~province.value.indexOf(queryStr))
    : provinceList
  cb(results)
}

const handleSelectProvince = (newProvince: ListItem) => {
  province.value = newProvince.value
}

</script>