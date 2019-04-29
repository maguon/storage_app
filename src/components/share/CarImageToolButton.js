import React from 'react'
import { Text, View, TouchableOpacity, InteractionManager } from 'react-native'
import globalStyles from '../../util/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CarImageToolButton = props => {
    // console.log('props', props)
    const { initParam: { carId }, getCarInfoWaiting, getCarInfo } = props
    return (
        <TouchableOpacity onPress={() => {
            getCarInfoWaiting()
            Actions.makePDF()
            InteractionManager.runAfterInteractions(() => { getCarInfo({ carId }) })
        }}>
            {/* <Text style={[globalStyles.midText, { color: '#fff' }]}>生成pdf</Text> */}
            <MaterialCommunityIcons name='file-pdf' style={{fontSize:25,color:'#fff'}}/>
        </TouchableOpacity>
    )
}


const mapDispatchToProps = (dispatch) => ({
    getCarInfoWaiting: () => {
        dispatch(actions.makePDF.getCarInfoWaiting())
    },
    getCarInfo: (param) => {
        dispatch(actions.makePDF.getCarInfo(param))
    }
})
export default connect(null, mapDispatchToProps)(CarImageToolButton) 