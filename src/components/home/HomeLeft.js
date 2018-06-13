import React from 'react'
import { InteractionManager } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { change } from 'redux-form'
import { connect } from 'react-redux'

const HomeLeft = props => {
    const { changeVinCode } = props
    return (
        <Button transparent onPress={() => Actions.vinScanner({
            barcodeReceived: e => {
                Actions.pop()
                InteractionManager.runAfterInteractions(() => {
                    Actions.queryCar()
                    InteractionManager.runAfterInteractions(() => {
                        changeVinCode(e.data)
                    })
                })
            }
        })}>
            <Icon name='ios-qr-scanner' />
        </Button>
    )
}


const mapDispatchToProps = (dispatch) => ({
    changeVinCode: param => {
        dispatch(change('SearchCarForm', 'vinCode', param))
    }
})


export default connect(null, mapDispatchToProps)(HomeLeft)
