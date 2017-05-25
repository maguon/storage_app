import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as CarModelAction from '../../actions/CarModelAction'
import * as ImporCarAction from '../../actions/ImporCarAction'
import { List, ListItem } from 'native-base'


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

    changeModel(param) {
        this.props.changeModel(param)
        Actions.pop({ popNum: 2 })
    }


    render() {
        let carModels = this.props.carModels.carModels.map(item => {
            return (<ListItem button key={item.id} onPress={() => this.changeModel({
                makeId: this.props.makeId,
                modelId: item.id,
                makeName: this.props.makeName,
                modelName: item.model_name,
            })}>
                <Text>
                    {item.model_name}
                </Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择型号'} />
                <View>
                    <ScrollView>
                        <List>
                            {carModels}
                        </List>
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