import React, { Component } from 'react'
import { Text, View, Button,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/Car'
import * as CarAction from '../../../actions/CarAction'
import {Actions} from 'react-native-router-flux'

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarAll({ id: 3 })
    }

    render() {
        
        let cars = this.props.cars.map((item) => {
            return <Car car={item} key={item.id} nextPage={Actions.carInfo}/>
        })
        return (
            <ScrollView>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 2 }}>入库时间</Text>
                    <Text style={{ flex: 1 }}>品牌</Text>
                    <Text style={{ flex: 1 }}>型号</Text>
                </View>
                {cars}
            </ScrollView>
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