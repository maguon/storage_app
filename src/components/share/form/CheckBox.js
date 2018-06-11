import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    InteractionManager,
    Dimensions,
    Modal
} from 'react-native'
import { Item, Input, ListItem, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15
export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.renderCheckListItem = this.renderCheckListItem.bind(this)
    }


    renderCheckListItem(onChange) {
        return this.props.itemList.map((item, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => {
                    this.setState({ modalVisible: false })
                    onChange(item)
                }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>{item.value}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    render() {
        let { input: { onChange, value, ...restProps },
            label = '',
            last = false,
            isRequired = false,
            textStyle = {},
            meta: { error, touched } } = this.props
        return (
            <TouchableOpacity style={styles.body} onPress={() => this.setState({ modalVisible: true })}>
                <View style={styles.item}>
                    <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[globalStyles.midText, textStyle]}>{value.value}</Text>
                        <Icon name='ios-arrow-down-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#bbb', paddingLeft: 15 }} />
                    </View>
                </View>
                {touched && (error && <View style={styles.errView}>
                    <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
                </View>)}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            borderColor: '#ccc',
                        }}>
                            <View style={{ borderBottomWidth: 1, borderColor: styleColor }}>
                                <Text style={{ paddingVertical: 10, color: styleColor, textAlign: 'center' }}>{this.props.listTitle}</Text>
                            </View>
                            {this.renderCheckListItem(onChange)}
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})


// export default CheckBox