import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    InteractionManager,
    ProgressBarAndroid,
    TransformsStyle,

} from 'react-native'
import { Container, Spinner } from 'native-base'
import PercentageCircle from 'react-native-percentage-circle'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const renderItem = props => {
    const { item: { total_seats = 0, storage_name, balance = 0, parking_balance_count = 0 }, item } = props
    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <View style={styles.infoViewRow}>
                    <Image source={{ uri: 'icon_house_1' }} style={styles.infoViewRow_image} />
                    <Text style={[globalStyles.largeText, styles.storageName]}>{storage_name ? `${storage_name}` : ''}</Text>
                    <Text style={[globalStyles.largeText, styles.count]}>总:{total_seats ? `${total_seats}` : '0'}</Text>
                </View>
                <View style={styles.infoViewRow}>
                    <View style={styles.infoViewCol}>
                        <Text style={[globalStyles.largeText, styles.exportCount]}>{item.exports ? `${item.exports}` : '0'}</Text>
                        <Text style={[globalStyles.ssText]}>今日出库</Text>
                    </View>
                    <View style={styles.infoViewCol}>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{`${parking_balance_count}`}</Text>
                        <Text style={[globalStyles.ssText]}>剩余车位</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.percentView]}>
                <PercentageCircle radius={35} borderWidth={6} percent={total_seats ? `${Math.round((total_seats - parking_balance_count) / total_seats * 100)}` : 0} bgcolor={'#e3e3e3'} color={styleColor}  >
                    <View>
                        <Text style={[globalStyles.ssText]}>使用率</Text>
                    </View>
                    <View style={styles.percentCenterView}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>{total_seats ? `${Math.round((total_seats - parking_balance_count) / total_seats * 100)}` : '0'}</Text>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor, styles.percentSign]}>%</Text>
                    </View>
                </PercentageCircle>
            </View>
        </View>

    )
}

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { getStorageList, getStorageListWaiting } = this.props
        getStorageListWaiting()
        InteractionManager.runAfterInteractions(getStorageList)
    }

    render() {
        const { homeReducer: { data: { storageList }, getStorageList } } = this.props
        if (getStorageList.isResultStatus == 1) {
            return (
                <Container style={{ backgroundColor: '#ebeef0' }}>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container style={{ backgroundColor: '#ebeef0' }}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={storageList}
                        renderItem={renderItem}
                    />
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    homeReducer: state.homeReducer
})

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(actions.home.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(actions.home.getStorageListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    percentSign: {
        marginLeft: 2
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
        marginLeft: 10
    },
    count: {
        backgroundColor: styleColor,
        color: '#ffffff',
        borderRadius: 15,
        width: 80,
        textAlign: 'center'
    },
    exportCount: {
        color: '#c95256'
    }
})
