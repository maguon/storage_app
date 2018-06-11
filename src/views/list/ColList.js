import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Container, Spinner } from 'native-base'
import ListEmptyComponent from '../../components/share/ListEmptyComponent'

const ColList = props => {
    const { onSelect, hasAll = false, rowListReducer: { data: { parkingList }, getParkingList }, row } = props
    const colList = Array.from(new Set(parkingList.filter(item => !item.car_id && item.row == row).map(item => item.col))).sort((a, b) => a - b).map(item => ({ id: item, value: item }))
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                data={hasAll ? [{ id: null, value: '全部' }, ...colList] : colList}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                    onSelect(item)
                }}>
                    <Text style={globalStyles.midText}>{item.value}</Text>
                </TouchableOpacity>}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => ({
    rowListReducer: state.rowListReducer
})

export default connect(mapStateToProps)(ColList)