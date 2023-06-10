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
  <el-upload
    drag
    action=""
    ref="uploadRef"
    accept="csv"
    :auto-upload="false"
    :onChange="handleSelect"
    style="margin-top: 20px;"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖到此处 或 点击上传
    </div>
    <template #tip>
      <div class="el-upload__tip">
        请上传 csv 文件
      </div>
    </template>
  </el-upload>
  <el-button type="primary" @click="batchUpload">
    上传
  </el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LineChart, { PROVINCE } from '@/components/charts/lineChart.vue';
import { ElMessage } from 'element-plus';

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

const uploadFile = ref<null | File>(null)
const handleSelect = (file: File, fileList: File[]) => {
  console.log(file, fileList)
  uploadFile.value = file
}

const batchUpload = async () => {
  if(!uploadFile.value) {
    ElMessage.error('请上传文件！')
    return
  }
  try {
    const formData = new FormData()
    
    ElMessage.success('上传成功！')
  } catch (err) {
    ElMessage.error('上传失败！')
  }

  uploadFile.value = null
}
</script>