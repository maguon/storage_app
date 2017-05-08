import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'native-base'


export default class StoragePannel extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { storage } = this.props
        let count = storage.row * storage.col
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "column", flex: 5, marginTop: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image source={{ uri: 'icon_house_1' }} style={{ width: 40, height: 40 }} />
                        <Text style={{ color: '#b2b2b2', fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>{storage.storage_name}</Text>
                        <Text style={{ color: '#000000',backgroundColor:'#00bfd8',color:'#ffffff',borderRadius:15,width:80,textAlign:'center',fontSize: 15 }}>总:{count}</Text>
                    </View>
                    <View style={{ flexDirection: "row",justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#c95256', fontWeight: 'bold', fontSize: 17 }}>{storage.exports}</Text>
                            <Text style={{ color: '#b2b2b2', fontSize: 10 }}>临近出库</Text>

                        </View>
                        <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={{ color: '#00bfd8', fontSize: 17 }}>{storage.pCount}</Text>
                            <Text style={{ color: '#b2b2b2', fontSize: 10 }}>剩余车位</Text>
                        </View>

                    </View>
                </View>

                {/*
                <View style={{ flexDirection: "column" ,flex:2,marginTop: 20, marginBottom: 10}}>
                    <View style={{backgroundColor:'#00bfd8',justifyContent:'center',alignItems:'center'}}>
                        
                    </View>
                    <View style={{ flexDirection: "column" }}>

                        <Text style={{ color: 'red' }}>{storage.pCount}</Text>
                        <Text style={{ color: 'red' }}>剩余车位</Text>
                    </View>
                </View>*/}



                <View style={{ flexDirection: "column", flex: 2 }}>
                    <Text>111</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",

    }
})