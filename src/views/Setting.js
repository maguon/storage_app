import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Container, Content, List, Left, ListItem, Thumbnail, Separator, Body, Right, Icon, Button } from 'native-base'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../util/GlobalStyles'
import { file_host } from '../config/Host'
import ConfirmModal from '../components/share/ConfirmModal'
import * as routerDirection from '../util/RouterDirection'
import * as android_app from '../android_app.json'

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false,
        }
        this.exitApp = this.exitApp.bind(this)
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
    }


    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        this.props.cleanLogin()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        const { cleanLogin,
            loginReducer: { data: { user: { real_name, avatar_image, mobile } } },
            initReducer: { data: { version: { force_update, currentVersion, url } } }, initReducer } = this.props
        return (
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        {/* <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                                    <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                                </View>
                            </View>
                        </ListItem> */}
                        <ListItem icon >
                            <Left>
                                <Icon name="ios-contact" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>姓名</Text>
                            </Body>
                            <Right>
                                <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon last>
                            <Left>
                                <Icon name="ios-phone-portrait" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>电话</Text>
                            </Body>
                            <Right>
                                <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-unlock-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>修改密码</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last>
                            <Left>
                                <Icon name="ios-cube-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>版本信息：v{currentVersion}{`(${android_app.stageList.find(item => item.id == android_app.stage).value})`}</Text>
                            </Body>
                            <Right >
                                {force_update != 0 && <TouchableOpacity onPress={() => {
                                    if (url) {
                                        Linking.canOpenURL(url)
                                            .then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url)
                                                } else {
                                                    return Linking.openURL(url)
                                                }
                                            })
                                            .catch(err => console.error('An error occurred', err))
                                    }
                                }}>
                                    <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                                </TouchableOpacity>}
                            </Right>
                        </ListItem>
                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]} onPress={this.exitApp}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk.bind(this)}
                    onPressCancel={this.onPressCancel.bind(this)}
                />
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        initReducer: state.initReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        // dispatch(loginAction.cleanLogin())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)