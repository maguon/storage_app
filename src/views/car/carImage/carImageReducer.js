import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        // imageList: [],
        carImageList: [],
        storageImageList: [],
        transImageList: [],
        // index: 0,
        storageImageIndex: 0,
        carImageIndex: 0,
        transImageIndex: 0,
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
    updateTransImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updateStorageImage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    uploadCarVideo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carImage.get_imageListForCarInfo_success]: (state, action) => {
        const { payload: { carImageList, storageImageList, transImageList, videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carImageList,
                storageImageList,
                transImageList,
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
        const { payload: { carImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carImageList: [...state.data.carImageList, ...carImageList]
            },
            updateCarImage: {
                ...state.updateCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carImage.update_carImage_partSuccess]: (state, action) => {
        const { payload: { failedMsg, carImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carImageList: [...state.data.carImageList, ...carImageList]
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



    [actionTypes.carImage.update_transImage_success]: (state, action) => {
        const { payload: { transImageList } } = action
        
        return {
            ...state,
            data: {
                ...state.data,
                transImageList: [...state.data.transImageList, ...transImageList]
            },
            updateTransImage: {
                ...state.updateTransImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carImage.update_transImage_partSuccess]: (state, action) => {
        const { payload: { failedMsg, transImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                transImageList: [...state.data.transImageList, ...transImageList]
            },
            updateTransImage: {
                ...state.updateTransImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.carImage.update_transImage_waiting]: (state, action) => {
        return {
            ...state,
            updateTransImage: {
                ...state.updateTransImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carImage.update_transImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateTransImage: {
                ...state.updateTransImage,
                isResultStatus: 4
            }
        }
    },
    [actionTypes.carImage.update_transImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateTransImage: {
                ...state.updateTransImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [actionTypes.carImage.update_storageImage_success]: (state, action) => {
        const { payload: { storageImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                storageImageList: [...state.data.storageImageList, ...storageImageList]
            },
            updateStorageImage: {
                ...state.updateStorageImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carImage.update_storageImage_partSuccess]: (state, action) => {
        const { payload: { failedMsg, storageImageList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                storageImageList: [...state.data.storageImageList, ...storageImageList]
            },
            updateStorageImage: {
                ...state.updateStorageImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.carImage.update_storageImage_waiting]: (state, action) => {
        return {
            ...state,
            updateStorageImage: {
                ...state.updateStorageImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carImage.update_storageImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateStorageImage: {
                ...state.updateStorageImage,
                isResultStatus: 4
            }
        }
    },
    [actionTypes.carImage.update_storageImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateStorageImage: {
                ...state.updateStorageImage,
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


    [actionTypes.carImage.set_carImageIndexForCarInfoImage]: (state, action) => {
        const { payload: { carImageIndex } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carImageIndex
            }
        }
    },
    [actionTypes.carImage.set_storageImageIndexForCarInfoImage]: (state, action) => {
        const { payload: { storageImageIndex } } = action
        return {
            ...state,
            data: {
                ...state.data,
                storageImageIndex
            }
        }
    },
    [actionTypes.carImage.set_transImageIndexForCarInfoImage]: (state, action) => {
        const { payload: { transImageIndex } } = action
        return {
            ...state,
            data: {
                ...state.data,
                transImageIndex
            }
        }
    }
}, initialState)