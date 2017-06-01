import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as selectStorageForCarListAction from '../../actions/SelectStorageForCarListAction'
import { List, ListItem, Text, Right } from 'native-base'

class SelectStorageForCarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getSelectStorageListForCarList({
            optionalParam: {
                storageStatus: 1
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { selectStorageForCarListReducer } = nextProps
        /*getSelectStorageList 执行状态*/
        if (selectStorageForCarListReducer.getSelectStorageListForCarList.isExecStatus == 1) {
            console.log('selectStorageForCarListReducer.getSelectStorageListForCarList开始执行')
        } else if (selectStorageForCarListReducer.getSelectStorageListForCarList.isExecStatus == 2) {
            console.log('selectStorageForCarListReducer.getSelectStorageListForCarList执行完毕')
            if (selectStorageForCarListReducer.getSelectStorageListForCarList.isResultStatus == 0) {
                console.log('selectStorageForCarListReducer.getSelectStorageListForCarList执行成功')
                this.props.resetSelectStorageListForCarList()
            } else if (selectStorageForCarListReducer.getSelectStorageListForCarList.isResultStatus == 1) {
                console.log('selectStorageForCarListReducer.getSelectStorageListForCarList执行错误')
                this.props.resetSelectStorageListForCarList()
            } else if (selectStorageForCarListReducer.getSelectStorageListForCarList.isResultStatus == 2) {
                console.log('selectStorageForCarListReducer.getSelectStorageListForCarList执行失败')
                this.props.resetSelectStorageListForCarList()
            }
        }
        /************************************************************************************************/
        return true
    }

    render() {
        let { selectStorageListForCarList } = this.props.selectStorageForCarListReducer.getSelectStorageListForCarList.data
        let i = 0
        let storages = selectStorageListForCarList.map(item => {
            i++
            return (
                <ListItem key={i} button onPress={() => {
                    this.props.selectStorageListForCarList({
                        storage_name: item.storage_name,
                        id: item.id
                    })
                    Actions.pop()
                }}>
                    <Text key={i} >{item.storage_name}</Text>
                </ListItem>
            )
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择仓库'} />
                <ScrollView>
                    <List>
                        {storages}
                    </List>
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectStorageForCarListReducer: state.SelectStorageForCarListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSelectStorageListForCarList: (param) => {
        dispatch(selectStorageForCarListAction.getSelectStorageListForCarList(param))
    },
    resetSelectStorageListForCarList: () => {
        dispatch(selectStorageForCarListAction.resetSelectStorageListForCarList())
    },
    selectStorageListForCarList: (param) => {
        dispatch(selectStorageForCarListAction.selectStorageListForCarList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectStorageForCarList)