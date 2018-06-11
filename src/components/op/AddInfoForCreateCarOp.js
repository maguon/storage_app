import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

const AddInfoForCreateCarOp = props => {
    const { onSubmit, addInfoForCreateCarReducer: { data: { status }, modifyCar, createCar }, parent } = props
    if (createCar.isResultStatus == 1) {
        return (
            <Spinner color='#fff' size={'small'} />
        )
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                {status == 0 && createCar.isResultStatus != 1 && <Button transparent onPress={onSubmit}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
                {status == 0 && createCar.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && modifyCar.isResultStatus != 1 && <Button transparent onPress={onSubmit}>
                    <Text style={[globalStyles.midText, styles.text]}>修改</Text>
                </Button>}
                {status == 1 && modifyCar.isResultStatus == 1 && <Spinner color='#fff' size={'small'} />}
                {status == 1 && <Button transparent onPress={Actions.addImageForCreateCar}>
                    <Text style={[globalStyles.midText, styles.text]}>下一步</Text>
                </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        addInfoForCreateCarReducer: state.addInfoForCreateCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => {
        dispatch(submit('addInfoForCreateCarForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoForCreateCarOp)
