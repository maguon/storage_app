import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet,ScrollView } from 'react-native'
import { Provider, connect } from 'react-redux'


import * as CarAction from '../../../actions/CarAction'
import * as CarMakeAction from '../../../actions/CarMakeAction'


import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../../../reducers'
import ReduxThunk from 'redux-thunk'

import { Container, ListItem, InputGroup, Radio, Item, Header, Input, Segment, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'

import CarsView from '../components/CarsView'
import RecordList from '../components/RecordList'
import Camera from '../components/Camera'
import CarMake from '../components/CarMake'
import VinScanner from '../components/VinScanner'
import TopBar from '../components/TopBar'
import StoragesView from '../components/StoragesView'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

class Home extends Component {
    constructor(props) {
        super(props)
        this.testing = this.testing.bind(this)
        // this.getTestCarList = this.getTestCarList.bind(this)
    }
    // getTestCarList() {
    //     return [{ id: 1, wake_name: '1' }, { id: 2, wake_name: '2' }]
    // }

    testing() {
        //  this.props.getCarAll()
        this.props.getCarMakesAll()
        /*<View> 

                       <TopBar></TopBar>
 
 <Camera></Camera>

 <FileUpload></FileUpload>
 <VinScanner></VinScanner>
 <CarsView carlist={this.props.cars}></CarsView>
 <RecordList></RecordList>
 <CarMake carMakes={this.props.carMakes}></CarMake>
 <Text>new home</Text>
 <Button
     onPress={this.testing}
     title="testing"
     color="#841584"
 />

</View>*/
    }

    render() {
        return (
            <ScrollView >
                <StoragesView/>
                <RecordList/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

})


const mapStateToProps = (state) => {
    return {
        cars: state.CarReducer,
        carMakes: state.CarMakeReducer,
        storages:state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarAll: () => {
        dispatch(CarAction.getCarAll())
    },
    getCarMakesAll: () => {
        dispatch(CarMakeAction.getCarMakesAll())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
