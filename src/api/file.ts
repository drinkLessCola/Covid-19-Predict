import service from '@/utils/request'

export const uploadFile = (file: File) => {
  return service({
    url: `/upload`,
    method: 'post',
    data: file,
    headers: {
      "Content-Type": 'form-data'
    }
  })
}

export const getAllFile = () => {
  return service({
    url: '/file/getall',
    method: 'get'
  })
}

export const deleteFile = () => {
  return service({
    url: '/file/delete',
    method: 'delete'
  })
}

export const downloadFile = (filename: string) => {
  return service({
    url: `/file/download?filename=${filename}`,
    method: 'post'
  })
}