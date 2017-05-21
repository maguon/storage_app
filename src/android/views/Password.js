/**
 * Created by lingxue on 2017/4/19.
 */
import React, { Component, PropTypes } from 'react'
import { StatusBar, View, Navigator } from 'react-native'
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
            newPassword: ''
        }
    }

    changePassword() {
        this.props.changePassword({
            requiredParam: {
                userid: this.props.user.userId
            },
            postParam: {
                originPassword: this.state.originPassword,
                newPassword: this.state.newPassword
            }
        })
    }

    render() {
        // const { AppInfo } = this.props
        console.log(this.props.user)
        return (

            <Container>
                <NavBar title='修改密码' />
                <Body style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Form style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", height: 190 }}>
                        <Item floatingLabel style={{ flex: 1 }} >
                            <Label>Origin Password</Label>
                            <Input secureTextEntry={true} value={this.state.originPassword} onChangeText={(text) => this.setState({ originPassword: text })} />
                        </Item>
                        <Item floatingLabel style={{ flex: 1 }} >
                            <Label>New Password</Label>
                            <Input secureTextEntry={true} value={this.state.newPassword} onChangeText={(text) => this.setState({ newPassword: text })} />
                        </Item>
                        <Button block style={{ marginTop: 20 }} onPress={this.changePassword}>
                            <Text>OK</Text>
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Password)