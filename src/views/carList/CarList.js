import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container, Content, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actions from '../../actions'

const renderExported = props => {
    const { item: { vin = '', make_name = '', model_name = '', model_id, make_id, entrust_type, entrust_name = '', real_out_time, enter_time, colour, id },
        item, getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar } = props
    // moment.lang('en', {
    //     relativeTime: {
    //         future: "%s 后",
    //         past: "%s 前",
    //         s: "1 秒",
    //         ss: "%d 秒",
    //         m: "1 分",
    //         mm: "%d 分",
    //         h: "1 小时",
    //         hh: "%d 小时",
    //         d: "1 天",
    //         dd: "%d 天",
    //         M: "1 月",
    //         MM: "%d 月",
    //         y: "a 年",
    //         yy: "%d 年"
    //     }
    // });
    return (
        <TouchableOpacity onPress={() => {
            getRecordListForCarWaiting()
            getCarInfoWaiting()
            Actions.car({ initParam: { carId: id, vin } })
            InteractionManager.runAfterInteractions(() => {
                getRecordListForCar({ carId: id })
                getCarInfo(item)
            })
        }}
            style={{ marginHorizontal: 10, marginTop: 10, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 0.5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>vin：{vin}</Text>
                <Text style={[globalStyles.midText, { color: '#aaa' }]}>出库</Text>
            </View>
            <View style={{ padding: 7.5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-log-in' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{enter_time ? moment(enter_time).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-car' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{make_name} {make_id && model_id && '／'} {model_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-log-out' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{real_out_time ? moment(real_out_time).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    {!!colour && <View style={{ width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5, backgroundColor: `#${colour}` }} />}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {entrust_type == 1 && <Icon name='ios-person' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />}
                        {entrust_type == 2 && <FontAwesome name='building' style={{ fontSize: 12, color: '#999', paddingRight: 3 }} />}
                        <Text style={globalStyles.midText}>{entrust_name}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-clock' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{moment(real_out_time).fromNow()}</Text>
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}


const renderNeverImport = props => {
    const { item: { id, vin = '', entrust_name = '', colour }, item, getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar } = props
    return (
        <TouchableOpacity onPress={() => {
            getRecordListForCarWaiting()
            getCarInfoWaiting()
            Actions.car({ initParam: { carId: id, vin } })
            InteractionManager.runAfterInteractions(() => {
                getRecordListForCar({ carId: id })
                getCarInfo(item)
            })
        }}
            style={{ marginHorizontal: 10, marginTop: 10, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 0.5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>vin:{vin}</Text>
                <Text style={[globalStyles.midText, { color: 'red' }]}>未入库</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='ios-person' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                    <Text style={globalStyles.midText}>{entrust_name}</Text>
                </View>
                {!!colour && <View style={{ width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5, backgroundColor: `#${colour}` }} />}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='ios-clock' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                    <Text style={globalStyles.midText}>3 天</Text>
                </View> */}
            </View>
        </TouchableOpacity>
    )
}


const renderImported = props => {
    const { item: { vin = '', make_name = '', model_name = '', storage_name = '', make_id, model_id, area_name = '', entrust_type, entrust_name = '',
        plan_out_time, enter_time, colour, row = '', col = '', id }, item, getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar } = props
    return (
        <TouchableOpacity onPress={() => {
            getRecordListForCarWaiting()
            getCarInfoWaiting()
            Actions.car({ initParam: { carId: id, vin } })
            InteractionManager.runAfterInteractions(() => {
                getRecordListForCar({ carId: id })
                getCarInfo(item)
            })
        }}
            style={{ marginHorizontal: 10, marginTop: 10, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 0.5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>vin：{vin}</Text>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>在库</Text>
            </View>
            <View style={{ padding: 7.5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-log-in' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{enter_time ? moment(enter_time).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    {plan_out_time && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-clock' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{plan_out_time ? moment(plan_out_time).format('YYYY-MM-DD') : ''}</Text>
                    </View>}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-pin' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{storage_name} {area_name}-{row}-{col}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='ios-car' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />
                        <Text style={globalStyles.midText}>{make_name} {make_id && model_id && '／'} {model_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {entrust_type == 1 && <Icon name='ios-person' style={{ fontSize: 16, paddingRight: 5, color: '#777' }} />}
                        {entrust_type == 2 && <FontAwesome name='building' style={{ fontSize: 12, color: '#999', paddingRight: 3 }} />}
                        <Text style={globalStyles.midText}>{entrust_name}</Text>
                    </View>
                    {!!colour && <View style={{ width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5, backgroundColor: `#${colour}` }} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const CarList = props => {
    const { carListReducer: { data: { carList }, queryCar }, getRecordListForCarWaiting, getRecordListForCar, getCarInfoWaiting, getCarInfo } = props
    if (queryCar.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    style={{ backgroundColor: '#ebeef0' }}
                    data={carList}
                    renderItem={(param) => {
                        if (param.item.rel_status == 1) {
                            return renderImported({ getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar, ...param })
                        } else if (param.item.rel_status == 2) {
                            return renderExported({ getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar, ...param })
                        } else {
                            return renderNeverImport({ getCarInfoWaiting, getCarInfo, getRecordListForCarWaiting, getRecordListForCar, ...param })
                        }
                    }}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    carListReducer: state.carListReducer
})

const mapDispatchToProps = (dispatch) => ({
    getRecordListForCar: param => {
        dispatch(actions.carOpRecord.getRecordListForCar(param))
    },
    getRecordListForCarWaiting: () => {
        dispatch(actions.carOpRecord.getRecordListForCarWaiting())
    },
    getCarInfo: param => {
        dispatch(actions.carInfoEditor.getCarInfo(param))
    },
    getCarInfoWaiting: () => {
        dispatch(actions.carInfoEditor.getCarInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)

