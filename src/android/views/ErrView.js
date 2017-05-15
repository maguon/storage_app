/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    ScrollView,
} from 'react-native'


const window = Dimensions.get('window');
var RIGHT_LISTVIEW = 'right_listView';
var LEFT_LISTVIEW = 'left_listView';

var array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
var titleArray = ['name', 'sex', 'age', 'firstName', 'seconName', 'hehe'];
var rightArray = [
    { name: 'qwe', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'ert', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'rtr', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'ty', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yu', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yiu', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'hgj', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yuty', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'fg', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'kjhk', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'qwe', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'ert', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'rtr', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'ty', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yu', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yiu', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'hgj', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'yuty', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'fg', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
    { name: 'kjhk', sex: 'sex', age: 'age', firstName: 'firstName', seconName: 'seconName', hehe: 'hehe' },
];

export default class ErrView extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.onScroll = this.onScroll.bind(this)

        this._leftRenderRow = this._leftRenderRow.bind(this)
        this._rightRenderRow = this._rightRenderRow.bind(this)
        this.state = {
            leftDataSource: ds.cloneWithRows(array),
            rightdataSource: ds.cloneWithRows(rightArray),
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({
            loaded: true,
        }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.mingcheng}>
                        <Text>

                        </Text>
                    </View>

                    <ListView
                        ref={LEFT_LISTVIEW}
                        style={styles.leftListView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        dataSource={this.state.leftDataSource}
                        renderHeader={this._leftRenderRow}
                        renderRow={this._leftRenderRow}
                    />

                </View>

                <View style={styles.right}>
                    <ScrollView style={styles.scrollView}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}>
                        <View style={styles.contentView}>
                            <View style={{ width: 240, height: 40, flexDirection: 'row' }}>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                                <View style={styles.titleView}>
                                    <Text>123</Text>
                                </View>
                            </View>

                            <ListView
                                ref={RIGHT_LISTVIEW}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={styles.rightListView}
                                dataSource={this.state.rightdataSource}
                                onScroll={this.onScroll}
                                renderRow={this._rightRenderRow}
                            />
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }

    onScroll() {
        if (this.state.loaded) {
            var rightList = this.refs[RIGHT_LISTVIEW];
            var leftList = this.refs[LEFT_LISTVIEW];
            var y1 = rightList.scrollProperties.offset;
            leftList.scrollTo({ x: 0, y: y1, animated: false })


        }
    }

    _leftRenderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.leftListRow}>
                <Text >
                    {rowData}
                </Text>
            </View>
        );
    }

    _rightRenderRow(rowData, sectionID, rowID) {
        return (

            <View style={styles.rightListRow}>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.cellView}>
                    <Text>{rowData.name}</Text>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center'
    },

    left: {
        // flex: 1,
        width: 80,
        flexDirection: 'column'
    },
    right: {
        // flex: 7,
        width: 240,
        
        backgroundColor: 'red',
    },

    mingcheng: {
        height: 40,
        marginLeft: 0,
        marginRight: 0,
        borderColor: '#DCD7CD',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',      // 水平局中
        justifyContent: 'center',  // 垂直居中
    },

    leftListView: {
        flex: 1,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 30,
        backgroundColor: 'gray',
    },

    leftListRow: {
        alignItems: 'center',      // 水平局中
        justifyContent: 'center',  // 垂直居中
        height: 40,
        width: 40,
        // backgroundColor:'#db384c',
        borderColor: '#DCD7CD',
        
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },

    rightListRow: {
        width: 240,
        height: 40,
        
        flexDirection: 'row'
    },

    scrollView: {
        flex: 1,
        marginRight: 1,
        marginLeft: 1,
        marginTop: 0,
        marginBottom: 1,
        // backgroundColor: 'red',
        // flexDirection: 'column'
    },

    contentView: {

        // height: window.height - 50,
        width: 240,
        // backgroundColor:'yellow',
        flexDirection: 'column',
    },

    rightListView: {
        flex: 1,
        marginBottom: 30,
        // backgroundColor : 'gray'
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
});

