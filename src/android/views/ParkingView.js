import React, { Component } from 'react'
import {
    View,
    Text,
    PanResponder,
    Dimensions,
    PixelRatio,
    StatusBar
} from 'react-native'


import NavBar from '../components/Bar/NavBar'

const window = Dimensions.get('window')
const screenWidth = window.width
const screenHeight = window.height
const navBarHeight = 56
const itemWidth = 40
const itemHeight = 40
const carViewWidth = 800
const carViewHeight = 800

export default class ParkingView extends Component {
    constructor(props) {
        super(props)
        this.onRespinderStart = this.onRespinderStart.bind(this)
        this.onResponderMove = this.onResponderMove.bind(this)
        this.onStartShouldSetResponder = this.onStartShouldSetResponder.bind(this)
        this.onMoveShouldSetResponder = this.onMoveShouldSetResponder.bind(this)
        this.state = {
            top: 0,
            left: 0,
            dx: 0,
            dy: 0,

        }
    }

    componentDidMount() {
        // console.log(this)
    }

    onStartShouldSetResponder(e) {
        // console.log('申请开始')
        return true
    }

    onMoveShouldSetResponder(e) {
        // console.log('申请移动')
        return true

    }

    onRespinderStart(e) {
        // console.log(e.nativeEvent)
        let { pageX, pageY } = e.nativeEvent
        this.pageX = this.state.left - pageX
        this.pageY = this.state.top - pageY
    }

    onResponderMove(e) {
        // console.log(e.nativeEvent)
        let { pageX, pageY } = e.nativeEvent

        let top = this.pageY + pageY
        let left = this.pageX + pageX

        if (left >= 0) { left = 0 }
        if (left <= (screenWidth - carViewWidth - itemWidth)) {
            left = screenWidth - carViewWidth - itemWidth
        }

        if (top >= 0) { top = 0 }
        if (top <= (screenHeight - carViewHeight - navBarHeight - StatusBar.currentHeight - itemHeight)) {
            top = screenHeight - carViewHeight - navBarHeight - StatusBar.currentHeight - itemHeight
        }

        this.setState({
            top: top,
            left: left,
            dx: pageX,
            dy: pageY
        })

    }


    render() {
        // console.log(this.state)
        // console.log(StatusBar.currentHeight)

        return <View style={{ flex: 1, backgroundColor: '#ffffff' }}
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onMoveShouldSetResponder={this.onMoveShouldSetResponder}
            onResponderStart={this.onRespinderStart}
            onResponderMove={this.onResponderMove}
        >
            <NavBar title='选择道位' />
            <View
                style={{ flex: 1, backgroundColor: '#999999' }}>
                <View style={{
                    width: screenWidth - itemWidth,
                    height: screenHeight - navBarHeight - StatusBar.currentHeight - itemHeight,
                    backgroundColor: '#f1f1f1',
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}>
                    <View
                        style={{
                            width: carViewWidth,
                            height: carViewHeight,
                            backgroundColor: 'yellow',
                            position: 'absolute',
                            left: this.state.left,
                            top: this.state.top
                        }}
                    >
                        <Text>1111</Text>
                        <Text >{screenWidth}</Text>
                        <Text >{screenHeight}</Text>
                        <Text >{window.scale}</Text>
                        <Text >111</Text>
                        <Text >111</Text>
                        <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>1111</Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#f1f1f1',
                    width: itemWidth,
                    height: carViewHeight,
                    left: 0,
                    top: itemHeight
                }}>
                    <View style={{ backgroundColor: 'blue', width: itemWidth, height: carViewHeight, position: 'absolute', left: 0, top: this.state.top }}>
                        <Text >111</Text>
                        <Text >111</Text>
                        <Text >111</Text>
                        <Text >111</Text>
                        <Text >111</Text>
                        <Text style={{ position: 'absolute', bottom: 0, left: 0 }}>111</Text>
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    width: screenWidth - itemWidth,
                    height: itemWidth,
                    right: 0,
                    top: 0
                }}>
                    <View style={{
                        width: carViewWidth,
                        height: itemHeight,
                        backgroundColor: 'green',
                        position: 'absolute',
                        top: 0,
                        left: this.state.left
                    }}>
                        <Text>123456658567976896809782445245</Text>
                        <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>123456658567976896809782445245</Text>

                    </View>
                </View>
            </View>
        </View>


    }
}