import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import * as StorageAction from '../../../actions/StorageAction'
import * as RecordAction from '../../../actions/RecordAction'
import RecordList from '../components/RecordList'
import StoragesPannelList from '../components/StoragesPannelList'
import SearchBar from '../components/SearchBar'


const window = Dimensions.get('window')

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList()
        this.props.getRecordsAllByUser({ id: 3 })
    }

    render() {
        return (
            <View>
                <View style={styles.image}>
                    <Image source={{ uri: 'banner_back' }} style={styles.image} />
                    <View style={styles.search}>
                        <SearchBar />
                    </View>
                </View>
                {/*<StoragesPannelList storages={this.props.storages} />*/}
                <RecordList records={this.props.records} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: window.width,
        height: window.width / 32 * 15,
    },
    search: {
        width: window.width,
        position: 'absolute',
        top: 0,
        height: 20
    }
})

const mapStateToProps = (state) => {
    return {
        storages: state.StorageReducer,
        records: state.RecordReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(StorageAction.getStorageList())
    },
    getRecordsAllByUser: (user) => {
        dispatch(RecordAction.getRecordsAllByUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
