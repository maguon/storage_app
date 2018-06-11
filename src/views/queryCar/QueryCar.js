import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    InteractionManager
} from 'react-native'
import { Container, Content, Button } from 'native-base'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Select from '../../components/share/form/Select'
import TextBox from '../../components/share/form/TextBox'
import DatePicker from '../../components/share/form/DatePicker'
import CheckBox from '../../components/share/form/CheckBox'
import globalStyles from '../../util/GlobalStyles'
import * as routerDirection from '../../util/RouterDirection'
import * as actions from '../../actions'


const { width } = Dimensions.get('window')
const margin = 15

const QueryCar = props => {
    const { getMakeListWaiting, getMakeList, parent, formValue = {}, getModelList, getModelListWaiting,
        getEntrustListWaiting, getEntrustList, getStorageListWaiting, getStorageList, handleSubmit } = props
    return (
        <Container>
            <Content>
                <Field name='vinCode' label='vin：' component={TextBox} />
                <Field
                    name='make'
                    label='制造商：'
                    component={Select}
                    onPress={({ onChange }) => {
                        getMakeListWaiting()
                        routerDirection.makeList(parent)({
                            onSelect: (param) => {
                                const { id, make_name } = param
                                onChange({ id, value: make_name, item: param })
                            }
                        })
                        InteractionManager.runAfterInteractions(getMakeList)
                    }}
                />
                {formValue.make && formValue.make.id && <Field
                    name='model'
                    label='型号：'
                    component={Select}
                    onPress={({ onChange }) => {
                        getModelListWaiting()
                        routerDirection.modelList(parent)({
                            onSelect: (param) => {
                                const { id, model_name } = param
                                onChange({ id, value: model_name, item: param })
                            }
                        })
                        InteractionManager.runAfterInteractions(() => getModelList({ makeId: formValue.make.id }))
                    }}
                />}
                <Field
                    name='entrust'
                    label='委托方：'
                    component={Select}
                    onPress={({ onChange }) => {
                        getEntrustListWaiting()
                        routerDirection.entrustList(parent)({
                            onSelect: (param) => {
                                const { id, short_name } = param
                                onChange({ id, value: short_name, item: param })
                            }
                        })
                        InteractionManager.runAfterInteractions(getEntrustList)
                    }}
                />
                <Field
                    label='是否MSO：'
                    name='msoStatus'
                    listTitle='维修类型'
                    itemList={[{ id: '1', value: '否' }, { id: '2', value: '是' }]}
                    component={CheckBox} />
                <Field
                    name='storage'
                    label='仓库：'
                    component={Select}
                    onPress={({ onChange }) => {
                        getStorageListWaiting()
                        routerDirection.storageList(parent)({
                            onSelect: (param) => {
                                const { id, storage_name } = param
                                onChange({ id, value: storage_name, item: param })
                            }
                        })
                        InteractionManager.runAfterInteractions(getStorageList)
                    }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Field
                        label='入库日期从：'
                        name='enterStart'
                        itemStyle={{ width: width / 2 - 5 }}
                        component={DatePicker}
                    />
                    <Field
                        label='到：'
                        name='enterEnd'
                        itemStyle={{ width: width / 2 - 40 }}
                        bodyStyle={{ marginLeft: 0 }}
                        component={DatePicker}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Field
                        label='出库日期从：'
                        name='realStart'
                        itemStyle={{ width: width / 2 - 5 }}
                        component={DatePicker}
                    />
                    <Field
                        label='到：'
                        name='realEnd'
                        itemStyle={{ width: width / 2 - 40 }}
                        bodyStyle={{ marginLeft: 0 }}
                        component={DatePicker}
                    />
                </View>
                <Button block onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff', }]}>搜索</Text>
                </Button>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    formValue: getFormValues('SearchCarForm')(state)
})

const mapDispatchToProps = (dispatch) => ({
    getMakeList: () => {
        dispatch(actions.makeList.getMakeList())
    },
    getMakeListWaiting: () => {
        dispatch(actions.makeList.getMakeListWaiting())
    },
    getModelList: param => {
        dispatch(actions.modelList.getModelList(param))
    },
    getModelListWaiting: () => {
        dispatch(actions.modelList.getModelListWaiting())
    },
    getEntrustList: () => {
        dispatch(actions.entrustList.getEntrustList())
    },
    getEntrustListWaiting: () => {
        dispatch(actions.entrustList.getEntrustListWaiting())
    },
    getStorageList: () => {
        dispatch(actions.storageList.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(actions.storageList.getStorageListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'SearchCarForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            dispatch(actions.carList.queryCarWaiting())
            Actions.carList()
            InteractionManager.runAfterInteractions(() => {
                dispatch(actions.carList.queryCar(values))
            })
        }
    })(QueryCar))
