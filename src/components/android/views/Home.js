import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet, Button, ScrollView } from 'react-native'
import { Provider, connect } from 'react-redux'


import * as CarAction from '../../../actions/CarAction'
import * as CarMakeAction from '../../../actions/CarMakeAction'
import * as StorageAction from '../../../actions/StorageAction'
import * as RecordAction from '../../../actions/RecordAction'


import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../../../reducers'
import ReduxThunk from 'redux-thunk'

import { Container, ListItem, InputGroup, Radio, Item, Header, Input, Segment, Title, Content, Footer, FooterTab, Left, Right, Body, Icon } from 'native-base'

import CarList from './CarList'
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
    }

    componentDidMount() {
        this.props.getStorageList()
        this.props.getRecordsAllByUser({ id: 3 })
    }

    render() {
        return (
            <ScrollView >
                <StoragesView storages={this.props.storages} />
                <RecordList records={this.props.records} />
                {/*<Button
                    onPress={this.testing}
                    title="testing"
                    color="#841584"
                />
                <Button
                    onPress={this.showing}
                    title="showing"
                    color="#841584"
                />*/}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

})


const mapStateToProps = (state) => {
    console.log('mapStateToProps',state)
    return {
        carMakes: state.CarMakeReducer,
        storages: state.StorageReducer,
        records: state.RecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarMakesAll: () => {
        dispatch(CarMakeAction.getCarMakesAll())
    },
    getStorageList: () => {
        dispatch(StorageAction.getStorageList())
    },
    getRecordsAllByUser: (user) => {
        dispatch(RecordAction.getRecordsAllByUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
