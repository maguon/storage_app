import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import Select from '../../components/share/form/Select'
import { Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as routerDirection from '../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../util/GlobalStyles'

const SearchKey = props => {
    const { getKeyCabinetListWaiting, getKeyCabinetList, getKeyCabinetAreaListWaiting, getKeyCabinetAreaList, getKeyListWaiting, getKeyList,
        parent, handleSubmit, formValue = {} } = props
    return (
        <Container>
            <Content>
                <Field
                    name='carKeyCabinet'
                    label='钥匙柜名称'
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
                {formValue.carKeyCabinet && <Field
                    name='carKeyCabinetArea'
                    label='扇区'
                    component={Select}
                    onPress={({ onChange }) => {
                        getKeyCabinetAreaListWaiting()
                        routerDirection.keyCabinetAreaList(parent)({
                            onSelect: (param) => {
                                const { id, area_name } = param
                                onChange({ id, value: area_name, item: param })
                                Actions.pop()
                            }
                        })
                        InteractionManager.runAfterInteractions(() => getKeyCabinetAreaList({ carKeyCabinetId: formValue.carKeyCabinet.id }))
                    }}
                />}
                {formValue.carKeyCabinet && formValue.carKeyCabinetArea && < Field
                    name='carKeyCabinetAreaRow'
                    label='排'
                    component={Select}
                    onPress={({ onChange }) => routerDirection.keyCabinetRowList(parent)({
                        onSelect: onChange,
                        rowList: Array.from({ length: formValue.carKeyCabinetArea.item.row }, (v, i) => ({ id: i + 1, value: i + 1 }))
                    })}
                />}
                {formValue.carKeyCabinet && formValue.carKeyCabinetArea && <Field
                    name='carKeyCabinetAreaCol'
                    label='号'
                    component={Select}
                    onPress={({ onChange }) => routerDirection.keyCabinetColList(parent)({
                        onSelect: onChange,
                        colList: Array.from({ length: formValue.carKeyCabinetArea.item.col }, (v, i) => ({ id: i + 1, value: i + 1 }))
                    })}
                />}
                <Button block onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15 }]}>
                    <Text style={[globalStyles.midText, { color: '#fff', }]}>搜索</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    formValue: getFormValues('SearchKeyForm')(state)
})

const mapDispatchToProps = (dispatch) => ({
    getKeyCabinetListWaiting: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetListWaiting())
    },
    getKeyCabinetList: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetList())
    },
    getKeyCabinetAreaList: param => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaList(param))
    },
    getKeyCabinetAreaListWaiting: () => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SearchKeyForm',
    enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        const { parent } = props
        const { carKeyCabinet, carKeyCabinetArea, carKeyCabinetAreaRow = { id: null }, carKeyCabinetAreaCol = { id: null } } = values
        dispatch(actions.keyCabinetInfo.getKeyListWaiting())
        routerDirection.keyOfCarList(parent)({ initParam: { carKeyCabinetAreaRow, carKeyCabinetAreaCol } })
        InteractionManager.runAfterInteractions(() => dispatch(actions.keyCabinetInfo.getKeyList({
            carKeyCabinetId: carKeyCabinet && carKeyCabinet.id ? carKeyCabinet.id : null,
            areaId: carKeyCabinetArea && carKeyCabinetArea.id ? carKeyCabinetArea.id : null
        })))
    }
})(SearchKey)) 
