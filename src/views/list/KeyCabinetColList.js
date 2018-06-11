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

const KeyCabinetRowList = props => {
    const { onSelect, hasAll = false, colList } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                data={hasAll ? [{ id: null, value: '全部' }, ...colList] : colList}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                    onSelect(item)
                    Actions.pop()
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

export default KeyCabinetRowList