import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import ListEmptyComponent from '../../components/share/ListEmptyComponent'
import { reduxForm } from 'redux-form'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import * as actions from '../../actions'

const SearchCarForCreateCar = props => {
    // console.log('props', props)
    const { onSelect, cleanCarList, searchCarForCreateCarReducer: { data: { carList }, getCarList } } = props
    if (getCarList.isResultStatus == 1) {
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
                    data={carList}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => {
                        cleanCarList()
                        onSelect(item)
                    }}>
                        <Text style={globalStyles.midText}>{item.vin}</Text>
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
    searchCarForCreateCarReducer: state.searchCarForCreateCarReducer
})

const mapDispatchToProps = (dispatch) => ({
    cleanCarList: () => {
        dispatch(actions.searchCarForCreateCar.cleanCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCarForCreateCar)