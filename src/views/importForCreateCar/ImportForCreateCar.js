import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Container, Content, ListItem } from 'native-base'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import * as routerDirection from '../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'


const ImportForCreateCar = props => {
    const { getAreaList, getAreaListWaiting, getStorageListWaiting, getStorageList, getRowList, getRowListWaiting, getKeyCabinetListWaiting,
        getKeyCabinetList, getKeyCabinetAreaListWaiting, getKeyCabinetAreaList, getCarKeyPositionListWaiting, getCarKeyPositionList, formValue,
        importCar, updateCarKeyPosition, updatePlanOutTime, parent, importForCreateCarReducer: { data: { carInfo } } } = props
    return (
        <Container>
            <Content>
                {carInfo && carInfo.r_id && !carInfo.plan_out_time && <Field
                    label='计划出库日期'
                    name='planOutTime'
                    component={DatePicker}
                    onChange={(event, newValue, previousValue, name) => {
                        if (newValue != previousValue) {
                            updatePlanOutTime({ planOutTime: newValue })
                        }
                    }}
                />}
                {carInfo && carInfo.plan_out_time && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text>计划出库时间</Text>
                    <Text>{carInfo.plan_out_time ? `${moment(carInfo.plan_out_time).format('YYYY-MM-DD')}` : ''}</Text>
                </ListItem>}
                {(!carInfo || !carInfo.rel_status == 2) && <Field
                    name='area'
                    label='存放仓库'
                    component={Select}
                    onPress={({ onChange }) => {
                        getStorageListWaiting()
                        routerDirection.storageList(parent)({
                            onSelect: storage => {
                                const { id, storage_name } = storage
                                getAreaListWaiting()
                                routerDirection.areaList(parent)({
                                    onSelect: area => {
                                        const { id, area_name } = area
                                        onChange({ id, value: `${storage_name} ${area_name}`, area, storage })
                                        Actions.pop({ popNum: 2 })
                                    }
                                })
                                InteractionManager.runAfterInteractions(() => getAreaList({ storageId: id }))
                            }
                        })
                        InteractionManager.runAfterInteractions(getStorageList)
                    }}
                />}
                {carInfo && carInfo.rel_status == 1 && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text>存放仓库</Text>
                    <Text>{`${carInfo.storage_name} ${carInfo.area_name}`}</Text>
                </ListItem>}
                {(!carInfo || !carInfo.rel_status == 2) && formValue && formValue.area && <Field
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
                                                InteractionManager.runAfterInteractions(() => importCar({
                                                    parkingId: parking.id,
                                                    storageId: parking.storage_id,
                                                    storageName: parking.storage_name,
                                                    areaId: formValue.area.id,
                                                    areaName: formValue.area.area.area_name,
                                                    row: row.id,
                                                    col: col.id,
                                                    lot: parking.lot
                                                }))
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        InteractionManager.runAfterInteractions(() => getRowList({ storageId: formValue.area.storage.id, areaId: formValue.area.area.id }))
                    }}
                />}
                {carInfo && carInfo.rel_status == 1 && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text>存放位置</Text>
                    <Text>{`${carInfo.row}排 ${carInfo.col}列 ${carInfo.lot}单元格`}</Text>
                </ListItem>}
                {carInfo && carInfo.r_id && !carInfo.key_cabinet_id && <Field
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
                />}
                {carInfo && carInfo.r_id && carInfo.key_cabinet_id && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text>钥匙柜</Text>
                    <Text>{`${carInfo.key_cabinet_name}`}</Text>
                </ListItem>}
                {carInfo && carInfo.r_id && !carInfo.key_cabinet_id && formValue && formValue.keyCabinet && formValue.keyCabinet.id && <Field
                    name='keyCabinetPosition'
                    label='钥匙存放位置'
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
                                                InteractionManager.runAfterInteractions(() => updateCarKeyPosition({ carPosition }))
                                            }
                                        })
                                    }
                                })
                                InteractionManager.runAfterInteractions(() => getCarKeyPositionList({ carKeyCabinetId: formValue.keyCabinet.id, areaId: area.id }))
                            }
                        })
                        InteractionManager.runAfterInteractions(() => getKeyCabinetAreaList({ carKeyCabinetId: formValue.keyCabinet.id }))
                    }}
                />}
                {carInfo && carInfo.r_id && carInfo.key_cabinet_id && <ListItem style={{ justifyContent: 'space-between' }}>
                    <Text>钥匙存放位置</Text>
                    <Text>{`${carInfo.car_key_cabinet_area}扇区 ${carInfo.car_key_position_row}排 ${carInfo.car_key_position_col}号`}</Text>
                </ListItem>}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { importForCreateCarReducer: { data: { carInfo } } } = state
    let keyPosition, carArea, carPosition
    if (carInfo) {
        keyPosition = carInfo.car_key_cabinet_area ? `${carInfo.car_key_cabinet_area}扇区` : ''
        keyPosition += carInfo.car_key_position_row ? ` ${carInfo.car_key_position_row}排` : ''
        keyPosition += carInfo.car_key_position_col ? ` ${carInfo.car_key_position_col}号` : ''
        carArea = carInfo.storage_name ? `${carInfo.storage_name}` : ''
        carArea += carInfo.area_name ? `${carInfo.area_name}` : ''
        carPosition = carInfo.row ? `${carInfo.row}排` : ''
        carPosition += carInfo.col ? ` ${carInfo.col}列` : ''
        carPosition += carInfo.lot ? ` ${carInfo.lot}单元格` : ''
    }

    return {
        formValue: getFormValues('importForCreateCarForm')(state),
        importForCreateCarReducer: state.importForCreateCarReducer,
        initialValues: carInfo ? {
            area: { id: carInfo.area_id, value: carArea },
            position: { id: carInfo.p_id, value: carPosition },
            keyCabinet: { id: carInfo.key_cabinet_id, value: carInfo.key_cabinet_name },
            keyCabinetPosition: { id: carInfo.car_key_position_id, value: keyPosition },
            planOutTime: carInfo.plan_out_time ? moment(`${carInfo.plan_out_time}`).format('YYYY-MM-DD') : ''
        } : {}
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
    updateCarKeyPosition: param => {
        dispatch(actions.importForCreateCar.updateCarKeyPosition(param))
    },
    importCar: param => {
        dispatch(actions.importForCreateCar.importCar(param))
    },
    updatePlanOutTime: param => {
        dispatch(actions.importForCreateCar.updatePlanOutTime(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'importForCreateCarForm'
    })(ImportForCreateCar)) 