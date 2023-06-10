import service from '@/utils/request'

export interface IPredict {
  date: string
  province: string
  real: number
  forcast: number
}

export const getPredictList = (province: string) => {
  return service({
    url: `/predict/${province}`,
    method: 'get'
  })
}

export const createPredict = (data: IPredict) => {
  return service({
    url: '/predict',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// export const updatePredict = (data: IPredict, prevPredictName: string) => {
//   return service({
//     url: `/predict?prename=${prevPredictName}`,
//     method: 'put',
//     data: JSON.stringify(data)
//   })
// }

export const deletePredict = (predictId: string) => {
  // console.log(bookId)
  return service({
    url: `/predict/${predictId}`,
    method: 'delete',
  })
}
