import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as CarModelAction from '../../actions/CarModelAction'


class SelectCarModel extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarModelsByMakeId({
            requiredParam: {
                carMakeId: this.props.makeId
            }
        })
    }

    render() {
        let carModels = this.props.carModels.carModels.map(item => {
            return (<Text key={item.id} onPress={() =>
                Actions.pop({
                    popNum: 2,
                    refresh: {
                        makeId: this.props.makeId,
                        modelId: item.id,
                        makeName: this.props.makeName,
                        modelName: item.model_name,
                        selectType: 0
                    }
                })}>{item.model_name}</Text>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择型号'} />
                <View>
                    <ScrollView>
                        {carModels}
                    </ScrollView>
                </View>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        carModels: state.CarModelsReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarModelsByMakeId: (param) => {
        dispatch(CarModelAction.getCarModelsByMakeId(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCarModel)