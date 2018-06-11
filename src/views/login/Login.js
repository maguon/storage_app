import React, { Component } from 'react'
import { View, Image, Dimensions, ToastAndroid, StatusBar, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { fontSizeCoeff } from '../../util/util'


const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16

const TextBox = props => {
    const { iconName, placeholderText, input: { onChange, ...restProps }, secureTextEntry = false } = props
    return (
        <Item rounded style={styles.item}>
            <Icon active name={iconName} style={styles.itemIcon} />
            <Input placeholder={placeholderText}
                placeholderTextColor='rgba(255,255,255,0.4)'
                selectionColor='rgba(255,255,255,0.4)'
                style={[globalStyles.largeText, styles.input]}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                {...restProps} />
        </Item>
    )
}

const Login = props => {
    const { loginReducer: { loginFlow: { isResultStatus } }, initialValues, formReducer, handleSubmit } = props
    return (
        <Container style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground
                source={{ uri: 'login_back' }}
                style={styles.backgroundImage} >
                <View style={{ paddingTop: 80 }}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: 'logo' }}
                            style={styles.logo} />
                    </View>
                    <View>
                        <Text style={[styles.appname]}>HONYA STORAGE</Text>
                    </View>
                </View>
                {isResultStatus == 1 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinkit type={'Circle'} color="#fff" size={70} isVisible={isResultStatus == 1} />
                </View>}
                {isResultStatus != 1 && <View style={styles.formContainer}><Field
                    name='mobile'
                    iconName='md-person'
                    placeholderText='请输入用户名'
                    component={TextBox} />
                    <Field
                        name='password'
                        secureTextEntry={true}
                        iconName='md-lock'
                        placeholderText='请输入密码'
                        component={TextBox} />
                    <Button style={[styles.itemButton, globalStyles.styleBackgroundColor]}
                        onPress={handleSubmit}>
                        <Text style={[globalStyles.midText, styles.buttonTittle]}>登录</Text>
                    </Button>
                    <TouchableOpacity style={styles.linkButton} onPress={() => Actions.retrievePassword()}>
                        <Text style={[globalStyles.midText, styles.linkButtonTittle]}>忘记密码？</Text>
                    </TouchableOpacity>
                </View>}
            </ImageBackground>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: window.width,
        height: window.width / 9 * 16,
        alignItems: 'center'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: window.width / 4 * 3,
        borderWidth: 0,
        marginTop: 20
    },
    itemIcon: {
        color: 'rgba(255,255,255,0.7)',
        marginLeft: 10
    },
    itemButton: {
        marginTop: 50,
        width: window.width / 4 * 3,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: 'rgba(255,255,255,0.7)'
    },
    buttonTittle: {
        color: '#fff'
    },
    linkButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 10
    },
    linkButtonTittle: {
        color: 'rgba(255,255,255,0.4)'
    },
    logoContainer: {
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 20,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center'
    },
    appname: {
        color: styleColor,
        marginTop: 20,
        fontSize: fontSizeCoeff * 26
    },
    formContainer: {
        marginTop: 30
    }
})


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        initialValues: state.loginReducer.data.user,
        formReducer: state.form
    }
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'loginForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch) => {
            dispatch(actions.login.login(values))
        }
    })(Login))
