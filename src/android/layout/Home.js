
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import RecordList from '../components/RecordListForHome/RecordList'
import StorageList from '../components/StorageListForHome/StorageList'
import SearchBar from '../components/Bar/SearchBar'

const window = Dimensions.get('window')

const Home = ({ storages, recordList, changeSearchVin }) => {
    let viewStyle = { backgroundColor: 'rgba(0,0,0,0.16)' }
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image source={{ uri: 'banner_back' }} style={styles.image} />
                <View style={styles.search}>
                    <SearchBar viewStyle={viewStyle} changeSearchVin={changeSearchVin} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                overScrollMode='auto'>

                <StorageList storages={storages} />
                <RecordList recordList={recordList} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: window.width,
        height: window.width / 16 * 9,
    },
    search: {
        width: window.width,
        position: 'absolute',
        top: 0,
        height: 20
    }
})

export default Home

