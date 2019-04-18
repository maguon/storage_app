import React from 'react'
import { connect } from 'react-redux'
import { file_host } from '../../../config/Host'
import SharePhotoView from '../../../components/share/SharePhotoView'
import * as actions from '../../../actions'

const StorageImagePhotoView = props => {
    const { carImageReducer: { data: { storageImageList, storageImageIndex } }, setStorageImageIndexForCarInfoImage } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: storageImageList.map(item => `${file_host}/image/${item.url}`), index: storageImageIndex }}
            onIndexChanged={(index) => setStorageImageIndexForCarInfoImage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setStorageImageIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setStorageImageIndexForCarInfoImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageImagePhotoView)