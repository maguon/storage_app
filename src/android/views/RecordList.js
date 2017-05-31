import React, { Component } from 'react'
import { View, Dimensions, ScrollView, SectionList } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Segment, Button, Text } from 'native-base'
import * as RecordListAction from '../../actions/RecordListAction'
import RecordListItem from '../components/RecordListForHome/RecordListItem'

const window = Dimensions.get('window')

class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let param = { optionalParam: { userid: this.props.user.userId, start: 0, size: 20 } }
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
                console.log('recordListReducer.getRecordList执行成功')

            } else if (recordListReducer.getRecordList.isResultStatus == 1) {
                console.log('recordListReducer.getRecordList执行错误')

            }
            else if (recordListReducer.getRecordList.isResultStatus == 2) {
                console.log('recordListReducer.getRecordList执行失败', recordListReducer.getRecordList.failedMsg)

            }
        }
        /*********************************************************************** */

        /** homeReducer.getStoragesHome */
        if (recordListReducer.getRecordListMore.isExecStatus == 1) {
            console.log('recordListReducer.getRecordListMore', '开始执行')
        } else if (recordListReducer.getRecordListMore.isExecStatus == 2) {
            if (recordListReducer.getRecordListMore.isResultStatus == 0) {
                console.log('recordListReducer.getRecordListMore执行成功')

            } else if (recordListReducer.getRecordListMore.isResultStatus == 1) {
                console.log('recordListReducer.getRecordListMore执行错误',recordListReducer.getRecordListMore.errorMsg)

            }
            else if (recordListReducer.getRecordListMore.isResultStatus == 2) {
                console.log('recordListReducer.getRecordListMore执行失败', recordListReducer.getRecordListMore.failedMsg)

            }
        }
        /*********************************************************************** */


        /** selectRecordListTab */

        if (this.props.recordListReducer.selectRecordListTab.selectedTab != recordListReducer.selectRecordListTab.selectedTab) {
            let param = { optionalParam: { userid: this.props.user.userId, start: 0, size: 20 } }
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
        }

        /*********************************************************************** */

        return true
    }
    getRecordListMore() {
        let { getRecordListMore, recordListReducer } = this.props
        let { userId } = this.props.user
        let { getRecordList, selectRecordListTab } = recordListReducer
        console.log(this.props.recordListReducer)
        let param = { optionalParam: { userid: userId, start: getRecordList.data.recordList.length, size: 20 } }
        if (selectRecordListTab.selectedTab == 'all') {
            console.log(param)
        } else if (selectRecordListTab.selectedTab == 'import') {
            param.optionalParam.op = 11
            console.log(param)
        } else if (selectRecordListTab.selectedTab == 'move') {
            param.optionalParam.op = 12
            console.log(param)
        } else if (selectRecordListTab.selectedTab == 'export') {
            param.optionalParam.op = 13
            console.log(param)
        }
        getRecordListMore(param)

    }

    render() {
        let { changeRecordListTab } = this.props
        let { selectedTab } = this.props.recordListReducer.selectRecordListTab
        let { recordList } = this.props.recordListReducer.getRecordList.data
         console.log(recordList)


        let records = recordList
            .reduce((acc, val) => {
                let obj = acc.find((item) => {
                    return new Date(item.created_on).toLocaleDateString() == new Date(val.created_on).toLocaleDateString()
                })
                if (obj) {
                    obj.data.push(val)
                } else {
                    acc.push({ created_on: new Date(val.created_on).toLocaleDateString(), key: acc.length, data: [val] })
                }
                return acc
            }, [])
            .sort((a, b) => {
                return a.created_on < b.created_on
            }).map((item) => {

                return { data: item.data, key: item.created_on }
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
                <SectionList style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                    renderItem={({ item }) => {
                        return (<RecordListItem recordItem={item} key={item._id} />)
                    }}
                    renderSectionHeader={({ section }) => {
                        return (<View style={{ width: window.width / 2, backgroundColor: '#f1f1f1', borderRadius: 15, alignItems: 'center', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5, marginTop: 5 }}>{section.key}</Text>
                        </View>)
                    }}
                    sections={records}
                    onEndReached={this.getRecordListMore.bind(this)} />
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
    },
    getRecordListMore: (param) => {
        dispatch(RecordListAction.getRecordListMore(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordList)

