import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions, Alert} from 'react-native'
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
        // BackAndroid.addEventListener('hardwareBackPress', () => true)
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
        let { loginInfo } = nextProps
        /*loginInfo执行状态*/
        if (loginInfo.isExecStatus == 1) {
            console.log('loginInfo开始执行')
        } else if (loginInfo.isExecStatus == 2) {
            console.log('loginInfo执行完毕')
            if (loginInfo.isResultStatus == 0) {
                this.props.resetLogin()
                Actions.main()
            } else if (loginInfo.isResultStatus == 1) {
                this.props.resetLogin()
                Alert.alert('登录错误', '请输入正确的账号与密码')
            } else if (loginInfo.isResultStatus == 2) {
                this.props.resetLogin()
                Alert.alert('登录错误', '请输入正确的账号与密码')
            }
        }

        return true
    }

    render() {

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
    },
    resetLogin: () => {
        dispatch(LoginAction.resetLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)