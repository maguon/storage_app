import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { Container, Spinner } from 'native-base'
import yearList from '../../util/yearList.json'

const renderItem = props => {
    const { item, index, onSelect } = props
    return (
        <TouchableOpacity style={styles.item} key={index} onPress={() => {
            onSelect(item)
            Actions.pop()
        }}>
            <Text style={globalStyles.midText}>{item.value}</Text>
        </TouchableOpacity>
    )
}


const YearList = props => {
    const { onSelect, hasAll = false } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                getItemLayout={(data, index) => {
                    // console.log('data', data)
                    return { length: 49.3, offset: 49.3 * index, index }
                }}
                initialScrollIndex={yearList.findIndex(item => item.id == new Date().getFullYear())}
                data={hasAll ? [{ id: null, value: '全部' }, ...yearList] : yearList}
                renderItem={param => renderItem({ ...param, onSelect })}
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

export default YearList