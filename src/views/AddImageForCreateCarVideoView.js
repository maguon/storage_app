import React from 'react'
import { connect } from 'react-redux'
import { file_host } from '../config/Host'
import VideoView from './VideoView'


const AddImageForCreateCarVideoView = props => {
    const { addImageForCreateCarReducer: { data: { videoUrl } }, loginReducer: { data: { user: { uid } } } } = props
    return (
        <VideoView initParam={{ videoUrl: `${file_host}/user/${uid}/file/${videoUrl}/video.mp4` }} />
    )
}

const mapStateToProps = (state) => ({
    addImageForCreateCarReducer: state.addImageForCreateCarReducer,
    loginReducer: state.loginReducer
})


export default connect(mapStateToProps)(AddImageForCreateCarVideoView)