import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers/index';
import * as LoginAction from '../../actions/LoginAction';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem } from 'native-base'



const window = Dimensions.get('window')


export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textUserName: '',
            textPassword: ''
        }
    }

    render() {
        let { login } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{ uri: 'login_back' }}
                    style={{ width: window.width, height: window.width / 9 * 16 }} />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.15)', width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'honya_logo_144' }}
                            style={{ width: 80, height: 80 }} />
                    </View>
                    <View>
                        <Text style={{ color: '#00b9cd', marginTop: 20, fontSize: 26, fontWeight: '100' }}>HONYA STORAGE</Text>
                    </View>
                    <View>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 50 }}>
                            <Icon active name='md-person' style={{ color: '#00b9cd', marginLeft: 10 }} />
                            <Input placeholder='USERNAME'
                                placeholderTextColor='#00b9cd'
                                style={{ color: '#00b9cd' }}
                                onChangeText={(text) => this.setState({ textUserName: text })}
                                value={this.state.textUserName} />
                        </Item>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 20 }}>
                            <Icon active name='md-lock' style={{ color: '#00b9cd', marginLeft: 10 }} />
                            <Input placeholder='PASSWORD'
                                placeholderTextColor='#00b9cd'
                                style={{ color: '#00b9cd' }}
                                secureTextEntry
                                onChangeText={(text) => this.setState({ textPassword: text })}
                                value={this.state.textPassword} />
                        </Item>
                        <Button style={{ marginTop: 50, width: window.width / 4 * 3, borderRadius: 25, backgroundColor: '#26c6da', justifyContent: 'center' }}
                            onPress={() => login(
                                {
                                    mobile: this.state.textUserName,
                                    password: this.state.textPassword
                                })}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </View>
            </View>

        )

    }
}


