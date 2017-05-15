import React, { Component } from 'react'
import { Text, View, ScrollView, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as StorageAction from '../../actions/StorageAction'
import ParkingViewColumnHeader from '../components/Demo/ParkingView/ParkingViewColumnHeader'
import ParkingViewItem from '../components/Demo/ParkingView/ParkingViewItem'
import ParkingViewRight from '../components/Demo/ParkingView/ParkingViewRight'
import ParkingViewLeft from '../components/Demo/ParkingView/ParkingViewLeft'
import ParkingViewRowHeader from '../components/Demo/ParkingView/ParkingViewRowHeader'

var array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

class ParkingView extends Component {
    constructor(props) {
        super(props)
        //           var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //   this.state = {
        //     dataSource: ds.cloneWithRows(['row 1', 'row 2','row 2']),
        //   };
        this.change = this.change.bind(this)
    }
    componentDidMount() {

        // this.props.getParkingById(this.props.storage.id)
    }

    change(e) {
        console.log(e)
    }

    render() {


        // let parkings = this.props.storage.parkings.map(item =>

        //     <Text key={item.id}>{item.row}-{item.col}----------{item.parking_status}</Text>
        // )
        /*<View onLayout={e => this.change(e)}>
    <ParkingViewColumnHeader />

    <ParkingViewRowHeader />
    <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
    />
    <ParkingViewItem />
    {parkings}
    <Text>{this.props.storage.id}</Text>
</View>*/
        console.log('ParkingViewstorage', this.props.storage)
        // console.log('parkings', parkings)
        return (

            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.mingcheng}>
                        <Text>名称</Text>
                    </View>
                    <ParkingViewLeft />

                </View>
                <View style={styles.right}><ParkingViewRight /></View>

                {/*<ParkingViewRight/>*/}
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#F5FCFF',
        // justifyContent: 'center'
    },
    left: {
        flex: 1,
        width: 40,
        flexDirection: 'column'
    },
    mingcheng: {
        height: 40,
        width: 40,
        marginLeft: 0,
        marginRight: 0,
        borderColor: '#DCD7CD',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',      // 水平局中
        justifyContent: 'center',  // 垂直居中
    },
    right: {
        flex: 7,
        width: 800,

    },
})

const mapStateToProps = (state) => {
    return {
        storages: state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getParkingById: (id) => {
        dispatch(StorageAction.getParkingById(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkingView)