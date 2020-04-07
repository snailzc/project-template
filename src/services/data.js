import {post, get} from '../utils/request';

export async function getUser(params) {
  const sorter = params.orderColumn ? `&orderColumn=${params.orderColumn}&order=${params.order}` : '';
  return get(`/api/admin/dataAuth/user/pageList?page=${params.page}&limit=${params.limit}&beginDate=${params.beginDate}&endDate=${params.endDate}&jobNo=${params.jobNo}&accountType=${params.accountType}${sorter}`);
}

export async function getTree(params) {
  return get(`/api/admin/dataAuth/tree/${params.appCode}`);
}

export async function getType(params) {
  return get(`/api/admin/appCode/dataType/get?appCode=${params.appCode}`);
}

export async function getUserPower(params) {
  return get(`/api/admin/dataAuth/user/get/${localStorage.appcode}/${params.userId}`);
}

export async function add(params, uri) {
  return post(`/api${uri}`, params);
}
