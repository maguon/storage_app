import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'

const window = Dimensions.get('window')

class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title='工作记录' />
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>2017年4月12日</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginHorizontal:10 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'center', color: '#00bfd8' }}>入库:15</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'center', color: '#f7666b' }}>出库:15</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'center', color: '#ffa700' }}>移位:15</Text>
                        </View>
                        <View style={{ flex: 3, backgroundColor: '#e99d38', paddingVertical: 5, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', color: '#ffffff' }}>计划出库:15</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, marginVertical: 10, backgroundColor: '#f2f2f2', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#d7d7d7' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, backgroundColor: '#00bfd8', borderRadius: 5 }}></View>
                            <Text style={{ textAlign: 'center', color: '#00bfd8' }}>入库</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, backgroundColor: '#f7666b', borderRadius: 5 }}></View>
                            <Text style={{ textAlign: 'center', color: '#f7666b' }}>出库</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, backgroundColor: '#ffa700', borderRadius: 5 }}></View>
                            <Text style={{ textAlign: 'center', color: '#ffa700' }}>移位</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ backgroundColor: '#f2f2f2', borderRadius: 20, paddingVertical: 10, width: window.width / 2 ,marginHorizontal:10}}>
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

