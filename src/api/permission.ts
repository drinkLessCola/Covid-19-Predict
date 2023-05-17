import service from '@/utils/request'

export interface ILoginData {
  userName: string
  password: string
}

export interface ILoginRes {
  token: string
}

export const login = (userData: ILoginData): Promise<ILoginRes> => {
  return service({
    url: '/user/login',
    method: 'post',
    data: JSON.stringify(userData)
  })
}

// export const 