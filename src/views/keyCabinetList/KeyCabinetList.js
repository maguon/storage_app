import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    InteractionManager,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner, Icon } from 'native-base'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import * as actions from '../../actions'
import { Actions } from 'react-native-router-flux'

const renderListItem = props => {
    const { item: { key_cabinet_name = '', position_count = 0, area_count = 0, id }, item,
        getCarKeyPositionCount, getCarKeyPositionCountWaiting, getKeyCabinetAreaListWaiting, getKeyCabinetAreaList } = props
    return (
        <TouchableOpacity onPress={() => {
            getCarKeyPositionCountWaiting()
            getKeyCabinetAreaListWaiting()
            Actions.keyCabinetArea({ initParam: { keyCabinet: item } })
            InteractionManager.runAfterInteractions(() => {
                getCarKeyPositionCount({ carKeyCabinetId: id })
                getKeyCabinetAreaList({ carKeyCabinetId: id })
            })
        }} style={{ flexDirection: 'row', backgroundColor: '#fff', margin: 5, padding: 5, borderWidth: 0.5, borderColor: '#ddd' }}>
            <View style={{ padding: 5 }}>
                <SimpleLineIcons name='key' style={{ fontSize: 30, color: styleColor }} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>{key_cabinet_name}</Text>
                    <Text style={[globalStyles.midText, globalStyles.styleBackgroundColor, { paddingHorizontal: 15, borderRadius: 15, color: "#fff" }]}>总：{position_count}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={[globalStyles.smallText]}>扇区  <Text style={[globalStyles.midText, globalStyles.styleColor]}>{area_count}</Text></Text>
                    {/* <Text style={[globalStyles.smallText]}>剩余位置  <Text style={[globalStyles.midText, globalStyles.styleColor]}>365</Text></Text> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}


class KeyCabinetList extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { getKeyCabinetList, getKeyCabinetListWaiting } = this.props
        getKeyCabinetListWaiting()
        InteractionManager.runAfterInteractions(getKeyCabinetList)
    }

    render() {
        const { keyCabinetListReducer: { data: { keyCabinetList }, getKeyCabinetList }, getCarKeyPositionCount, getCarKeyPositionCountWaiting,
            getKeyCabinetAreaListWaiting, getKeyCabinetAreaList } = this.props
        if (getKeyCabinetList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <FlatList
                        style={{ backgroundColor: '#ebeef0', padding: 5 }}
                        keyExtractor={(item, index) => index}
                        data={keyCabinetList}
                        renderItem={param => renderListItem({
                            getCarKeyPositionCount, getCarKeyPositionCountWaiting,
                            getKeyCabinetAreaListWaiting, getKeyCabinetAreaList, ...param
                        })}
                    />
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    keyCabinetListReducer: state.keyCabinetListReducer
})

const mapDispatchToProps = (dispatch) => ({
    getKeyCabinetList: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetList())
    },
    getKeyCabinetListWaiting: () => {
        dispatch(actions.keyCabinetList.getKeyCabinetListWaiting())
    },
    getCarKeyPositionCount: param => {
        dispatch(actions.keyCabinetAreaHeader.getCarKeyPositionCount(param))
    },
    getCarKeyPositionCountWaiting: () => {
        dispatch(actions.keyCabinetAreaHeader.getCarKeyPositionCountWaiting())
    },
    getKeyCabinetAreaList: param => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaList(param))
    },
    getKeyCabinetAreaListWaiting: () => {
        dispatch(actions.keyCabinetArea.getKeyCabinetAreaListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyCabinetList)

