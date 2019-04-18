import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const AddInfoForCreateCarLeftButton = props => {
    const { cleanCreateCar } = props
    return (
        <Button transparent onPress={() => {
            cleanCreateCar()
            Actions.pop()
        }}>
            <Icon name='arrow-back' />
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanCreateCar: () => {
        dispatch(actions.addImageForCreateCar.cleanCreateCar())
    }
})

export default connect(null, mapDispatchToProps)(AddInfoForCreateCarLeftButton)