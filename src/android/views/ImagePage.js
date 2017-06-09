import React, { Component } from 'react'
import { Text, View, ViewPagerAndroid, Button, Image, Dimensions } from 'react-native'


const window = Dimensions.get('window')

export default class ImagePage extends Component {
    constructor(props) {
        super(props)
        // this.previousPage = this.previousPage.bind(this)
        // this.nextPage = this.nextPage.bind(this)
        this.onPageSelected = this.onPageSelected.bind(this)
        this.changePage = this.changePage.bind(this)
        this.state = {
            page: 0
        }
    }

    onPageSelected(e) {
        console.log(e.nativeEvent.position)
        this.setState({ page: e.nativeEvent.position })
    }

    changePage(page) {
        this.refs['imagePageView'].setPage(this.state.page + page)
        this.setState({ page: this.state.page + page })
    }

    movePage() {

    }

    render() {
        console.log(window.scale)
        console.log(window.width)
        console.log(window.height)
        console.log(`${window.width * window.scale}x${window.height * window.scale}`)
        return (
            <ViewPagerAndroid
                ref='imagePageView'
                initialPage={0}
                style={{ flex: 1 }}
                onPageSelected={this.onPageSelected}>
                <View style={{ backgroundColor: 'red' }}>
                    <Button title='上一页' onPress={() => { this.changePage(-1) }} />
                    <Button title='下一页' onPress={() => { this.changePage(1) }} />
                    <Image source={{ uri: 'http://stg.myxxjs.com:9000/assets/images/storage_logo_128.png' }}
                        style={{
                            maxHeight: window.height, //128*4,
                            maxWidth: window.width,
                              minHeight: window.height, //128*4,
                            minWidth: window.width,


                        }} />
                    <Text>ImagePage1</Text>
                </View>
                <View style={{ backgroundColor: 'yellow' }}>
                    <Button title='上一页' onPress={() => { this.changePage(-1) }} />
                    <Button title='下一页' onPress={() => { this.changePage(1) }} />
                    <Text>ImagePage2</Text>
                </View>
                <View style={{ backgroundColor: 'green' }}>
                    <Button title='上一页' onPress={() => { this.changePage(-1) }} />
                    <Button title='下一页' onPress={() => { this.changePage(1) }} />
                    <Text>ImagePage3</Text>
                </View>
                <View style={{ backgroundColor: 'gray' }}>
                    <Button title='上一页' onPress={() => { this.changePage(-1) }} />
                    <Button title='下一页' onPress={() => { this.changePage(1) }} />
                    <Text>ImagePage4</Text>
                </View>
            </ViewPagerAndroid>

        )
    }
}