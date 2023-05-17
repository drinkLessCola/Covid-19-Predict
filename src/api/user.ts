import service from '@/utils/request'

interface IUser {
  userName: string
  nickName: string
  password: string
  email: string
}

export const getUserList = () => {
  return service({
    url: '/users',
    method: 'get'
  })
}

export const createUser = (data: IUser) => {
  return service({
    url: '/users',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export const updateUser = (data: IUser, prevUserName: string) => {
  return service({
    url: `/users?prename=${prevUserName}`,
    method: 'put',
    data: JSON.stringify(data)
  })
}

export const deleteUser = (userName: string) => {
  // console.log(bookId)
  return service({
    url: `/users/${userName}`,
    method: 'delete',
  })
}

export const searchUser = (keyword: string) => {
  return service({
    url: `/users/${keyword}`,
    method: 'get'
  })
}