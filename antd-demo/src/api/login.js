import request from '../util/request';

export function UserLogin(params) {
    return request({
        url: '/authentication',
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        data: JSON.stringify({
            name: params.username,
            password: params.password
        })
    })
}

// export function UserLoginOut() {
//     return request({
//         url: '/user/loginout',
//         method: 'POST',
//     })
// }
