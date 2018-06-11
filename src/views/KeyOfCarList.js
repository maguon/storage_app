import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner, Icon } from 'native-base'
import globalStyles, { styleColor } from '../util/GlobalStyles'
import ListEmptyComponent from '../components/share/ListEmptyComponent'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actions from '../actions'
import { Actions } from 'react-native-router-flux'

renderListItem = props => {
    const { index, item, item: { entrust_type = 0, short_name = '', make_name = '', model_name = '', vin = '',
        key_cabinet_name = '', area_name = '', row = '', col = '' }, getCarInfoOfKeyWaiting, getCarInfoOfKey } = props

    return (
        <TouchableOpacity style={styles.item} key={index} onPress={() => {
            getCarInfoOfKeyWaiting()
            Actions.keyInfo({ initParam: { keyInfo: item } })
            InteractionManager.runAfterInteractions(() => getCarInfoOfKey({ carId: item.car_id }))
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                <SimpleLineIcons name='key' style={{ fontSize: 16, paddingRight: 5, color: styleColor }} />
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{key_cabinet_name} {area_name} {row} <Text style={globalStyles.midText}>排</Text> {col} <Text style={globalStyles.midText}>号</Text></Text>
            </View>
            <View style={{ padding: 7.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor, { padding: 7.5 }]}>车辆vin码：{vin}</Text>
                <View style={{ flexDirection: 'row', padding: 7.5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-car' style={{ fontSize: 17, color: '#999', paddingRight: 3 }} />
                        <Text style={globalStyles.midText}>{make_name}/{model_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {entrust_type == 2 && <FontAwesome name='building' style={{ fontSize: 12, color: '#999', paddingRight: 3 }} />}
                        {entrust_type == 1 && <Icon name='ios-person' style={{ fontSize: 17, color: '#999', paddingRight: 3 }} />}
                        <Text style={globalStyles.midText}>{short_name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const KeyOfCarList = props => {
    const { onSelect, hasAll = false, keyCabinetInfoReducer: { data: { keyList }, getKeyList }, getCarInfoOfKey,
        getCarInfoOfKeyWaiting, initParam: { carKeyCabinetAreaRow, carKeyCabinetAreaCol } } = props
    const newkeyList = keyList.filter(item => {
        return item.car_id != 0
            && (!carKeyCabinetAreaRow.id || item.row == carKeyCabinetAreaRow.id)
            && (!carKeyCabinetAreaCol.id || item.col == carKeyCabinetAreaCol.id)
    })
    if (getKeyList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    style={{ backgroundColor: '#ebeef0' }}
                    keyExtractor={(item, index) => index}
                    data={hasAll ? [{ id: null, key_cabinet_name: '全部' }, ...newkeyList] : newkeyList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={param => renderListItem({ getCarInfoOfKey, getCarInfoOfKeyWaiting, ...param })}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 10,
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 0.5,
        backgroundColor: '#fff'
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(KeyOfCarList)
