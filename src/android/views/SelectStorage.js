import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as StorageAction from '../../actions/StorageAction'

class SelectStorage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList({
            optionalParam: {
                storageStatus: 1
            }
        })
    }

    render() {
        console.log(this.props.storages.storages)
        let storages = this.props.storages.storages.map(item => {
            return (
                <TouchableHighlight key={item.id} underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectRow({ storageId: item.id, storageName: item.storage_name })}>
                    <Text key={item.id} >{item.storage_name}</Text>
                </TouchableHighlight>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择仓库'} />
                <ScrollView>
                    {storages}
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        storages: state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageAction.getStorageList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectStorage)