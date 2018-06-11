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

const KeyCabinetListForSelect = props => {
    const { onSelect, hasAll = false, keyCabinetListReducer: { data: { keyCabinetList }, getKeyCabinetList } } = props
    if (getKeyCabinetList.isResultStatus == 1) {
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
                    data={hasAll ? [{ id: null, key_cabinet_name: '全部' }, ...keyCabinetList] : keyCabinetList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                        onSelect(item)
                        Actions.pop()
                    }}>
                        <Text style={globalStyles.midText}>{item.key_cabinet_name}</Text>
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
    keyCabinetListReducer: state.keyCabinetListReducer
})

export default connect(mapStateToProps)(KeyCabinetListForSelect)