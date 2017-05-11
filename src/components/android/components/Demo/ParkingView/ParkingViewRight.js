
import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, ListView } from 'react-native'
import { connect } from 'react-redux'

let array = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
]
export default class ParkingViewRight extends Component {
    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.onScroll = this.onScroll.bind(this)

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            DataSource: ds.cloneWithRows(array),
            //rightdataSource: ds.cloneWithRows(rightArray),
            //loaded: false,
        }

    }

    renderRow(rowData, sectionID, rowID) {
        let row=rowData.map(item=>{
            return <View style={styles.cellView} key={item}>
                    <Text>{item}</Text>
                </View>
        })
        return (
            <View style={styles.rightListRow} >
                {row}
            </View>
        )
    }

    onScroll() {
            let rightList = this.refs[RIGHT_LISTVIEW];
            let leftList = this.refs[LEFT_LISTVIEW];
            let y1 = rightList.scrollProperties.offset;
            leftList.scrollTo({ x: 0, y: y1, animated: false })
    }

    render() {
        let colTag = []
        for (let i = 1; i <= 20; i++) {
            colTag.push(<View style={styles.titleView} key={i}>
                <Text>{i}</Text>
            </View>)
        }
        return (
            <ScrollView style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}>
                <View style={styles.contentView}>
                    <View style={{ width: 800, height: 40, flexDirection: 'row' }}>

                        {colTag}
                    </View>

                    <ListView
                        //ref={RIGHT_LISTVIEW}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.rightListView}
                        dataSource={this.state.DataSource}
                        onScroll={this.onScroll}
                        renderRow={this.renderRow}
                    />
                </View>
            </ScrollView>
        )
    }

}

var styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginRight: 1,
        marginLeft: 1,
        marginTop: 0,
        marginBottom: 1,
        // backgroundColor: 'red',
        // flexDirection: 'column'
    },
    rightListRow: {
        width: 800,
        height: 40,
        
        flexDirection: 'row'
    },

    contentView: {

        // height: window.height - 50,
        width: 800,
        // backgroundColor:'yellow',
        flexDirection: 'column',
    },
    titleView: {
        width: 40,
        height: 40,
        backgroundColor: '#F5FCFF',
        borderColor: '#DCD7CD',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',      // 水平局中
        justifyContent: 'center',  // 垂直居中
    },
    cellView: {
        width: 40,
        height: 40,
        // backgroundColor:'#db384c',
        borderColor: '#DCD7CD',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',      // 水平局中
        justifyContent: 'center',  // 垂直居中
    },
})