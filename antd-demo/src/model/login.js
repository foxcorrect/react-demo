import _ from '../util/util'
import { routerRedux } from "dva/router"
import * as loginService from '../api/login';

export default {
    namespace: 'login',

    state: {
        currUser: {}
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname }) => {
                try {
                    let currUser = sessionStorage.getItem("currUser");
                    if (currUser) {
                        let currUser = JSON.parse(sessionStorage.getItem("currUser"))
                        dispatch({
                            type: "updateCurrUser",
                            payload: currUser
                        })
                    }
                } catch (err) {
                }

            })
        },
    },

    effects: {
        *login({ payload }, { call, put, select }) {
            let res = yield call(loginService.UserLogin, {
                username: payload.username,
                password: payload.password
            })
            if (res.data.user) {
                sessionStorage.setItem("currUser", JSON.stringify(res.data.user))
                yield put({
                    type: "updateCurrUser",
                    payload: res.data.user
                })
                yield put(routerRedux.push('/index'))
            }
        },
        // *loginOut({ payload }, { call, put }) {
        //     let res = yield call(loginService.UserLoginOut);
        //     if (res.data.success) {
        //         yield put(routerRedux.push('/login'));
        //     }
        // }
    },

    reducers: {
        updateCurrUser(state, { payload }) {
            return {
                ...state,
                currUser: payload
            };
        },
    }
};