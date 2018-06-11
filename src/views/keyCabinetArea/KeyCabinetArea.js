import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    InteractionManager,
    TouchableOpacity
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import KeyCabinetAreaHeader from './keyCabinetAreaHeader/KeyCabinetAreaHeader'
import * as actions from '../../actions'

const renderListItem = props => {
    const { item: { area_name = '', row = 0, col = 0, car_key_cabinet_id, id }, item, initParam, getCarKeyPositionCount, getCarKeyPositionCountWaiting,
        getKeyList, getKeyListWaiting } = props
    return (
        <TouchableOpacity onPress={() => {
            getCarKeyPositionCountWaiting()
            getKeyListWaiting()
            Actions.keyCabinetInfo({ initParam: { keyCabinetArea: item, ...initParam } })
            InteractionManager.runAfterInteractions(() => {
                getCarKeyPositionCount({ carKeyCabinetId: car_key_cabinet_id, areaId: id })
                getKeyList({ carKeyCabinetId: car_key_cabinet_id, areaId: id })
            })
        }} style={{ backgroundColor: '#fff', margin: 5, padding: 5, borderWidth: 0.5, borderColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>{area_name}</Text>
                <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>{row}</Text> 排 <Text style={globalStyles.styleColor}>{col}</Text> 列</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={globalStyles.smallText}>总位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{row * col}</Text></Text>
                {/* <Text style={globalStyles.smallText}>剩余位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>365</Text></Text> */}
            </View>
        </TouchableOpacity>
    )
}

const KeyCabinetArea = props => {
    const { initParam, keyCabinetAreaReducer: { data: { keyCabinetAreaList }, getKeyCabinetAreaList },
        getCarKeyPositionCount, getCarKeyPositionCountWaiting, getKeyList, getKeyListWaiting } = props
    return (
        <Container>
            <KeyCabinetAreaHeader initParam={initParam} />
            {getKeyCabinetAreaList.isResultStatus == 1 && <Spinner color={styleColor} />}
            {getKeyCabinetAreaList.isResultStatus != 1 && <FlatList
                style={{ backgroundColor: '#ebeef0', padding: 5 }}
                keyExtractor={(item, index) => index}
                data={keyCabinetAreaList}
                renderItem={param => renderListItem({ initParam, getCarKeyPositionCount, getCarKeyPositionCountWaiting, getKeyList, getKeyListWaiting, ...param })} />}
        </Container>
    )
}

const mapStateToProps = (state) => ({
    keyCabinetAreaReducer: state.keyCabinetAreaReducer
})


const mapDispatchToProps = (dispatch) => ({
    getCarKeyPositionCount: param => {
        dispatch(actions.keyCabinetInfoHeader.getCarKeyPositionCount(param))
    },
    getCarKeyPositionCountWaiting: () => {
        dispatch(actions.keyCabinetInfoHeader.getCarKeyPositionCountWaiting())
    },
    getKeyList: param => {
        dispatch(actions.keyCabinetInfo.getKeyList(param))
    },
    getKeyListWaiting: () => {
        dispatch(actions.keyCabinetInfo.getKeyListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyCabinetArea) 
