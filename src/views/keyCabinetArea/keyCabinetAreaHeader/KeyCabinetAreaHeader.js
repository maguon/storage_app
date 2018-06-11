import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles from '../../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'

const KeyCabinetAreaHeader = props => {
    const { keyCabinetAreaHeaderReducer: { data: { keyPositionCount = 0 }, getCarKeyPositionCountForArea },
        initParam: { keyCabinet: { key_cabinet_name = '', position_count = 0, area_count = 0 } } } = props
    return (
        <View style={{ padding: 7.5, borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>{key_cabinet_name}</Text>
                <Text style={[globalStyles.smallText]}>总位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{position_count}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={[globalStyles.smallText]}>扇区  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{area_count}</Text></Text>
                <Text style={[globalStyles.smallText]}>剩余位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{getCarKeyPositionCountForArea.isResultStatus == 1 ? '----' : keyPositionCount}</Text></Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    keyCabinetAreaHeaderReducer: state.keyCabinetAreaHeaderReducer
})

export default connect(mapStateToProps)(KeyCabinetAreaHeader)
