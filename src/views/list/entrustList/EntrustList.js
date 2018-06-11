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

const EntrustList = props => {
    const { onSelect, hasAll = false, entrustListReducer: { data: { entrustList }, getEntrustList } } = props
    if (getEntrustList.isResultStatus == 1) {
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
                    data={hasAll ? [{ id: null, short_name: '全部' }, ...entrustList] : entrustList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                        onSelect(item)
                        Actions.pop()
                    }}>
                        <Text style={globalStyles.midText}>{item.short_name}</Text>
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
    entrustListReducer: state.entrustListReducer
})

export default connect(mapStateToProps)(EntrustList)