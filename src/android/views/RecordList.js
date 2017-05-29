import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Segment, Button, Text } from 'native-base'
import * as RecordListAction from '../../actions/RecordListAction'

const window = Dimensions.get('window')

class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
         let param = { optionalParam: { userid: this.props.user.userId } }
         this.props.getRecordList(param)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { recordListReducer } = nextProps
        let { getRecordList, changeRecordListTab } = this.props
        /** homeReducer.getStoragesHome */
        if (recordListReducer.getRecordList.isExecStatus == 1) {
            console.log('recordListReducer.getRecordList', '开始执行')
        } else if (recordListReducer.getRecordList.isExecStatus == 2) {
            if (recordListReducer.getRecordList.isResultStatus == 0) {
                console.log('recordListReducer.getRecordList执行成功', recordListReducer.getRecordList.data.recordList)

            } else if (recordListReducer.getRecordList.isResultStatus == 1) {
                console.log('recordListReducer.getRecordList执行错误')

            }
            else if (recordListReducer.getRecordList.isResultStatus == 2) {
                console.log('recordListReducer.getRecordList执行失败', recordListReducer.getRecordList.failedMsg)

            }
        }
        if (this.props.recordListReducer.selectRecordListTab.selectedTab != recordListReducer.selectRecordListTab.selectedTab) {
            let param = { optionalParam: { userid: this.props.user.userId } }
            if (recordListReducer.selectRecordListTab.selectedTab == 'all') {
                console.log(param)
            } else if (recordListReducer.selectRecordListTab.selectedTab == 'import') {
                param.optionalParam.op = 11
                console.log(param)
            } else if (recordListReducer.selectRecordListTab.selectedTab == 'move') {
                param.optionalParam.op = 12
                console.log(param)
            } else if (recordListReducer.selectRecordListTab.selectedTab == 'export') {
                param.optionalParam.op = 13
                console.log(param)
            }
            getRecordList(param)
            //console.log(recordListReducer.selectRecordListTab.selectedTab)
        }

        /*********************************************************************** */

        return true
    }

    render() {
        let { changeRecordListTab } = this.props
        let { selectedTab } = this.props.recordListReducer.selectRecordListTab
        let { recordList } = this.props.recordListReducer.getRecordList.data
        let records = recordList.map(item => {
            return (<View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>{item.created_on}</Text>
                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>{item.comment}</Text>
                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>{item.comment}</Text>
            </View>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title='工作记录' />
                <Segment style={{ backgroundColor: '#00cade' }}>
                    <Button active={selectedTab == 'all' ? true : false} onPress={() => changeRecordListTab('all')}>
                        <Text style={selectedTab == 'all' ? { color: '#00bfd8' } : { color: '#ffffff' }}>所有</Text>
                    </Button>
                    <Button active={selectedTab == 'import' ? true : false} onPress={() => changeRecordListTab('import')}>
                        <Text style={selectedTab == 'import' ? { color: '#00bfd8' } : { color: '#ffffff' }}>入库</Text>
                    </Button>
                    <Button active={selectedTab == 'move' ? true : false} onPress={() => changeRecordListTab('move')}>
                        <Text style={selectedTab == 'move' ? { color: '#00bfd8' } : { color: '#ffffff' }}>移位</Text>
                    </Button>
                    <Button active={selectedTab == 'export' ? true : false} onPress={() => changeRecordListTab('export')}>
                        <Text style={selectedTab == 'export' ? { color: '#00bfd8' } : { color: '#ffffff' }}>出库</Text>
                    </Button>
                </Segment>
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <View>
                        {/*<View style={{ backgroundColor: '#f2f2f2', borderRadius: 20, paddingVertical: 10, width: window.width / 2, marginHorizontal: 10 }}>
                            <Text style={{ textAlign: 'center' }}>2017年4月12日</Text>
                        </View>*/}
                        <View style={{ paddingVertical: 10 }}>
                            {records}
                            {/*<View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#00bfd8' }}>一号仓库</Text>
                            </View>*/}
                            {/*<View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#f7666b' }}>一号仓库</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>时间</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>出库</Text>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#ffa700' }}>一号仓库</Text>
                            </View>*/}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        recordListReducer: state.RecordListReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecordList: (param) => {
        dispatch(RecordListAction.getRecordList(param))
    },
    changeRecordListTab: (param) => {
        dispatch(RecordListAction.changeRecordListTab(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordList)

