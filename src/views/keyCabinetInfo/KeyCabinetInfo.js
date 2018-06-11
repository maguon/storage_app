import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import KeyCabinetInfoHeader from './keyCabinetInfoHeader/KeyCabinetInfoHeader'
import * as actions from '../../actions'

const renderListItem = props => {
    const { item: { vin = '', model_name = '', make_name = '', entrust_type = 0, short_name = '', col = 0, row = 0 },
        item, initParam, getCarInfoOfKey, getCarInfoOfKeyWaiting } = props
    return (
        <TouchableOpacity onPress={() => {
            getCarInfoOfKeyWaiting()
            Actions.keyInfo({ initParam: { keyInfo: item, ...initParam } })
            InteractionManager.runAfterInteractions(() => getCarInfoOfKey({ carId: item.car_id }))
        }} style={{ backgroundColor: '#fff', margin: 5, borderWidth: 0.5, borderColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
                <SimpleLineIcons name='key' style={{ fontSize: 14, paddingRight: 3 }} />
                <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>{row}</Text> 排 <Text style={globalStyles.styleColor}>{col}</Text> 号</Text>
            </View>
            <View style={{ paddingVertical: 7.5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 7.5 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>车辆vin码：{vin}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-car' style={{ fontSize: 17, color: '#999', paddingRight: 3 }} />
                        <Text style={globalStyles.smallText}>{make_name}／{model_name}</Text>
                    </View>
                    {entrust_type == 2 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name='building' style={{ fontSize: 12, color: '#999', paddingRight: 3 }} />
                        <Text style={[globalStyles.smallText]}>{short_name}</Text>
                    </View>}
                    {entrust_type == 1 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-person' style={{ fontSize: 17, color: '#999', paddingRight: 3 }} />
                        <Text style={[globalStyles.smallText]}>{short_name}</Text>
                    </View>}
                </View>
            </View>

        </TouchableOpacity>
    )
}

const KeyCabinetInfo = props => {
    const { initParam, keyCabinetInfoReducer: { data: { keyList }, getKeyList }, getCarInfoOfKey, getCarInfoOfKeyWaiting } = props
    return (
        <Container>
            <KeyCabinetInfoHeader initParam={initParam} />
            {getKeyList.isResultStatus == 1 && <Spinner color={styleColor} />}
            {getKeyList.isResultStatus != 1 && <FlatList
                style={{ backgroundColor: '#ebeef0', padding: 5 }}
                keyExtractor={(item, index) => index}
                data={keyList.filter(item => item.car_id != 0)}
                renderItem={param => renderListItem({ initParam, getCarInfoOfKey, getCarInfoOfKeyWaiting, ...param })} />}
        </Container>
    )
}


const mapStateToProps = (state) => ({
    keyCabinetInfoReducer: state.keyCabinetInfoReducer
})

const mapDispatchToProps = (dispatch) => ({
    getCarInfoOfKey: param => {
        dispatch(actions.keyInfo.getCarInfoOfKey(param))
    },
    getCarInfoOfKeyWaiting: () => {
        dispatch(actions.keyInfo.getCarInfoOfKeyWaiting())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyCabinetInfo)
