import request from '@/utils/request';

export function addUser(data) {
    return request({
        url: 'api/user/add',
        method: 'post',
        data
    })
}

export function isExistAccount(params) {
    return request({
        url: 'api/user/isExistAccount',
        method: 'get',
        params
    })
}

export function changeUserState(params) {
  return request({
    url: 'api/user/changeUserState',
    method: 'get',
    params
  })
}


export function del(params) {
  return request({
    url: 'api/user/del',
    method: 'get',
    params
  })
}
