import service from '@/utils/request'

interface ILiterature {
  id: string    // 主键
  title: string // 标题
  url: string   // 链接
}

export const getLiteratureList = () => {
  return service({
    url: '/refer',
    method: 'get'
  })
}

export const createLiterature = (data: ILiterature) => {
  return service({
    url: '/refer',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export const updateLiterature = (data: ILiterature, prevLiteratureName: string) => {
  return service({
    url: `/refer?preindex=${prevLiteratureName}`,
    method: 'put',
    data: JSON.stringify(data)
  })
}

export const deleteLiterature = (userName: string) => {
  // console.log(bookId)
  return service({
    url: `/refer/${userName}`,
    method: 'delete',
  })
}