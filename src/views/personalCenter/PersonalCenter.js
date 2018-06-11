import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast, Separator } from 'native-base'
import * as actions from '../../actions'
import { file_host } from '../../config/Host'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.openImage = this.openImage.bind(this)
    }

    openImage() {
        ImagePicker.openPicker({
            width: 360,
            height: 360,
            cropping: true
        }).then(image => {
            const pos = image.path.lastIndexOf('/')
            this.props.updatePersonalImage({
                uploadImage: {
                    optionalParam: {
                        imageType: 0
                    },
                    requiredParam: {
                        userId: this.props.loginReducer.data.user.uid
                    },
                    postParam: {
                        key: 'image',
                        imageUrl: image.path,
                        imageType: image.mime,
                        imageName: encodeURI(image.path.substring(pos + 1))
                    }
                },
                updateAvatarImage: {
                    putParam: {},
                    requiredParam: {
                        userId: this.props.loginReducer.data.user.uid
                    }
                }
            })
        }).catch(err => console.log(err))
    }

    render() {
        const { loginReducer: { data: { user: { real_name, avatar_image, mobile } } } } = this.props
        return <Container>
            <Content style={globalStyles.container}>
                <List style={styles.list}>
                    <Separator style={globalStyles.separator} />
                    <ListItem avatar style={{ borderBottomWidth: 0.3 }} onPress={this.openImage}>
                        <Left>
                            <Text style={globalStyles.midText}>头像</Text>
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }} />
                        <Right style={{ borderBottomWidth: 0 }}>
                            <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                        </Right>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>姓名</Text>
                        <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                    </ListItem>
                    <ListItem style={{ borderBottomWidth: 0, justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>电话</Text>
                        <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                    </ListItem>
                </List>
            </Content>
        </Container>
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
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePersonalImage: (param) => {
        dispatch(actions.personalCenter.updatePersonalImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
