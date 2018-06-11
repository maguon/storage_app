import React, { Component } from 'react'
import { Header, Title, Button, Icon, Right, Left, Body, Label, Item, Input, Text } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Field, reduxForm, change, getFormValues, reset } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const TextBox = props => {
    const { input: { onChange, ...restProps }, getCarList, getCarListWaiting, cleanCarList } = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholderTextColor='#000'
                style={[globalStyles.midText, styles.input]}
                onChangeText={(text) => {
                    onChange(text)
                    if (text.length <= 5) {
                        cleanCarList()
                    } else {
                        getCarListWaiting()
                        getCarList({ vinCode: text })
                    }
                }}
                {...restProps} />
            <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
        </View>
    )
}

const NavSearchCarForCreateCarBar = props => {
    const { title, layout, getCarListWaiting, getCarList, cleanCarList, changeVinCode, formValues, cleanCreateCar,
        searchCarForCreateCarReducer: { data: { carList } } } = props
    return (
        <View style={[styles.container, { width: layout.initWidth }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={styleColor}
                style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={() => {
                        cleanCarList()
                        Actions.pop()
                    }}>
                        <Icon name="arrow-back" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field name='vinCode' component={TextBox} cleanCarList={cleanCarList} getCarList={getCarList} getCarListWaiting={getCarListWaiting} />
                </Body>
                <Right style={styles.right}>
                    <Button transparent onPress={() => {
                        if (formValues && formValues.vinCode && formValues.vinCode.length == 17) {
                            if (!carList.filter(item => item.vin == formValues.vinCode).length) {
                                cleanCreateCar()
                                cleanCarList()
                                changeVinCode(formValues.vinCode)
                                Actions.pop()
                            } else {
                                ToastAndroid.show('您输入的vin已存在，请重新输入！', ToastAndroid.SHORT)
                            }
                        } else {
                            ToastAndroid.show('您输入的vin只能是17位，请重新输入！', ToastAndroid.SHORT)
                        }
                    }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>新增</Text>
                    </Button>
                </Right>
            </Header>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        formValues: getFormValues('searchCarForCreateCarForm')(state),
        searchCarForCreateCarReducer: state.searchCarForCreateCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: param => {
        dispatch(actions.searchCarForCreateCar.getCarList(param))
    },
    getCarListWaiting: () => {
        dispatch(actions.searchCarForCreateCar.getCarListWaiting())
    },
    cleanCarList: () => {
        dispatch(actions.searchCarForCreateCar.cleanCarList())
    },
    changeVinCode: param => {
        dispatch(change('addInfoForCreateCarForm', 'vinCode', { id: param, value: param }))
    },
    cleanCreateCar: () => {
        dispatch(actions.addImageForCreateCar.cleanCreateCar())
        dispatch(reset('addInfoForCreateCarForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchCarForCreateCarForm'
})(NavSearchCarForCreateCarBar))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 4
    },
    right: {
        flex: 1
    },
    leftIcon: {
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 3
    },
    input: {
        flex: 1,
        paddingVertical: 0
    },
    inputIcon: {
        paddingHorizontal: 5,
        color: '#fff'
    }
})

