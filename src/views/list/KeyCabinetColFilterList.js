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

const KeyCabinetColFilterList = props => {
    const { onSelect, hasAll = false, keyCabinetRowFilterListReducer: { data: { keyPositionList }, getCarKeyPositionList }, row } = props
    const colList = Array.from(new Set(keyPositionList.filter(item => !item.car_id && item.row == row).map(item => item.col))).sort((a, b) => a - b).map(item => ({ id: item, value: item }))

    if (getCarKeyPositionList.isResultStatus == 1) {
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
                    data={hasAll ? [{ id: null, value: '全部' }, ...colList] : colList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                        const keyPosition = keyPositionList.find(listItem => listItem.row == row && listItem.col == item.id)
                        onSelect(keyPosition)
                    }}>
                        <Text style={globalStyles.midText}>{item.value}</Text>
                    </TouchableOpacity>}
                />
            </Container>
        )
    }
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
    keyCabinetRowFilterListReducer: state.keyCabinetRowFilterListReducer
})

export default connect(mapStateToProps)(KeyCabinetColFilterList)