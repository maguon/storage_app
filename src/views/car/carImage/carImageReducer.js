import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        imageList: [],
        index:0,
        videoUrl: null
    },
    getImageListForCarInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updateCarImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    uploadCarVideo:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '' 
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carImage.get_imageListForCarInfo_success]: (state, action) => {
        const { payload: { imageList,videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList,
                videoUrl
            },
            getImageListForCarInfo: {
                ...state.getImageListForCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carImage.get_imageListForCarInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getImageListForCarInfo: {
                ...state.getImageListForCarInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carImage.get_imageListForCarInfo_waiting]: (state, action) => {
        return {
            ...state,
            getImageListForCarInfo: {
                ...state.getImageListForCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carImage.get_imageListForCarInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getImageListForCarInfo: {
                ...state.getImageListForCarInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.carImage.update_carImage_success]: (state, action) => {
        const { payload: { imageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carImage.update_carImage_partSuccess]: (state, action) => {
        const { payload: { failedMsg, imageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: [...state.data.imageList, ...imageList]
            },
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.carImage.update_carImage_waiting]: (state, action) => {
        return {
            ...state,
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carImage.update_carImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 4
            }
        }
    },
    [actionTypes.carImage.update_carImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carImage.upload_videoForCarInfo_success]: (state, action) => {
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
    [actionTypes.carImage.upload_videoForCarInfo_failed]: (state, action) => {
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
    [actionTypes.carImage.upload_videoForCarInfo_waiting]: (state, action) => {
        return {
            ...state,
            uploadCarVideo: {
                ...initialState.uploadCarVideo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carImage.upload_videoForCarInfo_error]: (state, action) => {
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

    [actionTypes.carImage.set_indexForCarInfoImage]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data:{
                ...state.data,
                index
            }
        }
    }
}, initialState)