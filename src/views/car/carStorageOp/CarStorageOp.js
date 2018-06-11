import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Container, Content, Button, ListItem } from 'native-base'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'
import moment from 'moment'
import Select from '../../../components/share/form/Select'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import * as routerDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import DatePicker from '../../../components/share/form/DatePicker'

const CarStorageOp = props => {
    const { carInfo: { rel_status, r_id, enter_time, p_id, plan_out_time, real_out_time, storage_id, storage_name, id, vin }, carInfo, parent, updateCarKeyPosition,
        getAreaList, getAreaListWaiting, getRowListWaiting, getRowList, formValue, updateCarPosition, getKeyCabinetListWaiting,
        getKeyCabinetList, getKeyCabinetAreaListWaiting, getKeyCabinetAreaList, getCarKeyPositionList, getCarKeyPositionListWaiting,
        getStorageListWaiting, getStorageList, importCar, exportCar, updatePlanOutTime } = props
    console.log('carInfo', carInfo)
    if (rel_status == 1) {
        return (
            <Container>
                <Content>
                    <View style={{ alignItems: 'flex-end', padding: 15, backgroundColor: '#f1f2f3', borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>在库</Text>
                    </View>
                    <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>入库时间</Text>
                        <Text style={globalStyles.midText}>{enter_time ? moment(enter_time).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </ListItem>
                    <Field
                        label='计划出库日期'
                        name='planOutTime'
                        component={DatePicker}
                        onChange={(event, newValue, previousValue, name) => {
                            if (newValue != previousValue) {
                                updatePlanOutTime({ relId: r_id, planOutTime: newValue, carId: id })
                            }
                        }}
                    />
                    <Field
                        name='area'
                        label='存放仓库'
                        component={Select}
                        onPress={({ onChange }) => {
                            getAreaListWaiting()
                            routerDirection.areaList(parent)({
                                onSelect: (param) => {
                                    const { id, area_name } = param
                                    onChange({ id, value: `${storage_name} ${area_name}`, item: param })
                                }
                            })
                            InteractionManager.runAfterInteractions(() => getAreaList({ storageId: storage_id }))
                        }}
                    />
                    <Field
                        name='position'
                        label='存放位置'
                        component={Select}
                        onPress={({ onChange }) => {
                            getRowListWaiting()
                            routerDirection.rowList(parent)({
                                onSelect: (row) => {
                                    routerDirection.colList(parent)({
                                        row: row.id,
                                        onSelect: (col) => {
                                            routerDirection.lotList(parent)({
                                                row: row.id,
                                                col: col.id,
                                                onSelect: (parking) => {
                                                    Actions.pop({ popNum: 3 })
                                                    InteractionManager.runAfterInteractions(() => updateCarPosition({ parking: { ...parking, area_name: formValue.area.value }, carId: id }))
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            InteractionManager.runAfterInteractions(() => getRowList({ storageId: storage_id, areaId: formValue.area.id }))
                        }}
                    />
                    <Field
                        name='keyCabinet'
                        label='钥匙柜'
                        component={Select}
                        onPress={({ onChange }) => {
                            getKeyCabinetListWaiting()
                            routerDirection.keyCabinetListForSelect(parent)({
                                onSelect: (param) => {
                                    const { id, key_cabinet_name } = param
                                    onChange({ id, value: key_cabinet_name, item: param })
                                }
                            })
                            InteractionManager.runAfterInteractions(getKeyCabinetList)
                        }}
                    />
                    <Field
                        name='keyCabinetPosition'
                        label='要是存放位置'
                        component={Select}
                        onPress={({ onChange }) => {
                            getKeyCabinetAreaListWaiting()
                            routerDirection.keyCabinetAreaList(parent)({
                                onSelect: area => {
                                    getCarKeyPositionListWaiting()
                                    routerDirection.keyCabinetRowFilterList(parent)({
                                        onSelect: row => {
                                            routerDirection.keyCabinetColFilterList(parent)({
                                                row: row.id,
                                                onSelect: carPosition => {
                                                    Actions.pop({ popNum: 3 })
                                                    InteractionManager.runAfterInteractions(() => updateCarKeyPosition({ carPosition, carId: id }))
                                                }
                                            })
                                        }
                                    })
                                    InteractionManager.runAfterInteractions(() => getCarKeyPositionList({ carKeyCabinetId: formValue.keyCabinet.id, areaId: area.id }))
                                }
                            })
                            InteractionManager.runAfterInteractions(() => getKeyCabinetAreaList({ carKeyCabinetId: formValue.keyCabinet.id }))
                        }}
                    />
                    <Button block onPress={() => exportCar({ relId: r_id, parkingId: p_id, storageId: storage_id, carId: id })} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>出库</Text>
                    </Button>
                </Content>
            </Container>)
    } else {
        return (
            <Container>
                <Content>
                    <View style={{ alignItems: 'flex-end', padding: 15, backgroundColor: '#f1f2f3', borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
                        <Text style={[globalStyles.midText]}>已出库</Text>
                    </View>
                    <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>入库时间</Text>
                        <Text style={globalStyles.midText}>{enter_time ? moment(enter_time).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </ListItem>
                    <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>计划出库日期</Text>
                        <Text style={globalStyles.midText}>{plan_out_time ? moment(`${plan_out_time}`).format('YYYY-MM-DD') : ''}</Text>
                    </ListItem>
                    <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>出库时间</Text>
                        <Text style={globalStyles.midText}>{real_out_time ? moment(`${real_out_time}`).format('YYYY-MM-DD') : ''}</Text>
                    </ListItem>
                    <Button block style={[globalStyles.styleBackgroundColor, { margin: 15 }]}
                        onPress={() => {
                            getStorageListWaiting()
                            routerDirection.storageList(parent)({
                                onSelect: storage => {
                                    getAreaListWaiting()
                                    routerDirection.areaList(parent)({
                                        onSelect: area => {
                                            getRowListWaiting()
                                            routerDirection.rowList(parent)({
                                                onSelect: row => {
                                                    routerDirection.colList(parent)({
                                                        row: row.id,
                                                        onSelect: col => {
                                                            routerDirection.lotList(parent)({
                                                                row: row.id,
                                                                col: col.id,
                                                                onSelect: (parking) => {
                                                                    Actions.pop({ popNum: 5 })
                                                                    importCar({
                                                                        carId: id,
                                                                        vin,
                                                                        parkingId: parking.id,
                                                                        storageId: parking.storage_id,
                                                                        storageName: parking.storage_name,
                                                                        areaId: area.id,
                                                                        areaName: area.area_name,
                                                                        row: row.id,
                                                                        col: col.id,
                                                                        lot: parking.lot
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                            InteractionManager.runAfterInteractions(() => getRowList({ storageId: storage.id, areaId: area.id }))
                                        }
                                    })
                                    InteractionManager.runAfterInteractions(() => getAreaList({ storageId: storage.id }))
                                }
                            })
                            InteractionManager.runAfterInteractions(getStorageList)
                        }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>入库</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { carInfo: { storage_name, area_id, area_name, row, col, lot, p_id, key_cabinet_name, key_cabinet_id,
        car_key_position_id, car_key_cabinet_area, car_key_position_col, car_key_position_row, plan_out_time } } = ownProps
    let keyPosition = car_key_cabinet_area ? `${car_key_cabinet_area}扇区` : ''
    keyPosition += car_key_position_row ? ` ${car_key_position_row}排` : ''
    keyPosition += car_key_position_col ? ` ${car_key_position_col}号` : ''
    return {
        carImageReducer: state.carImageReducer,
        formValue: getFormValues('carStorageOpForm')(state),
        initialValues: {
            area: { id: area_id, value: `${storage_name} ${area_name}` },
            position: { id: p_id, value: `${row}排 ${col}列 ${lot}单元格` },
            keyCabinet: { id: key_cabinet_id, value: key_cabinet_name },
            keyCabinetPosition: { id: car_key_position_id, value: keyPosition },
            planOutTime: plan_out_time ? moment(`${plan_out_time}`).format('YYYY-MM-DD') : ''
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAreaList: param => {
        dispatch(actions.areaList.getAreaList(param))
    },
    getAreaListWaiting: () => {
        dispatch(actions.areaList.getAreaListWaiting())
    },
    getStorageListWaiting: () => {
        dispatch(actions.storageList.getStorageListWaiting())
    },
    getStorageList: () => {
        dispatch(actions.storageList.getStorageList())
    },
    getRowList: param => {
        dispatch(actions.rowList.getParkingList(param))
    },
    getRowListWaiting: () => {
        dispatch(actions.rowList.getParkingListWaiting())
    },
    updateCarPosition: param => {
        dispatch(actions.carStorageOp.updateCarPosition(param))
    },
    updateCarKeyPosition: param => {
        dispatch(actions.carStorageOp.updateCarKeyPosition(param))
    },
    getKeyCabinetList: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetList())
    },
    getKeyCabinetListWaiting: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetListWaiting())
    },
    getKeyCabinetAreaList: param => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaList(param))
    },
    getKeyCabinetAreaListWaiting: () => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaListWaiting())
    },
    getCarKeyPositionList: param => {
        dispatch(actions.keyCabinetRowFilterList.getCarKeyPositionList(param))
    },
    getCarKeyPositionListWaiting: () => {
        dispatch(actions.keyCabinetRowFilterList.getCarKeyPositionListWaiting())
    },
    importCar: param => {
        dispatch(actions.carStorageOp.importCar(param))
    },
    exportCar: param => {
        dispatch(actions.carStorageOp.exportCar(param))
    },
    updatePlanOutTime: param => {
        dispatch(actions.carStorageOp.updatePlanOutTime(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'carStorageOpForm',
        enableReinitialize: true
    })(CarStorageOp))


