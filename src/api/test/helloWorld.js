import request from '@/utils/request';

export function sayHello(params) {
    return request({
        url: 'tysoft/api/sayHello',
        method: 'get',
        params
    })
}


export const sayHello2 = query => {
    return request({
        url: 'api/sayHello',
        method: 'get',
        params: query
    });
};