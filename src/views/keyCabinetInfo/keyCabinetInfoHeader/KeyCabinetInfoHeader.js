import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { Container, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'
import globalStyles from '../../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const KeyCabinetInfoHeader = props => {
    const { initParam: { keyCabinetArea: { area_name = '', col = 0, row = 0 } },
        keyCabinetInfoHeaderReducer: { data: { keyPositionCount = 0 }, getKeyPositionCount } } = props
    return (
        <View style={{ padding: 7.5, borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>{area_name}</Text>
                <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>{row}</Text> 排 <Text style={globalStyles.styleColor}>{col}</Text> 列</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                <Text style={globalStyles.smallText}>总位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{row * col}</Text></Text>
                <Text style={globalStyles.smallText}>剩余位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{getKeyPositionCount.isResultStatus == 1 ? '----' : keyPositionCount}</Text></Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    keyCabinetInfoHeaderReducer: state.keyCabinetInfoHeaderReducer
})


export default connect(mapStateToProps)(KeyCabinetInfoHeader)
