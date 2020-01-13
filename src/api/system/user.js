import request from '@/utils/request';

export function addUser(data) {
    return request({
        url: 'api/user/add',
        method: 'post',
        data
    })
}