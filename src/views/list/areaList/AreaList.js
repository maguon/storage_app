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

const AreaList = props => {
    const { onSelect, hasAll = false, areaListReducer: { data: { areaList }, getAreaList } } = props
    if (getAreaList.isResultStatus == 1) {
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
                    data={hasAll ? [{ id: null, short_name: '全部' }, ...areaList] : areaList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                        onSelect(item)
                        //Actions.pop()
                    }}>
                        <Text style={globalStyles.midText}>{item.area_name}</Text>
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
    areaListReducer: state.areaListReducer
})

export default connect(mapStateToProps)(AreaList)