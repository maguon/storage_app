import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    Button,
    //Animated,
    TouchableHighlight
} from 'react-native'
import { Icon } from 'native-base'
import CarListItem from './CarListItem'
import { Actions } from 'react-native-router-flux'
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const window = Dimensions.get('window')

const CarList = ({ cars, getCarListWaiting, getCarListMore, storageName }) => {
    let CarListItems = cars.map((item) => {
        return <CarListItem car={item} key={item.r_id} />
    })
    let viewStyle = { backgroundColor: '#00cade' }

    let header = storageName ? (<TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={Actions.selectStorageForCarList}>
        <View style={{ backgroundColor: '#708e9b', flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={{ flex: 12, color: '#fff', fontWeight: 'bold' }}>{storageName}</Text>
            <Icon name='md-arrow-dropright' style={{ flex: 1, fontSize: 20, color: '#fff', textAlign: 'right' }} type="ionicons" />
        </View>
    </TouchableHighlight>) : (<View></View>)

    return (
        <View style={{ flex: 1 }}>
            {header}
            <FlatList
                colors={'#00cade'}
                refreshing={getCarListWaiting}
                onEndReached={getCarListMore}
                data={cars}
                onEndReachedThreshold={1}
                renderItem={({ item }) => <CarListItem car={item} key={item.r_id} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: "row",
        height: 50,
        backgroundColor: '#f0f0f0',

        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#dddddd'
    },
    title: {
        textAlign: 'center'
    },
    load: {
        alignSelf: 'center',
        marginVertical: 5
    }
})

export default CarList
