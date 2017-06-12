import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TopBar from '../components/Bar/TopBar'
import CarCamera from '../components/CarCamera/CarCamera'
import { Actions } from 'react-native-router-flux'
import * as ImportCarCameraAction from '../../actions/ImportCarCameraAction'
import { Button } from 'native-base'



class ImportCarCamera extends Component {
    constructor(props) {
        super(props)
        this.postImage = this.postImage.bind(this)
    }

    

    postImage(param) {
        let { userId, mobile, userType } = this.props.user
        let { carId, vin } = this.props
        param.requiredParam = {
            userId: userId,
            carId: carId,
            vin: vin
        }
        param.optionalParam = {
            imageType: 1
        }
        param.postFileParam.key = "image"

        param.postParam = {
            username: mobile,
            userId: userId,
            userType: userType,
        }
        this.props.pushCarImage(param)
    }


    shouldComponentUpdate(nextProps, nextState) {
        let { ImportCarCameraReducer } = nextProps

        /*importCarImage执行状态*/
        if (ImportCarCameraReducer.importCarImage.isExecStatus == 1) {
            console.log('ImportCarCameraReducer.importCarImage', '开始执行')
        } else if (ImportCarCameraReducer.importCarImage.isExecStatus == 2) {
            if (ImportCarCameraReducer.importCarImage.isResultStatus == 0) {
                console.log('ImportCarCameraReducer.importCarImage执行成功')
            } else if (ImportCarCameraReducer.importCarImage.isResultStatus == 1) {
                console.log('ImportCarCameraReducer.importCarImage执行错误')
            }
            else if (ImportCarCameraReducer.importCarImage.isResultStatus == 2) {
                console.log('ImportCarCameraReducer.importCarImage执行失败')
            }
        }
        /************************************************************************************************/

        /*delImage执行状态*/
        if (ImportCarCameraReducer.delImage.isExecStatus == 1) {
            console.log('ImportCarCameraReducer.delImage', '开始执行')
        } else if (ImportCarCameraReducer.delImage.isExecStatus == 2) {
            console.log('ImportCarCameraReducer.delImage', '执行完毕')
            if (ImportCarCameraReducer.delImage.isResultStatus == 0) {
                console.log('CarInfoReducer.delImage执行成功')
                this.props.resetDelImage()
            } else if (ImportCarCameraReducer.delImage.isResultStatus == 1) {
                console.log('ImportCarCameraReducer.delImage执行错误')
                this.props.resetDelImage()

            } else if (ImportCarCameraReducer.delImage.isResultStatus == 2) {
                console.log('ImportCarCameraReducer.delImage执行失败')
                this.props.resetDelImage()
            }
        }
        /************************************************************************************************/

        return true
    }


    render() {
        let { imageList } = this.props.ImportCarCameraReducer.importCarImage.data
        return (
            <View style={{ flex: 1 }}>
                <TopBar title='上传图片' />
                <ScrollView>
                    <CarCamera images={imageList} postImage={(param) => this.postImage(param)} showImagePage={Actions.ImagePageForImportCar} />
                    <Button block onPress={Actions.main} style={{ marginHorizontal: 30, marginVertical: 30, backgroundColor: '#00cade' }} >
                        <Text style={{ color: '#ffffff' }}>返回</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        ImportCarCameraReducer: state.ImportCarCameraReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    pushCarImage: (param) => {
        dispatch(ImportCarCameraAction.pushCarImage(param))
    },
    resetDelImage: () => {
        dispatch(ImportCarCameraAction.resetDelImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCarCamera)