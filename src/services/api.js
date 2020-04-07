import { stringify } from 'qs';
import {post, get, put, del} from '../utils/request';
import { getToken } from '../utils/usertoken';
import { FETCH_ENV } from '../utils/util';

const userToken = getToken();

export async function queryProjectNotice() {
  return get('/api/project/notice');
}

export async function getUrl() {
  return get('/wechat/auth/url?key=qrcode&redirectUrl=http://imuyuan.com');
}

export async function queryActivities() {
  return get('/api/activities');
}

export async function queryRule(params) {
  return get(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return post('/api/rule', params);
}

export async function addRule(params) {
  return post('/api/rule', params);
}

export async function fakeSubmitForm(params) {
  return post('/api/forms', params);
}

export async function fakeChartData() {
  return get('/api/fake_chart_data');
}

export async function queryTags() {
  return get('/api/tags');
}

export async function queryBasicProfile() {
  return get('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return get('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return get(`/api/fake_list?${stringify(params)}`);
}

export async function queryNotices() {
  return get('/api/notices');
}

// new
export async function fakeAccountLogin(params) {
  return post('/api/auth/jwt/token', params);
}

export async function queryMenu(token) {
  const userId = token || userToken;
  const url = '/api/admin/user/front/menus';
  return get(url, { Authorization: userId });
}


// 登出
export async function loginOut() {
  return post('/api/auth/jwt/logout');
}

// 单点登录登出
export async function singleLogout() {
  const domain = FETCH_ENV().split('cas')[0];
  return post(`${domain}cas/logout`);
}

export async function freashToken() {
  return post('api/auth/jwt/refresh');
}

export async function queryMenuTree() {
  const appcode = localStorage.appcode
    ? `?appCode=${localStorage.appcode}`
    : `?appCode=${localStorage.curCode}`;
  return get(`/api/admin/menu/tree${appcode}`);
}

export async function queryMenuId(params) {
  return get(`/api/admin/menu/${params.id}`);
}

export async function putMenu(params, uri) {
  return put(`/api${uri}/${params.id}`, params);
}

export async function deleteMenu(params, uri) {
  return del(`/api${uri}`, {id: params.id})
}

export async function queryAddMenu(params, uri) {
  return post(`/api${uri}`, params);
}

export async function queryResourceList(params) {
  const menuId = params.menuId
    ? `&menuId=${params.menuId}`
    : '';
  const name = params.name
    ? `&name=${params.name}`
    : '';
  const appcode = localStorage.appcode
    ? `&appCode=${localStorage.appcode}`
    : '';
  return get(`/api/admin/element/list?page=${params.page}&limit=${params.limit}${menuId}${name}${appcode}`);
}

export async function deleteElement(params, uri) {
  return del(`/api${uri}/${params.id}`);
}

export async function addElement(params, uri) {
  return post(`/api${uri}`, params);
}

export async function putElement(params, uri) {
  return put(`/api${uri}/${params.id}`, params);
}

export async function getDictTree(params) {
  return get(`/api/admin/dict/v1/page?page=${params.page}&limit=${params.limit}&keyword=${params.name}`);
}

export async function getChildDictTree(params) {
  return get(`/api/admin/dict/v1/child/page?page=${params.page}&limit=${params.limit}&keyword=${params.name}&parentId=${params.id}`);
}

export async function queryDictTreeId(params) {
  return get(`/api/admin/dict/${params.id}`);
}

export async function putDict(params, uri) {
  return put(`/api${uri}/${params.id}`, params);
}

export async function deleteDict(params, uri) {
  return del(`/api${uri}/${params.id}`);
}

export async function queryAddDict(params, uri) {
  return post(`/api${uri}`, params);
}

export async function sendCode(params) {
  return get(`/api/wechat/verificationCode/inner/send?jobNo=${params.jobNo}&cause=智能化养殖平台密码修改验证码`);
}

export async function getAppList() {
  return get('/api/admin/app/page?page=1&limit=20000');
}

export async function getCountOut(params) {
  return get(`api/admin/user/account/innerlist?jobNo=${params.jobNo}`);
}

export async function getCountInner(params) {
  return get(`api/admin/user/account/list?jobNo=${params.jobNo}`);
}

export async function getUserId(params) {
  return get(`/api/auth/jwt/tokenByWxQrCode?code=${params.code}`);
}

export async function validCode(params) {
  return get(`/api/wechat/verificationCode/inner/verify?code=${params.code}&jobNo=${params.jobNo}`);
}

export async function resetPsd(params) {
  return post('/api/admin/user/internal/resetpwd', params);
}

export async function getPhoneOut(params) {
  return get(`/api/admin/user/account/outlist?mobilePhone=${params.jobNo}`);
}

export async function getPhoneCode(params) {
  return get(`/api/admin/user/sendVerifyCodeByMobile?mobile=${params.jobNo}`);
}

// 获取用户在线和其他
export async function onlineUserOther(params) {
  return get(`/api/auth/online/user/count/`);
}
export async function onlineUser(params) {
  return get(`api/auth/online/user/count/${params}`);
}
//获取用户在线信息
export async function getOnlinePeople(params) {
  return get(`/api/hr_integrate/user/online/count/getUserInfo?${stringify(params)}`);
}
//2019年11月26日17:20:30 bylb  add 其他用户信息
export async function getOnlineOtherPeople(params) {
  return get(`/api/auth/online/other/user/count/info?appCode=`);
}



export async function userApi(params) {
  return post(`api/auth/online/user/${params}`);
}

export async function codeAPI(params) {
  return get(`/api/admin/user/sendVerifyCode?mobile=${params.mobile}`);
}


// 注册接口
export async function registerAPI(params) {
  return post('/api/admin/corp/register', params);
}

// 注册验证码校验
export async function validateCode(params) {
  return get(`/api/admin/user/verifyCode?mobile=${params.mobile || ''}&code=${params.code || ''}`);
}
