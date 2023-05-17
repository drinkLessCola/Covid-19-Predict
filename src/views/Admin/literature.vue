<template>
  <CustomForm
    :dialog-title="dialogTitle"
    :fields="fields"
    :rules="validate"
    :create="createLiterature"
    :list="getLiteratureList"
    :delete="deleteLiterature"
    :update="update"
    creatable
    editable
    delable
  >
  </CustomForm>
</template>
<script setup>
import CustomForm from '@/components/CustomForm.vue'
import { getLiteratureList, createLiterature, updateLiterature, deleteLiterature } from '@/api/literature.ts'

const update = (updateData, oldData) => {
  console.log(updateData, oldData)
  return updateLiterature(updateData, oldData.index)
}
const dialogTitle = '参考文献'
const fields = [
  {
    prop: 'index',
    label: '索引',
    fixed: false,
    creationRequired: true,
    editable: true,
    isId: true,
    isAscendingOrder: true,
    rule: [
      { required: true, message: '请输入索引', trigger: 'blur' },
    ]
  },
  {
    prop: 'title',
    label: '标题',
    fixed: false,
    creationRequired: true,
    editable: true,
    rule: [
      { required: true, message: '请输入标题', trigger: 'blur' },
    ]
  },
  {
    prop: 'url',
    label: 'URL',
    fixed: false,
    creationRequired: true,
    editable: true,
    rule: [
      { required: true, message: '请输入 url', trigger: 'blur' },
    ]
  }
]
</script>