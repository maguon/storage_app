import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import PercentageCircle from 'react-native-percentage-circle'

export default class StorageListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { storage } = this.props
        // console.log('storage',storage)
        let count = storage.row * storage.col
        // console.log('count',count)
        let percent = Math.round(storage.balance / count * 100)
        return (
            <View style={styles.container}>
                <View style={styles.infoView}>
                    <View style={styles.infoViewRow}>
                        <Image source={{ uri: 'icon_house_1' }} style={styles.infoViewRow_image} />
                        <Text style={styles.storageName}>{storage.storage_name}</Text>
                        <Text style={styles.count}>总:{count.toString()}</Text>
                    </View>
                    <View style={styles.infoViewRow}>
                        <View style={styles.infoViewCol}>
                            <Text style={styles.exportCount}>{storage.exports.toString()}</Text>
                            <Text style={styles.smallLabel}>临近出库</Text>
                        </View>
                        <View style={styles.infoViewCol}>
                            <Text style={styles.emptyCount}>{(count - storage.balance).toString()}</Text>
                            <Text style={styles.smallLabel}>剩余车位</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.percentView}>
                    <PercentageCircle radius={35} borderWidth={6} percent={percent} color={"#00bfd8"} >
                        <View>
                            <Text style={styles.percentLabel}>使用率</Text>
                        </View>
                        <View style={styles.percentCenterView}>
                            <Text style={styles.percentText}>{percent.toString()}</Text>
                            <Text style={styles.percentSign}>%</Text>
                        </View>
                    </PercentageCircle>
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
        flexDirection: "row"
    },
    percentView: {
        flexDirection: "column",
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentCenterView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    percentText: {
        color: '#00bfd8',
        fontSize: 17
    },
    percentSign: {
        color: '#00bfd8',
        fontSize: 10,
        marginLeft: 2
    },
    percentLabel: {
        fontSize: 10
    },
    infoView: {
        flexDirection: "column",
        flex: 5,
        marginTop: 10,
        marginBottom: 10
    },
    infoViewCol: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoViewRow: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    infoViewRow_image: {
        width: 40,
        height: 40
    },
    storageName: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10
    },
    count: {
        backgroundColor: '#00bfd8',
        color: '#ffffff',
        borderRadius: 15,
        width: 80,
        textAlign: 'center',
        fontSize: 15
    },
    smallLabel: {
        color: '#b2b2b2',
        fontSize: 10
    },
    exportCount: {
        color: '#c95256', fontSize: 17
    },
    emptyCount: {
        color: '#00bfd8', fontSize: 17
    }
})