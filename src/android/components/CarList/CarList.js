import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    Button,
    Animated
} from 'react-native'
import CarListItem from './CarListItem'
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const window = Dimensions.get('window')

const CarList = ({ cars, getCarListWaiting, getCarListMore }) => {
    let CarListItems = cars.map((item) => {
        return <CarListItem car={item} key={item.r_id} />
    })
    let viewStyle = { backgroundColor: '#00cade' }
    console.log(getCarListWaiting)
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 12 }}><Text style={styles.title}>计划出库时间</Text></View>
                <View style={{ flex: 16 }}><Text style={styles.title}>VIN码</Text></View>
                <View style={{ flex: 10 }}><Text style={styles.title}>品牌</Text></View>
                <View style={{ flex: 1 }}></View>
            </View>
            <FlatList
                //refreshing={true}
                colors={'#00cade'}
               // onRefresh={() => { }}
                refreshing={getCarListWaiting}
                onEndReached={getCarListMore}
                data={cars}
                onEndReachedThreshold={1}
                renderItem={({ item }) => <CarListItem car={item} key={item.r_id} />}
            />
            {/*<Button title='加载更多' onPress={getCarListMore} />*/}
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
