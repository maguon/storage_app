/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as storageAction from '../../actions/StorageDateAction'
import localStorageKey from '../../util/LocalStorageKey'
import { Actions } from 'react-native-router-flux'
import { Button, Container, Content, Header, Icon, Text, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast } from 'native-base'
import SearchBar from '../components/Bar/SearchBar'

class Setting extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        const { AppInfo } = this.props
        let viewStyle = { backgroundColor: '#00cade' }
        return (
            <Container style={{ flex: 1 }}>
                <SearchBar viewStyle={viewStyle} />
                <View style={{ flex: 1 }}>
                    <List>
                        <ListItem onPress={() => { Actions.recordList() }}>
                            <Left>
                                <Icon name="md-person" style={{ color: '#00cade' }} />
                                <Text>工作记录</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => { Actions.password() }}>
                            <Left>
                                <Icon name="ios-lock" style={{ color: '#00cade' }} />
                                <Text>修改密码</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text>版本信息 </Text>

                        </ListItem>
                    </List>
                    <Button light full style={{ marginTop: 20 }}>
                        <Text>退出登录</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}


// const styles = StyleSheet.create({
//     viewStyle: {
//         backgroundColor: '#00cade'
//     }
// })

const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer
    };
};

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Setting);