import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import CarListComponent from '../components/CarList/CarList'



const window = Dimensions.get('window')

class CarList extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        console.log(this.props)
        let viewStyle = { backgroundColor: '#00cade' }
        return (
            <View style={{ flex: 1, width: window.width }}>
                <SearchBar viewStyle={viewStyle} />
                <CarListComponent {...this.props} />
            </View>
        )
    }

}

export default CarList
