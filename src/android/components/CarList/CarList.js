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
    // console.log(getCarListWaiting)
    return (
        <View style={{ flex: 1 }}>

            {/*<View style={styles.container}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 12 }}><Text style={styles.title}>计划出库时间</Text></View>
                <View style={{ flex: 16 }}><Text style={styles.title}>VIN码</Text></View>
                <View style={{ flex: 10 }}><Text style={styles.title}>品牌</Text></View>
                <View style={{ flex: 1 }}></View>
            </View>*/}
            <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={Actions.selectStorageForCarList}>
                <View style={{ backgroundColor: '#708e9b', flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ flex: 12, color: '#fff', fontWeight: 'bold' }}>{storageName}</Text>
                    <Icon name='md-arrow-dropright' style={{ flex: 1, fontSize: 20, color: '#fff', textAlign: 'right' }} type="ionicons" />
                </View>
            </TouchableHighlight>
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
