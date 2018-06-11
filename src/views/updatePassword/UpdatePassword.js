import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, List, Left, Form, ListItem, Thumbnail, Separator, Body, Right, Icon, Input, Item, Label, Button } from 'native-base'
import globalStyles from '../../util/GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import TextBox from '../../components/share/form/TextBox'
import * as actions from '../../actions'

const UpdatePassword = props => {
    const { handleSubmit } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Form style={styles.list} >
                    <Field name='oldPassword' label='原密码' secureTextEntry={true} isRequired={true} component={TextBox} />
                    <Field name='newPassword' label='新密码' secureTextEntry={true} isRequired={true} component={TextBox} />
                    <Field name='confirmPassword' label='确认密码' secureTextEntry={true} isRequired={true} last={true} component={TextBox} />
                </Form>
                <Button full style={[globalStyles.styleBackgroundColor, styles.button]} onPress={handleSubmit}>
                    <Text style={[globalStyles.midText, styles.buttonTitle]}>完成</Text>
                </Button>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff'
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        marginTop: 50,
        marginHorizontal: 10,
        marginBottom: 10
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        updatePasswordReducer: state.updatePasswordReducer,
        formReducer: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => {
        dispatch(actions.updatePassword.updatePassword())
    }
})


const validate = values => {
    const errors = { oldPassword: [], newPassword: [], confirmPassword: [] }
    if (!values.oldPassword) {
        errors.oldPassword = [...errors.oldPassword, '必填']
    } else {
        errors.oldPassword = null
    }

    if (!values.newPassword) {
        errors.newPassword = [...errors.newPassword, '必填']
    } else {
        errors.newPassword = null
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = [...errors.confirmPassword, '必填']
    } else {
        errors.confirmPassword = null
    }
    return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'updatePasswordForm',
        validate,
    })(UpdatePassword))
