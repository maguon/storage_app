/**
 * Created by lingxue on 2017/4/19.
 */
import React, { Component, PropTypes } from 'react'
import { StatusBar, View, Navigator, Alert } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as passwordAction from '../../actions/PasswordAction'
import localStorageKey from '../../util/LocalStorageKey'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import { Button, Container, Content, Header, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem, Toast } from 'native-base'

class Password extends Component {

    constructor(props) {
        super(props)
        this.changePassword = this.changePassword.bind(this)
        this.state = {
            originPassword: '',
            newPassword: '',
            againPassword: ''
        }
    }

    changePassword() {
        if (this.state.newPassword == this.state.againPassword) {
            this.props.changePassword({
                requiredParam: {
                    userId: this.props.user.userId
                },
                putParam: {
                    originPassword: this.state.originPassword,
                    newPassword: this.state.newPassword
                }
            })
        } else {
            Alert.alert('提示', '两次输入的新密码不同')
        }
    }



    shouldComponentUpdate(nextProps, nextState) {
        let { isResult, isSuccess } = nextProps.password
        // console.log('nextProps.password', nextProps.password)
        // console.log('nextState', nextState)
        if (isResult) {
            if (isSuccess) {
                // console.log('修改成功')
                this.props.resetPassword()
            }
            else {
                // console.log('修改失败')
                this.props.resetPassword()
            }
            return false
        }

        return true

    }

    render() {
        console.log(this.props.user)
        return (

            <Container>
                <NavBar title='修改密码' />
                <Body style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Form style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Item floatingLabel  >
                            <Label>原密码</Label>
                            <Input secureTextEntry value={this.state.originPassword} onChangeText={(text) => this.setState({ originPassword: text })} />
                        </Item>
                        <Item floatingLabel  >
                            <Label>新密码</Label>
                            <Input secureTextEntry value={this.state.newPassword} onChangeText={(text) => this.setState({ newPassword: text })} />
                        </Item>
                        <Item floatingLabel  >
                            <Label>再次输入新密码</Label>
                            <Input secureTextEntry value={this.state.againPassword} onChangeText={(text) => this.setState({ againPassword: text })} />
                        </Item>
                        <Button full style={{ marginHorizontal: 20, marginTop: 20, backgroundColor: '#00cade' }} onPress={this.changePassword}>
                            <Text>确定</Text>
                        </Button>
                    </Form>
                </Body>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        password: state.PasswordReducer,
        user: state.LoginReducer.user

    }
}

const mapDispatchToProps = (dispatch) => ({
    changePassword: (param) => {
        dispatch(passwordAction.changePassword(param))
    },
    resetPassword: () => {
        dispatch(passwordAction.resetPassword())
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(Password)