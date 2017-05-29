import React, { Component } from 'react'
import { Text, View, Button, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as CarMakeAction from '../../actions/CarMakeAction'
import { List, ListItem } from 'native-base'


class SelectCarMake extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarMakesAll()
    }
    render() {
        let carMakes = this.props.carMakes.carMakes.map(item => {
            return (<ListItem button key={item.id} onPress={() => Actions.SelectCarModel({ makeId: item.id, makeName: item.make_name, changeModel: this.props.changeModel })}>
                <Text>{item.make_name}</Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择品牌'} />
                <ScrollView>
                    <List>
                        {carMakes}
                    </List>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        carMakesReducer: state.CarMakeReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarMakesAll: () => {
        dispatch(CarMakeAction.getCarMakesAll())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCarMake)
