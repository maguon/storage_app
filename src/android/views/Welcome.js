import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as welcomeAction from '../../actions/WelcomeAction'
import { Actions } from 'react-native-router-flux'
import WelcomeLayout from '../layout/Welcome'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
        this.validateToken = this.validateToken.bind(this)


        //test

        // localStorage.saveKey(localStorageKey.USER, {
        //     userId: 38,
        //     token: '5hWW3WukLUjXf76za5WYmT8GEho=T3h88KJse50d872096784c5f040dd013826d4ba61dfac68bc54fb4f2aa7a48f01173c16692912c1bf6083951f08f85bd0faa9355',

        // })
        // localStorage.removeKey(localStorageKey.USER)

        // localStorage.loadKey(localStorageKey.USER, (err, res) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     else {
        //         console.log('localStorage', res)
        //     }
        // })

        console.log(localStorage)
        //test
    }


    componentDidMount() {
        this.props.getAppLastVersion({
            optionalParam: {
                app: 1,
                type: 1
            }
        })
    }

    validateToken() {
        this.props.validateToken()
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { welcome } = nextProps
        if (welcome.getVersion.isExecStatus == 1) {
            console.log('welcome.getVersion', '开始执行')
        } else if (welcome.getVersion.isExecStatus == 2) {
            if (welcome.getVersion.isResultStatus == 0) {
                console.log('welcome.getVersion执行成功', welcome.getVersion.data)
            } else if (welcome.getVersion.isResultStatus == 1) {
                console.log('welcome.getVersion执行错误', welcome.getVersion.errorMsg)
            }
            else if (welcome.getVersion.isResultStatus == 2) {
                console.log('welcome.getVersion执行失败', welcome.getVersion.failedMsg)
            }
        }


        if (welcome.valdateToken.isExecStatus == 1) {
            console.log('welcome.valdateToken', '开始执行')
        } else if (welcome.valdateToken.isExecStatus == 2) {
            if (welcome.valdateToken.isResultStatus == 0) {
                Actions.main()
                console.log('welcome.valdateToken 执行成功', welcome.getVersion.data)
            } else if (welcome.valdateToken.isResultStatus == 1) {

                console.log('welcome.valdateToken 执行错误', welcome.getVersion.errorMsg)
            }
            else if (welcome.valdateToken.isResultStatus == 2) {
                Actions.login()
                console.log('welcome.valdateToken 执行失败', welcome.getVersion.failedMsg)
            }
        }
        return true


    }


    render() {
        const { version, lastVersion, force_update, url, isJump } = this.props.welcome.getVersion.data
        return (
            <WelcomeLayout
                version={version}
                lastVersion={lastVersion}
                force_update={force_update}
                url={url}
                linkDownload={this.linkDownload}
                validateToken={this.validateToken}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        welcome: state.WelcomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAppLastVersion: (param) => {
        dispatch(welcomeAction.getAppLastVersion(param))
    },
    validateToken: () => {
        dispatch(welcomeAction.validateToken())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)



