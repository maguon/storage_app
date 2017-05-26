import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Segment, Button, Text } from 'native-base'

const window = Dimensions.get('window')

class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title='工作记录' />
                <Segment style={{ backgroundColor: '#00cade' }}>
                    <Button active><Text style={{ color: '#00bfd8' }}>所有</Text></Button>
                    <Button><Text style={{}}>入库</Text></Button>
                    <Button><Text>移位</Text></Button>
                    <Button><Text>出库</Text></Button>
                </Segment>
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <View>
                        <View style={{ backgroundColor: '#f2f2f2', borderRadius: 20, paddingVertical: 10, width: window.width / 2, marginHorizontal: 10 }}>
                            <Text style={{ textAlign: 'center' }}>2017年4月12日</Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>一号仓库</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>一号仓库</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>一号仓库</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.CarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param, isFirst) => {
        dispatch(CarAction.getCarList(param, isFirst))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordList)

