import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as CarMakeAction from '../../actions/CarMakeAction'


class SelectCarMake extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarMakesAll()
    }
    render() {
        let carMakes = this.props.carMakes.carMakes.map(item => {
            return (<Text onPress={() => Actions.SelectCarModel({ makeId: item.id, makeName: item.make_name })}>{item.make_name}</Text>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择品牌'} />
                <ScrollView>
                    {carMakes}
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        carMakes: state.CarMakeReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarMakesAll: () => {
        dispatch(CarMakeAction.getCarMakesAll())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCarMake)
