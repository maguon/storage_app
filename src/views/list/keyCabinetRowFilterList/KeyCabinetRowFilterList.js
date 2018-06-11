import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'
import { Container, Spinner } from 'native-base'
import ListEmptyComponent from '../../../components/share/ListEmptyComponent'

const KeyCabinetRowFilterList = props => {
    const { onSelect, hasAll = false, keyCabinetRowFilterListReducer: { data: { keyPositionList }, getCarKeyPositionList } } = props
    const rowList = Array.from(new Set(keyPositionList.filter(item => !item.car_id).map(item => item.row))).sort((a, b) => a - b).map(item => ({ id: item, value: item }))

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
                    data={hasAll ? [{ id: null, value: '全部' }, ...rowList] : rowList}
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

export default connect(mapStateToProps)(KeyCabinetRowFilterList)