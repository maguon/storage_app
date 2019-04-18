import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Container, Content, Button, ListItem, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import TextBox from '../../../components/share/form/TextBox'
import Select from '../../../components/share/form/Select'
import DatePicker from '../../../components/share/form/DatePicker'
import CheckBox from '../../../components/share/form/CheckBox'
import RichTextBox from '../../../components/share/form/RichTextBox'
import moment from 'moment'
import * as routerDirection from '../../../util/RouterDirection'
import * as actions from '../../../actions'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'
import colorList from '../../../util/colors.json'

const CarInfoEditor = props => {
    const { formValue = {}, getMakeListWaiting, getMakeList, getModelListWaiting, getEntrustListWaiting, getEntrustList,
        getModelList, parent, cleanModel, handleSubmit, carInfoEditorReducer } = props
    if (carInfoEditorReducer.getCarInfo.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Content>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>vin</Text>
                        <Text style={globalStyles.midText}>{formValue.vin}</Text>
                    </ListItem>
                    <Field
                        name='make'
                        label='制造商'
                        component={Select}
                        onPress={({ onChange }) => {
                            getMakeListWaiting()
                            routerDirection.makeList(parent)({
                                onSelect: (param) => {
                                    const { id, make_name } = param
                                    if (id != formValue.make.id) {
                                        onChange({ id, value: make_name, item: param })
                                        cleanModel()
                                    }
                                }
                            })
                            InteractionManager.runAfterInteractions(getMakeList)
                        }}
                    />
                    <Field
                        name='model'
                        label='型号'
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
                    />
                    <Field
                        name='colour'
                        label='颜色'
                        component={Select}
                        ValueComponent={colorProps => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {!!colorProps.value.id && <View style={{ backgroundColor: `#${colorProps.value.id}`, width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5, marginRight: 5 }} />}
                                    <Text style={globalStyles.midText}>{colorProps.value.value}</Text>
                                </View>
                            )
                        }}
                        onPress={({ onChange }) => {
                            routerDirection.colorList(parent)({
                                onSelect: (param) => {
                                    const { colorId, colorName } = param
                                    onChange({ id: colorId, value: colorName })
                                }
                            })
                        }}
                    />
                    <Field
                        name='proDate'
                        label='生产年份'
                        component={Select}
                        onPress={({ onChange }) => {
                            routerDirection.yearList(parent)({
                                onSelect: (param) => {
                                    const { id, value } = param
                                    onChange({ id, value })
                                }
                            })
                        }}
                    />
                    <Field
                        name='entrust'
                        label='委托方'
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
                    <Field name='valuation' label='车辆估值' component={TextBox} />
                    <Field
                        label='是否MSO'
                        name='msoStatus'
                        listTitle='维修类型'
                        itemList={[{ id: '1', value: '否' }, { id: '2', value: '是' }]}
                        component={CheckBox} />
                    <Field
                        name='remark'
                        label='备注'
                        component={RichTextBox} />
                    <Button block onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { make_name, make_id, model_id, model_name, vin, entrust_name, entrust_id, mso_status, remark, valuation, pro_date, colour
    } = ownProps.carInfo
    // console.log('colour',colorName)
    //colour.replace(/\s+/g,"")
    return {
        formValue: getFormValues('carInfoEditorForm')(state),
        carInfoEditorReducer: state.carInfoEditorReducer,
        initialValues: {
            make: { id: make_id, value: make_name },
            model: { id: model_id, value: model_name },
            entrust: { id: entrust_id, value: entrust_name },
            msoStatus: { id: mso_status, value: mso_status == 2 ? '是' : '否' },
            remark,
            vin,
            colour: { id: colour ? colour.replace(/\s+/g, "") : null, value: colour ? colorList.find(item => item.colorId == colour.replace(/\s+/g, "")).colorName : null },
            valuation: valuation ? `${valuation}` : '0',
            proDate: { id: pro_date, value: pro_date }
        }
    }
}

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
    },
    cleanModel: () => {
        dispatch(change('carInfoEditorForm', 'model', { id: null, value: null }))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'carInfoEditorForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            const { initParam: { carId } } = props
            dispatch(actions.carInfoEditor.updateCarInfo({ carId, ...values }))
        }
    })(CarInfoEditor))

