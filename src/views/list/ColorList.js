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
import colors from '../../util/colors.json'

const renderItem = props => {
    const { item, index, onSelect } = props
    if (item.colorId) {
        return (
            <TouchableOpacity style={styles.item} key={index} onPress={() => {
                onSelect(item)
                Actions.pop()
            }}>
                <Text style={globalStyles.midText}>{item.colorName}</Text>
                <View style={{ backgroundColor: `#${item.colorId}`, width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5 }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.item} key={index} onPress={() => {
                onSelect(item)
                Actions.pop()
            }}>
                <Text style={globalStyles.midText}>{item.colorName}</Text>
            </TouchableOpacity>
        )
    }
}


const ColorList = props => {
    const { onSelect, hasAll = false } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                data={hasAll ? [{ colorId: null, colorName: '全部' }, ...colors] : colors}
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

export default ColorList