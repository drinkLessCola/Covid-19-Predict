<template>
  <CustomForm
    :dialog-title="dialogTitle"
    :fields="fields"
    :rules="validate"
    :create="createUser"
    :list="getUserList"
    :delete="deleteUser"
    :update="update"
    creatable
    editable
    delable
  >
    <template v-slot:operate>
      <el-button type="text" @click="updatePassword">修改密码</el-button>
    </template>
  </CustomForm>
</template>
<script setup>
import CustomForm from '@/components/CustomForm.vue'
import { getUserList, createUser, updateUser, deleteUser } from '@/api/user'

const update = (updateData, oldData) => {
  console.log(updateData, oldData)
  return updateUser(updateData, oldData.userName)
}
const dialogTitle = '用户'
const fields = [
  {
    prop: 'userName',
    label: '账号',
    fixed: false,
    isId: true,
    creationRequired: true,
    editable: true,
    rule: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]
    // width: 120
  },
  {
    prop: 'nickName',
    label: '用户昵称',
    fixed: false,
    creationRequired: true,
    editable: true,
    rule: [
      { required: true, message: '请输入用户昵称', trigger: 'blur' },
    ]
  },
  {
    prop: 'password',
    label: '密码',
    fixed: false,
    creationRequired: true,
    editable: false,
    invisible: true,
    rule: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  },
  {
    prop: 'email',
    label: '邮箱',
    fixed: false,
    creationRequired: true,
    editable: true,
    rule: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
    ]
    // width: 120
  },
  {
    prop: 'phonenumber',
    label: '联系方式',
    fixed: false,
    creationRequired: false,
    editable: true,
    rule: [
      { required: true, message: '请输入联系方式', trigger: 'blur' },
    ]
    // width: 120
  },
  {
    prop: 'userType',
    label: '权限等级',
    fixed: false,
    editable: true,
    options: [
      { label: '管理员', value: "1" },
      { label: '普通职员', value: "0" }
    ]
    // width: 120
  }
]

const updatePassword = () => {

}
</script>