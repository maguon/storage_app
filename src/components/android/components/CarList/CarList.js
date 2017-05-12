import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    RefreshControl
} from 'react-native'
import CarListItem from './CarListItem'

const window = Dimensions.get('window')

const CarList = ({ cars, getCarList, loadMore }) => {
    let CarListItems = cars.map((item) => {
        return <CarListItem car={item} key={item.r_id} />
    })
    let viewStyle = { backgroundColor: '#00cade' }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 12 }}><Text style={styles.title}>计划出库时间</Text></View>
                <View style={{ flex: 16 }}><Text style={styles.title}>VIN码</Text></View>
                <View style={{ flex: 10 }}><Text style={styles.title} onPress={() => { console.log(1111) }}>品牌</Text></View>
                <View style={{ flex: 1 }}></View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    {CarListItems}
                    <Text style={styles.load} onPress={loadMore}>加载更多</Text>
                </View>
            </ScrollView>
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
