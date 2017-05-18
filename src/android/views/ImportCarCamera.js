import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TopBar from '../components/Bar/TopBar'
import CarCamera from '../components/CarCamera'
import { Actions } from 'react-native-router-flux'
import * as ImportCarCameraAction from '../../actions/ImportCarCameraAction'

class ImportCarCamera extends Component {
    constructor(props) {
        super(props)
        this.postImage = this.postImage.bind(this)
    }

    postImage(param) {
        param.requiredParam = {
            userId: 3,
            carId: 265,
            vin: 'test1'
        }
        param.optionalParam = {
            imageType: 1
        }
        param.postFileParam.key = "image"

        param.postParam = {
            username: "honya",
            userId: 3,
            userType: 1
        }
        console.log('postImage', param)
        this.props.pushCarImage(param)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBar title='上传图片' />
                <ScrollView>
                    <CarCamera images={this.props.images.images} postImage={(param) => this.postImage(param)} />
                    <Button title='确定' onPress={Actions.main} />
                </ScrollView>
            </View>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        images: state.ImportCarCameraReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    pushCarImage: (param) => {
        dispatch(ImportCarCameraAction.pushCarImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCarCamera)