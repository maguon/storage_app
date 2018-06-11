/**
 * Created by rbyu on 2017/5/19.
 */
import { handleActions } from 'redux-actions'
import localStorageKey from '../../util/LocalStorageKey'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 1,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        },
        deviceInfo: {
            deviceToken: ''
        },
        userlocalStorage: {}
    },
    initAPP: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行暂停),3(全部执行成功),4(执行结束，跳转到登录)
        step: 0,               //第N步已经执行成功
    },
    //getVersion.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(版本过低，强制更新)
    validateVersion: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //getVersion.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    loadLocalStorage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //getVersion.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    validateToken: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        param: {}
    },
    initXGPush: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [actionTypes.init.init_app_waiting]: (state, action) => {
        return {
            ...state,
            initAPP: {
                ...initialState.initAPP,
                isResultStatus: 1,
            }
        }
    },



    [actionTypes.init.valdate_version_success]: (state, action) => {
        const { payload: { versionInfo, step } } = action
        return {
            ...state,
            data: {
                ...state.data,
                version: {
                    ...versionInfo
                }
            },
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 2,
            },
            initAPP: {
                ...state.initAPP,
                step
            }
        }
    },
    [actionTypes.init.valdate_version_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 4,
                failedMsg
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.init.valdate_version_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 3,
                errorMsg
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.init.valdate_version_low]: (state, action) => {
        const { payload: { versionInfo, step } } = action
        return {
            ...state,
            data: {
                version: {
                    ...versionInfo
                }
            },
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 5,
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 2
            }
        }
    },



    // [actionTypes.init.init_XGPush_success]: (state, action) => {
    //     const { payload: { step, deviceToken } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             deviceInfo: {
    //                 deviceToken
    //             }
    //         },
    //         initXGPush: {
    //             ...initialState.initXGPush,
    //             isResultStatus: 2
    //         },
    //         initAPP: {
    //             ...state.initAPP,
    //             step
    //         }
    //     }
    // },
    // [actionTypes.init.init_XGPush_failed]: (state, action) => {
    //     const { payload: { failedMsg } } = action
    //     return {
    //         ...state,
    //         initXGPush: {
    //             ...initialState.initXGPush,
    //             isResultStatus: 4,
    //             failedMsg
    //         },
    //         initAPP: {
    //             ...state.initAPP,
    //             isResultStatus: 2
    //         }
    //     }
    // },
    // [actionTypes.init.init_XGPush_error]: (state, action) => {
    //     const { payload: { errorMsg } } = action
    //     return {
    //         ...state,
    //         initXGPush: {
    //             ...initialState.initXGPush,
    //             isResultStatus: 3,
    //             errorMsg
    //         },
    //         initAPP: {
    //             ...state.initAPP,
    //             isResultStatus: 2
    //         }
    //     }
    // },


    [actionTypes.init.load_localStorage_success]: (state, action) => {
        const { payload: { userlocalStorage, step } } = action
        return {
            ...state,
            data: {
                ...state.data,
                userlocalStorage: { ...userlocalStorage }
            },
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 2,
            },
            initAPP: {
                ...state.initAPP,
                step
            }
        }
    },
    [actionTypes.init.load_localStorage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 4,
                failedMsg
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 4
            }
        }
    },
    [actionTypes.init.load_localStorage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 3,
                errorMsg
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 4
            }
        }
    },



    [actionTypes.init.validate_token_success]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: 1,
                step
            }
        }
    },
    [actionTypes.init.validate_token_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                failedMsg,
                isResultStatus: 4
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 4
            }
        }
    },
    [actionTypes.init.validate_token_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 3,
                errorMsg
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 4
            }
        }
    },


    [actionTypes.init.init_app_complete]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            initAPP: {
                ...state.initAPP,
                step,
                isResultStatus: 3
            }
        }
    }

}, initialState)