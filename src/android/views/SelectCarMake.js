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

    shouldComponentUpdate(nextProps, nextState) {
        let { carMakesReducer } = nextProps
        /** homeReducer.getStoragesHome */
        if (carMakesReducer.carMakes.isExecStatus == 1) {
            console.log('carMakesReducer.carMakes', '开始执行')
        } 
        else if (carMakesReducer.carMakes.isExecStatus == 2) {
            if (carMakesReducer.carMakes.isResultStatus == 0) {
                console.log('carMakesReducer.carMakes执行成功')
            } else if (carMakesReducer.carMakes.isResultStatus == 1) {
                console.log('carMakesReducer.carMakes执行错误')
            }
            else if (carMakesReducer.carMakes.isResultStatus == 2) {
                console.log('carMakesReducer.carMakes执行失败')
            }
        }

        /**************************************************************************** */
        return true
    }


    render() {
        let { carMakeList } = this.props.carMakesReducer.carMakes.data
        let carMakes = carMakeList.map(item => {
            return (<ListItem button key={item.id} onPress={() => Actions.SelectCarModel({ makeId: item.id, makeName: item.make_name, onSelectModel: this.props.onSelectModel })}>
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
