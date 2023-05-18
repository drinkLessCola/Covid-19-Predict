import service from '@/utils/request'

interface IPredict {
  date: string
  province: string
  real: string
  forcast: string
}

export const getPredictList = () => {
  return service({
    url: '/predict',
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

export const updatePredict = (data: IPredict, prevPredictName: string) => {
  return service({
    url: `/predict?prename=${prevPredictName}`,
    method: 'put',
    data: JSON.stringify(data)
  })
}

export const deletePredict = (predictId: string) => {
  // console.log(bookId)
  return service({
    url: `/predict/${predictId}`,
    method: 'delete',
  })
}
