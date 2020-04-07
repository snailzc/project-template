import {post} from '@/utils/request'

interface valueType {
  username: string,
  password: string,
}

const getToken = async(value: valueType) => {
  return post('/api/auth/jwt/token', value)
}

export {
  getToken
}
