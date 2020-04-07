import {post, get} from '@/utils/request'

const getMenus = async() => {
  return get('/api/admin/user/front/menus')
}

const getInfo = async() => {
  return get('/api/admin/user/front/info')
}

export {
  getMenus,
  getInfo
}
