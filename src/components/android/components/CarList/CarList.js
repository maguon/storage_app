import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from './CarListItem'
import * as CarAction from '../../../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../Bar/SearchBar'


const window = Dimensions.get('window')

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarAll({ id: 3 })
    }

    render() {

        let cars = this.props.cars.map((item) => {
            return <Car car={item} key={item.id} nextPage={Actions.carInfo} />
        })

        let viewStyle = { backgroundColor: '#00cade' }
        return (
            <View style={{ flex: 1, width: window.width }}>
                <SearchBar viewStyle={viewStyle} />
                <View style={{ paddingHorizontal: 10, flexDirection: "row", height: 50, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 12 }}><Text style={{ textAlign: 'center' }}>入库时间</Text></View>
                    <View style={{ flex: 16 }}><Text style={{ textAlign: 'center' }}>VIN码</Text></View>
                    <View style={{ flex: 10 }}><Text style={{ textAlign: 'center' }}>品牌</Text></View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ScrollView >
                    {cars}
                </ScrollView>
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
    getCarAll: (user) => {
        dispatch(CarAction.getCarAll(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)