import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'
import CarOpRecordList from '../../../util/CarOpRecordList.json'
import moment from 'moment'

const renderListItem = props => {
    const { item: { timez, content, op } } = props
    const recordOp = CarOpRecordList.find(item => item.id == op)
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
            <View style={{ flex: 2, alignItems: 'flex-end', borderRightWidth: 0.5, borderColor: '#ccc', paddingRight: 15, paddingTop: 15 }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>{recordOp.value}</Text>
                <Text style={globalStyles.smallText}>{moment(timez).format("HH:mm:ss")}</Text>
                <Text style={globalStyles.smallText}>{moment(timez).format("YYYY-MM-DD")}</Text>

            </View>
            <Icon name='ios-arrow-dropup-circle-outline' style={{ marginLeft: -6.5, fontSize: 15, color: '#ccc' }} />
            <View style={{ flex: 5, paddingLeft: 10, alignItems: 'center' }}>
                <Text style={globalStyles.smallText}>{content}</Text>
            </View>
        </View>
    )
}

const CarOpRecord = props => {
    const { carOpRecordReducer: { data: { recordList }, getRecordListForCar } } = props
    if (getRecordListForCar.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={recordList}
                    renderItem={renderListItem}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    carOpRecordReducer: state.carOpRecordReducer
})

export default connect(mapStateToProps)(CarOpRecord)

