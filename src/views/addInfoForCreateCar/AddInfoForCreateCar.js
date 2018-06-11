import React, { Component } from 'react'
import {
    StyleSheet,
    InteractionManager,
    View,
    Text
} from 'react-native'
import { Button, Container, Content, ListItem } from 'native-base'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as routerDirection from '../../util/RouterDirection'
import TextBox from '../../components/share/form/TextBox'
import Select from '../../components/share/form/Select'
import RichTextBox from '../../components/share/form/RichTextBox'
import DatePicker from '../../components/share/form/DatePicker'
import CheckBox from '../../components/share/form/CheckBox'
import { required, requiredObj } from '../../util/Validator'
import { Actions } from 'react-native-router-flux'
import colorList from '../../util/colors.json'
import globalStyles from '../../util/GlobalStyles'

const requiredValidator = required('必选')
const requiredObjValidator = requiredObj('必选')

const AddInfoForCreateCar = props => {
    const { parent, formValues, getEntrustList, getEntrustListWaiting, getMakeList, getMakeListWaiting, getModelListWaiting,
        getModelList, changeForm, getCarListWaiting, getCarList, changeSearchForm } = props
    console.log('props', props)
    return (
        <Container>
            <Content>
                <Field
                    name='vinCode'
                    label='vin'
                    isRequired={true}
                    validate={[requiredObjValidator]}
                    component={Select}
                    onPress={({ onChange }) => {
                        if (formValues && formValues.vinCode && formValues.vinCode.id) {
                            getCarListWaiting()
                            Actions.searchCarForCreateCar({
                                onSelect: (param) => {
                                    changeForm(param)
                                    Actions.pop()
                                }
                            })
                            InteractionManager.runAfterInteractions(() => {
                                changeSearchForm(formValues.vinCode.id)
                                getCarList({ vinCode: formValues.vinCode.id })
                            })
                        } else {
                            Actions.searchCarForCreateCar({
                                onSelect: (param) => {
                                    changeForm(param)
                                    Actions.pop()
                                }
                            })
                        }
                    }} />
                <Field
                    name='make'
                    label='制造商'
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
                {formValues && formValues.make && formValues.make.id && <Field
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
                        InteractionManager.runAfterInteractions(() => getModelList({ makeId: formValues.make.id }))
                    }}
                />}
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
                    validate={[requiredObjValidator]}
                    isRequired={true}
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
                    name='valuation'
                    label='车辆估值'
                    validate={[requiredValidator]}
                    component={TextBox}
                    isRequired={true} />
                <Field
                    isRequired={true}
                    label='是否MSO'
                    name='msoStatus'
                    validate={[requiredObjValidator]}
                    listTitle='维修类型'
                    itemList={[{ id: '1', value: '否' }, { id: '2', value: '是' }]}
                    component={CheckBox} />
                <Field
                    name='remark'
                    label='备注'
                    component={RichTextBox} />
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    formValues: getFormValues('addInfoForCreateCarForm')(state),
    //state
})

const mapDispatchToProps = (dispatch) => ({
    getEntrustList: () => {
        dispatch(actions.entrustList.getEntrustList())
    },
    getEntrustListWaiting: () => {
        dispatch(actions.entrustList.getEntrustListWaiting())
    },
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
    getCarList: param => {
        dispatch(actions.searchCarForCreateCar.getCarList(param))
    },
    getCarListWaiting: () => {
        dispatch(actions.searchCarForCreateCar.getCarListWaiting())
    },
    changeSearchForm: param => {
        dispatch(change('searchCarForCreateCarForm', 'vinCode', param))
    },
    changeForm: param => {
        console.log('param', param)
        const { id, vin, make_id, make_name, model_id, model_name, colour, pro_date, entrust_id, short_name, valuation, remark, mso_status } = param
        dispatch(change('addInfoForCreateCarForm', 'vinCode', { id: vin, value: vin }))
        dispatch(change('addInfoForCreateCarForm', 'make', { id: make_id, value: make_name }))
        dispatch(change('addInfoForCreateCarForm', 'model', { id: model_id, value: model_name }))
        dispatch(change('addInfoForCreateCarForm', 'colour', { id: colour, value: colour ? colorList.find(item => item.colorId == colour).colorName : null }))
        dispatch(change('addInfoForCreateCarForm', 'proDate', { id: pro_date ? pro_date : null, value: pro_date ? pro_date : null }))
        dispatch(change('addInfoForCreateCarForm', 'entrust', { id: entrust_id, value: short_name }))
        dispatch(change('addInfoForCreateCarForm', 'valuation', valuation ? `${valuation}` : null))
        dispatch(change('addInfoForCreateCarForm', 'msoStatus', mso_status == 1 ? { id: '1', value: '否' } : { id: '2', value: '是' }))
        dispatch(change('addInfoForCreateCarForm', 'remark', remark))
        dispatch(actions.addInfoForCreateCar.setCreateCarStatusModify({ carId: id, vin }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'addInfoForCreateCarForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            dispatch(actions.addInfoForCreateCar.submit({ values }))
        }
    })(AddInfoForCreateCar))

