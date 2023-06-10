<template>
  <section class="aboutInfo">
    <div class="aboutInfo-item">
      <SubHeading title="简介"></SubHeading>
      <div v-if="!isEdit">{{ aboutInfo.brief ?? '还没有简介' }}</div>
      <el-input v-else v-model="editForm.brief"></el-input>
    </div>

    <div class="aboutInfo-item">
      <SubHeading title="人员组成"></SubHeading>
      <div v-if="!isEdit">{{ aboutInfo.composition ?? '还没有人员组成' }}</div>
      <el-input v-else v-model="editForm.composition"></el-input>
    </div>

    <div class="aboutInfo-item">
      <SubHeading title="联系我们"></SubHeading>
      <div v-if="!isEdit">{{ aboutInfo.phone ?? '还没有联系方式' }}</div>
      <el-input v-else v-model="editForm.phone"></el-input>
    </div>
  </section>
  <el-button type="primary" v-if="!isEdit" @click="handleEdit">编辑</el-button>
  <template v-else>
    <el-button type="primary" @click="handleUpdate">保存</el-button>
    <el-button @click="handleCancel">取消</el-button>
  </template>

</template>
<script lang="ts" setup>
import { getAboutInfo } from '@/api/about';
import SubHeading from '@/components/SubHeading.vue';
import { onBeforeMount, ref } from 'vue';

const initData = {
  brief: '',
  composition: '',
  phone: ''
}
const isEdit = ref(false)
const aboutInfo = ref(initData)
const editForm = ref(initData)

const handleEdit = () => {
  editForm.value = Object.assign({}, aboutInfo.value)
  isEdit.value = true
}

const handleUpdate = () => {
  isEdit.value = false
}

const handleCancel = () => {
  editForm.value = initData
  isEdit.value = false
}

onBeforeMount(async () => {
  aboutInfo.value = await getAboutInfo()
})
</script>

<style lang="scss">
.aboutInfo-item {
  margin: 20px;
  font-size: 15px;
}

.aboutInfo-label {
  margin-bottom: 10px;
}
</style>