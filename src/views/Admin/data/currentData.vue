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
          <template #default="scope">
            <el-button type="danger" link @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </line-chart>
    <template #fallback>
      Loading...
    </template>
  </Suspense>

  <!-- <el-dialog v-model="editFormVisible" title="修改数据">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormElem" label-width="100px">
      <el-form-item label="日期" prop="date">
        <el-input v-model="editForm.date" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="真实数据" prop="real">
        <el-input v-model="editForm.real" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="预测数据" prop="predict">
        <el-input v-model="editForm.forcast" autocomplete="off"/>
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
import LineChart, { PROVINCE, type IChartData } from '@/components/charts/lineChart.vue';
import { type FormInstance } from 'element-plus';

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

const deleteData = (data: IChartData) => {
  console.log('data', data)
}
// const initData = {
//   date: '',
//   real: 0,
//   forcast: 0
// } as IChartData

// const editForm = ref(initData)
// let oldData: IChartData | null = initData
// const editFormElem = ref<FormInstance | undefined>()
// const editFormVisible = ref(false)

// const updateData = (oldData: IChartData) => {
//   editForm.value = Object.assign({}, oldData)
//   oldData = Object.assign({}, oldData)
//   editFormVisible.value = true
// }


// const editFormRules = {
  
// }

// const handleCancel = () => {
//   editFormVisible.value = false
//   oldData = null
// }

// const handleUpdate = async () => {
//   try {
//     const data = Object.assign({}, editForm.value)
//     let isChanged = false
//     for(const [key, value] of Object.entries(data)) {
//       if (oldData && oldData[key as keyof IChartData] !== value) {
//         isChanged = true
//         break
//       }
//     }

//     if (isChanged)  await updatePredict({
//       ...data,
//       province: province.value
//     } as IPredict, )
//     ElMessage.success('修改成功')
//   } catch (err: any) {
//     ElMessage.error(err)
//   }

//   editFormVisible.value = false
//   loadTable()
// }

</script>