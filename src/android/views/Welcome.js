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
    //    localStorage.removeKey(localStorageKey.USER)

        localStorage.loadKey(localStorageKey.USER, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('localStorage', res)
            }
        })

        // console.log(localStorage)
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
        let { isJump, nextStep } = nextProps.welcome
        if (isJump) {
            if (nextStep == 'login') {
                Actions.login()
            }
            else if (nextStep == 'main') {
                Actions.main()
            }
            return false
        }
        return true
    }


    render() {
        const { version, lastVersion, force_update, url, isJump } = this.props.welcome
        return (
            <WelcomeLayout
                version={version}
                lastVersion={lastVersion}
                force_update={force_update}
                linkDownload={this.linkDownload}
                url={url}
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



