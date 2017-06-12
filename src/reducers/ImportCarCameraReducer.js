import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    importCarImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            recordId: 0,
            imageList: []
        }
    },
    delImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCarImage: {
                ...state.importCarImage,
                data: {
                    imageList: [...state.importCarImage.data.imageList, data.img],
                    recordId: data.recordId
                },
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCarImage: {
                ...state.importCarImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            importCarImage: {
                ...state.importCarImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCarImage: {
                ...state.importCarImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.importCarCameraTypes.RESET_IMPORT_CAR_IMAGE]: (state, action) => {
        return {
            ...state,
            importCarImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                data: {
                    imageList: []
                }
            }
        }
    },
    [actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCarImage: {
                ...state.importCarImage,
                data: {
                    ...state.importCarImage.data,
                    imageList: state.importCarImage.data.imageList.filter((item) => { return item != data })
                }
            },
            delImage: {
                ...state.delImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.importCarCameraTypes.RESET_IMPORTCARIMAGE]: (state, action) => {
        return {
            ...state,
            delImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: ''
            }
        }
    }
}, initialState)