import React, { Component } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { Provider, connect } from 'react-redux'

import CarViews from '../components/CarViews'
import RecordList from '../components/RecordList'
import * as CarAction from '../../../actions/CarAction'

import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../../../reducers'
import ReduxThunk from 'redux-thunk'

import Camera from '../components/Camera'
import VinScanner from '../components/VinScanner'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

class Home extends Component {
    constructor(props) {
        super(props)
        this.testing = this.testing.bind(this)
        this.getTestCarList = this.getTestCarList.bind(this)
    }
    getTestCarList() {
        return [{ id: 1, wake_name: '1' }, { id: 2, wake_name: '2' }]
    }

    testing() {
         this.props.getCarAll()
        //Alert.alert(this.getTestCarList().length.toString())

        // console.log(1111)  
    }

    render() {
        return (
            
                <View>
                    {/*<Camera></Camera>*/}

                    {/*<FileUpload></FileUpload>*/}
                    <VinScanner></VinScanner>
                    <CarViews carlist={this.props.cars}></CarViews>
                    <RecordList></RecordList>
                    <Text>new home</Text>
                    <Button
                        onPress={this.testing}
                        title="testing"
                        color="#841584"
                    />
                </View>
           
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cars: state.CarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarAll: () => {
        dispatch(CarAction.getCarAll())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
