import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions, Alert } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as LoginAction from '../../actions/LoginAction'
import { Actions } from 'react-native-router-flux'
import LoginLayout from '../layout/Login'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'


class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state = {
            textUserName: '',
            textPassword: ''
        }
        this.changPassword = this.changPassword.bind(this)
        this.changUserName = this.changUserName.bind(this)

    }
    componentDidMount() {
        localStorage.loadKey(localStorageKey.USER, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                this.setState({ textUserName: res.mobile })
                console.log('localStorage', res)
            }
        })
    }

    login(param) {
        this.props.login(
            {
                postParam: {
                    mobile: this.state.textUserName,
                    password: this.state.textPassword
                }
            }
        )
    }

    changUserName(userName) {
        this.setState({ textUserName: userName })
    }

    changPassword(password) {
        this.setState({ textPassword: password })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { isJump, isLoginSuccess } = nextProps.loginInfo
        if (isJump) {
            if (isLoginSuccess) {
                Actions.main()
            }
            else {
                Alert.alert('账号密码错误请重新登录')
            }
            return false
        }
        return true
    }

    render() {
        // const { loginInfo } = this.props

        return <LoginLayout
            login={this.login}
            textUserName={this.state.textUserName}
            textPassword={this.state.textPassword}
            changUserName={this.changUserName}
            changPassword={this.changPassword}
        />
    }

}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (param) => {
        dispatch(LoginAction.login(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)