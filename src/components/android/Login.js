import React, { Component, PropTypes } from 'react'
import { View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import * as LoginAction from '../../actions/LoginAction';
import { Actions } from 'react-native-router-flux';
import { Button, Container, Content, Header, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem } from 'native-base';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { LoginInfo, login, changeUserName, changePassword } = this.props;
        return (

            <Container>
                <Body style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 20, paddingRight: 20 }}>
                    <Form style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", height: 220 }}>
                        <Item style={{ flex: 1, height: 70, marginLeft: 0 }} >
                            <Icon name='ios-call' style={{ color: '#2874F0' }} />
                            <Input secureTextEntry={true}
                                placeholder="Phone"
                                onChangeText={(text) => changeUserName(text)}
                                value={LoginInfo.username} />
                        </Item>
                        <Item style={{ flex: 1, height: 70, marginLeft: 0 }} >
                            <Icon name='ios-key' style={{ color: '#2874F0' }} />
                            <Input secureTextEntry={true}
                                placeholder="Password"
                                onChangeText={(text) => changePassword(text)}
                                value={LoginInfo.password} />
                        </Item>
                        <Button block iconLeft style={{ marginTop: 20 }} onPress={() => { login(LoginInfo.username, LoginInfo.password) }}>
                            <Icon name='ios-log-in' style={{ color: '#ffffff' }} /><Text>Login</Text>
                        </Button>
                    </Form>
                </Body>
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        LoginInfo: state.LoginReducer
    };
};

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        dispatch(LoginAction.login(username, password));
    },
    changeUserName: (val) => {
        dispatch(LoginAction.changeUserName(val));
    },
    changePassword: (val) => {
        dispatch(LoginAction.changePassword(val));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);