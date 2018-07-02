import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        imageList: [],
        videoUrl: null,
        recordId: 0,
        index: 0
    },
    uploadCarImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getImageForCreateCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadCarVideo:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.addImageForCreateCar.upload_imageForCreateCar_success]: (state, action) => {
        const { payload: { imageList, recordId } } = action

        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_imageForCreateCar_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg, recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_imageForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_imageForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_imageForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.addImageForCreateCar.del_imageForCreateCar_success]: (state, action) => {
        const { payload: { imageurl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: state.data.imageList.filter(item => item != imageurl)
            },
            delImage: {
                ...initialState.delImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addImageForCreateCar.del_imageForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addImageForCreateCar.del_imageForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addImageForCreateCar.del_imageForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.addImageForCreateCar.get_imageForCreateCar_success]: (state, action) => {
        const { payload: { imageList, recordId, videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList,
                recordId,
                videoUrl
            },
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addImageForCreateCar.get_imageForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addImageForCreateCar.get_imageForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addImageForCreateCar.get_imageForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.addImageForCreateCar.upload_videoForCreateCar_success]: (state, action) => {
        const { payload: { videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                videoUrl
            },
            uploadCarVideo: {
                ...initialState.uploadCarVideo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_videoForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadCarVideo: {
                ...initialState.uploadCarVideo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_videoForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            uploadCarVideo: {
                ...initialState.uploadCarVideo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addImageForCreateCar.upload_videoForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadCarVideo: {
                ...initialState.uploadCarVideo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.addImageForCreateCar.clean_imageForCreateCar]: (state, action) => {
        return {
            ...initialState
        }
    },

    [actionTypes.addImageForCreateCar.set_indexForUploadImageForCreateCar]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    }
}, initialState)