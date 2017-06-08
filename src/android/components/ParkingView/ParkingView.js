import React, { Component } from 'react'
import {
    View,
    Text,
    PanResponder,
    Dimensions,
    PixelRatio,
    StatusBar
} from 'react-native'



import ParkingViewItem from './ParkingViewItem'
import ParkingViewColumnHeaderItem from './ParkingViewColumnHeaderItem'
import ParkingViewRowHeaderItem from './ParkingViewRowHeaderItem'

const window = Dimensions.get('window')
const screenWidth = window.width
const screenHeight = window.height
const navBarHeight = 56
const itemWidth = 40
const itemHeight = 40
const size = 2
const mix = 2

export default class ParkingView extends Component {
    constructor(props) {
        super(props)
        this.onRespinderStart = this.onRespinderStart.bind(this)
        this.onResponderMove = this.onResponderMove.bind(this)
        this.getRowList = this.getRowList.bind(this)
        this.getColList = this.getColList.bind(this)

        let row = props.row > 18 ? 18 : props.row
        let col = props.col > 13 ? 13 : props.col
        this.state = {
            top: 0,              //当前的top位置
            left: 0,             //当前的left位置
            row: row,             //当前的行数
            col: col              //当前的列数
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps')
    // }


    getRowList() {
        let rowList = []
        for (let i = 1; i <= this.state.row; i++) {
            rowList.push({ title: i })
        }
        return rowList
    }

    getColList() {
        let colList = []
        for (let i = 1; i <= this.state.col; i++) {
            colList.push({ title: i })
        }
        return colList
    }



    colListRender() {
        return this.getColList().map((item) => {
            return (
                <ParkingViewColumnHeaderItem key={item.title}
                    itemWidth={itemWidth}
                    itemHeight={itemHeight}
                    title={item.title}
                    status={false} />
            )
        })
    }

    rowListRender() {
        return this.getRowList().map((item) => {
            let transparent = 0
            if (item.title % 2 == 0) {
                transparent += 0.1
            }
            return (

                <ParkingViewRowHeaderItem
                    key={item.title}
                    itemWidth={itemWidth}
                    itemHeight={itemHeight}
                    title={item.title}
                    status={false} />
            )
        })
    }

    itemListRender() {
        // console.log(this.props.parkingList)
        let list = this.props.parkingList
            .filter((item) => {
                return (item.col <= this.state.col) && (item.row <= this.state.row)
            })
            .map((item) => {
                let itemTop = (item.row - 1) * itemHeight
                let itemLeft = (item.col - 1) * itemWidth
                return (
                    <ParkingViewItem
                        key={`${item.row.toString()}-${item.col.toString()}`}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                        row={item.row}
                        col={item.col}
                        top={itemTop}
                        left={itemLeft}
                        status={item.rel_status ? true : false}
                    />
                )
            })
        return list
    }

    onRespinderStart(e) {
        let { pageX, pageY } = e.nativeEvent
        this.pageX = pageX
        this.pageY = pageY
        this.top = this.state.top
        this.left = this.state.left

    }

    onResponderMove(e) {
        let { pageX, pageY } = e.nativeEvent
        let top = pageY - this.pageY + this.top                    //carView的左上角纵轴坐标     
        let left = pageX - this.pageX + this.left                  //carView的左上角横轴坐标     
        let carViewShellWith = screenWidth - itemWidth             //壳的宽度    
        let carViewShellHeight = screenHeight -
            (navBarHeight + StatusBar.currentHeight + itemHeight)  //壳的高度

        let carViewWidth = this.state.col * itemWidth
        let carViewHeight = this.state.row * itemHeight

        if (left >= 0 || carViewShellWith > carViewWidth) { left = 0 }
        else if (left <= (carViewShellWith - carViewWidth)) {
            left = carViewShellWith - carViewWidth
        }
        if (top >= 0 || carViewShellHeight > carViewHeight) { top = 0 }
        else if (top <= (carViewShellHeight - carViewHeight)) {
            top = carViewShellHeight - carViewHeight
        }

        let isTopChange = !(top == this.state.top)
        let isLeftChange = !(left == this.state.left)
        if (isTopChange || isLeftChange) {
            this.setState({
                top: top,
                left: left,
            })
        }


        let arrrow = this.props.parkingList
        let { row, col } = this.props

        if (!(this.state.row == row && this.state.col == col)) {
            let topNo = (screenHeight - itemHeight - navBarHeight - StatusBar.currentHeight - top) / itemHeight
            let leftNo = (screenWidth - itemWidth - left) / itemWidth
            let newRow = this.state.row
            let newCol = this.state.col

            if ((this.state.row + size) > row) { newRow = row }
            else {
                if (topNo >= (this.state.row - mix)) { newRow = this.state.row + size }
            }
            if ((this.state.col + size) > col) { newCol = col }
            else {
                if (leftNo >= (this.state.col - mix)) { newCol = this.state.col + size }
            }
            this.setState({
                row: newRow,
                col: newCol
            })
        }
    }

    render() {
        let carViewWidth = this.state.col * itemWidth
        let carViewHeight = this.state.row * itemHeight
        // console.log('carViewWidth',carViewWidth)
        // console.log('carViewHeight',carViewHeight)

        return <View
            style={{ flex: 1, backgroundColor: '#72909d' }}
            onTouchMove={this.onResponderMove}
            onTouchStart={this.onRespinderStart}>
            <View style={{
                width: screenWidth - itemWidth,
                height: screenHeight - navBarHeight - StatusBar.currentHeight - itemHeight,
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: itemHeight,
                right: 0,
            }}
            >
                <View
                    style={{
                        width: carViewWidth,
                        height: carViewHeight,
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        left: this.state.left,
                        top: this.state.top,
                        overflow: 'hidden'
                    }}
                    removeClippedSubviews={true}
                >
                    {this.itemListRender()}
                </View>
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: '#72909d',
                width: itemWidth,
                height: screenHeight - navBarHeight - StatusBar.currentHeight - itemHeight,
                left: 0,
                top: itemHeight
            }}>
                <View
                    style={{
                        backgroundColor: '#72909d',
                        overflow: 'hidden',
                        width: itemWidth,
                        height: carViewHeight,
                        position: 'absolute',
                        left: 0,
                        top: this.state.top
                    }}
                    removeClippedSubviews={true}
                >
                    {this.rowListRender()}
                </View>
            </View>

            <View style={{
                position: 'absolute',
                backgroundColor: '#ffb6b8',
                width: screenWidth - itemWidth,
                height: itemHeight,
                right: 0,
                top: 0
            }}>
                <View style={{
                    width: carViewWidth,
                    height: itemHeight,
                    backgroundColor: '#ffb6b8',
                    position: 'absolute',
                    top: 0,
                    left: this.state.left,
                    flexDirection: 'row',
                    overflow: 'hidden'
                }}
                    removeClippedSubviews={true}>
                    {this.colListRender()}
                </View>
            </View>
        </View>



    }
}