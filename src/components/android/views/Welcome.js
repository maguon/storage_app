import React, { Component, PropTypes } from 'react'
import { StatusBar, View, Text, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as welcomeAction from '../../../actions/WelcomeAction'
import * as appAction from '../../../actions/AppAction'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'

const window = Dimensions.get('window')

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = { enterText: 3 }
    }

    render() {
        const { getAppLastVersion } = this.props;
        getAppLastVersion();
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" ,
            /*width: window.width,
            height: window.height,
            backgroundColor:'#000000'*/

            }}>
                <Image source={{ uri: 'welcom_back' }} 
                 style={{ width: window.width, height: window.width / 9 * 16 }} 
                />
                <Button block
                    onPress={() => { Actions.login() }}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.73)', borderRadius: 25 }}>
                    <Text style={{ fontSize: 18, color: '#0078a7' }}>立即体验</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    toLogin: () => {
        dispatch(welcomeAction.toLogin());
    },
    getAppLastVersion: () => {
        dispatch(appAction.getAppLastVersion());
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Welcome)