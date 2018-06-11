import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ListItem, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import CarInfoEditor from './carInfoEditor/CarInfoEditor'
import CarOpRecord from './carOpRecord/CarOpRecord'
import CarStorageOp from './carStorageOp/CarStorageOp'
import CarImage from './carImage/CarImage'
import { connect } from 'react-redux'

const Car = props => {
    const { initParam, parent, carInfo } = props
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="信息">
                    <CarInfoEditor initParam={initParam} parent={parent} carInfo={carInfo} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="照片">
                    < CarImage initParam={initParam} parent={parent} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="仓储">
                    <CarStorageOp initParam={initParam} parent={parent} carInfo={carInfo} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="操作">
                    <CarOpRecord />
                </Tab>
            </Tabs>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => ({
    carInfo: state.carListReducer.data.carList.find(item => item.id == ownProps.initParam.carId)
})

export default connect(mapStateToProps)(Car) 
