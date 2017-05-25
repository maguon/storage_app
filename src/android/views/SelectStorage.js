import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as StorageAction from '../../actions/StorageAction'
import { List, ListItem, Text, Right } from 'native-base'

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
        //console.log('this.props.chageParkingId',this.props.chageParkingId)
        let i = 0
        let storages = this.props.storages.storages.map(item => {
            i++
            return (
                <ListItem key={i} button onPress={() => Actions.SelectRow({ storageId: item.id, storageName: item.storage_name, _popNum: this.props._popNum, chageParkingId: this.props.chageParkingId })}>
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
        storages: state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageAction.getStorageList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectStorage)