import {post, get, del, put} from '@/utils/request';


export async function querGroupList(params) {
  const name = params.name ? `&name=${params.name}` : '';
  return get(`/api/admin/groupType/page?page=${params.page}&limit=${params.limit}${name}`);
}

export async function deleteGroup(params) {
  return del(`/api/admin/groupType/${params.id}`);
}

export async function updateGroupInfo(params) {
  return put(`/api/admin/groupType/${params.id}`, params);
}

export async function updateGroup(params) {
  return put(`/api/admin/group/${params.id}`, params);
}

export async function updateUserConnect(params) {
  return post('/api/admin/group/addGroupUsers', {
    groupId: params.id,
    members: params.members,
    leaders: params.leaders,
  });
}

export async function deleteUserConnect(params) {
  return del('/api/admin/group/delGroupUsers', {
    groupId: params.id,
    members: params.members,
    leaders: params.leaders,
  });
}

export async function deleteGroupRole(params) {
  return del(`/api/admin/group/${params.id}`);
}

export async function queryGroupTypeAll() {
  const appcode = localStorage.appcode ? `?appCode=${localStorage.appcode}` : '';
  return get(`/api/admin/groupType/all${appcode}`);
}

export async function queryTypeById(params) {
  const appcode = localStorage.appcode ? `&appCode=${localStorage.appcode}` : '';
  const namekey = params.searchGroup ? `&name=${params.searchGroup}` : '';
  return get(`/api/admin/group/tree?groupType=${params.id}${namekey}${appcode}`);
}

export async function queryTypeByUser(params,uri) {
  const appcode = localStorage.appcode ? `&appCode=${localStorage.appcode}` : '';
  const namekey = params.searchGroup ? `&userName=${params.searchGroup}` : '';
  return get(`/api${uri}?groupType=${params.id}${namekey}${appcode}`);
}

export async function queryRoleById(params) {
  return get(`/api/admin/group/${params.id}`);
}

// export async function queryConnectUser(params) {
//   return request(`/api/admin/group/${params.id}/user`);
// }

export async function querySearchUser(params) {
  return get(`/api/admin/user/notLinkedList?groupId=${params.id}&keyword=${params.name}&page=${params.page}&limit=${params.limit}`);
}

export async function queryRoleUser(params) {
  return get(`/api/admin/group/getGroupUsers?keyword=${params.keyword}&type=${params.type}&page=${params.page}&limit=${params.limit}&groupId=${params.groupId}`);
}

export async function queryPowerMenuChoose(params) {
  const appcode = localStorage.appcode ? `?appCode=${localStorage.appcode}` : '';
  return get(`/api/admin/group/${params.id}/authority/menu${appcode}`);
}

export async function queryPowerElements(params) {
  const appcode = localStorage.appcode ? `&appCode=${localStorage.appcode}` : '';
  return get(`/api/admin/element/list?menuId=${params.id}${appcode}`);
}

export async function queryPowerMenu() {
  const appcode = localStorage.appcode ? `?appCode=${localStorage.appcode}` : '';
  return get(`/api/admin/menu/tree${appcode}`);
}

export async function updatePowerMenu(params) {
  return post(`/api/admin/group/${params.id}/authority/menu`, {
    menuTrees: params.tree,
  });
}

export async function moveMenuElement(params) {
  const appCode = localStorage.appcode ? `${localStorage.appcode}` : '';
  return post(`/api/admin/group/${params.id}/authority/element/remove`, {
    menuId: params.menuId,
    elementId: params.elementId,
    appCode,
  });
}

export async function updateElement(params) {
  const appCode = localStorage.appcode ? `${localStorage.appcode}` : '';
  return post(`/api/admin/group/${params.id}/authority/element/update`, {
    menuId: params.menuId,
    elementId: params.elementId,
    appCode,
  });
}

export async function addMenuElement(params) {
  const appCode = localStorage.appcode ? `${localStorage.appcode}` : '';
  return post(`/api/admin/group/${params.id}/authority/element/add`, {
    menuId: params.menuId,
    elementId: params.elementId,
    appCode,
  });
}

export async function queryMenuElementChoose(params) {
  const appcode = localStorage.appcode ? `?appCode=${localStorage.appcode}` : '';
  return get(`/api/admin/group/${params.id}/authority/element${appcode}`);
}

export async function addGroupRole(params) {
  return post('/api/admin/group', params);
}
