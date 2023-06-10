import service from '@/utils/request'

interface IAboutInfo {
  brief: string    // 主键
  composition: string // 标题
  phone: string   // 链接
}

export const getAboutInfo = async (): Promise<IAboutInfo> => {
  const [ brief, composition, phone ] = await Promise.all([
    service({
      url: '/about/brief',
      method: 'get'
    }),
    service({
      url: '/about/composition',
      method: 'get'
    }),
    service({
      url: '/about/phone',
      method: 'get'
    })
  ])

  return {
    brief,
    composition,
    phone
  } as unknown as IAboutInfo
}

export const updateBrief = (brief: string) => {
  return service({
    url: `/about/brief`,
    method: 'put',
    data: brief
  })
}
export const updateComposition = (composition: string) => {
  return service({
    url: `/about/composition`,
    method: 'put',
    data: composition
  })
}

export const updatePhone = (phone: string) => {
  return service({
    url: `/about/phone`,
    method: 'put',
    data: phone
  })
}