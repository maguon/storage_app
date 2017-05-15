
import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

export default class ParkingViewLeft extends Component {
    constructor(props) {
        super(props)
    }

    //     <ListView
    //     ref={LEFT_LISTVIEW}
    //     style={styles.leftListView}
    //     showsHorizontalScrollIndicator={false}
    //     showsVerticalScrollIndicator={false}
    //     scrollEnabled={false}
    //     dataSource={this.state.leftDataSource}
    //     renderHeader={this._leftRenderRow}
    //     renderRow={this._leftRenderRow}
    // />
                /*<View style={styles.left}>
                */
                 // </View>

    render() {
        let RowTag=[]
        for(let i=1;i<=20;i++)
        {
            RowTag.push(<View  style={styles.leftListRow} key={i}>
                <Text >{i}</Text>
                </View>)
        }
        return (

                <ScrollView 
            
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    >
                    {RowTag}
                </ScrollView>


           
        )
    }

}


var styles = StyleSheet.create({
    // left: {
    //     flex: 1,

    //     flexDirection: 'column'
    // },
    // mingcheng: {
    //     height: 40,
    //     marginLeft: 0,
    //     marginRight: 0,
    //     borderColor: '#DCD7CD',
    //     borderBottomWidth: 1,
    //     borderRightWidth: 1,
    //     borderTopWidth: 1,
    //     alignItems: 'center',      // 水平局中
    //     justifyContent: 'center',  // 垂直居中
    // },
    //     leftListView: {
    //     flex: 1,
    //     marginTop: 0,
    //     marginLeft: 0,
    //     marginRight: 0,
    //     marginBottom: 30,
    //     backgroundColor: 'gray',
    // },
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

})