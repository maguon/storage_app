import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon } from 'native-base'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'

const margin = 15
const RichTextBox = props => {
    const { input: { onChange, ...restProps },
        label = '',
        textStyle = {},
        meta: { error, touched } } = props
    return (
        <View style={styles.item}>
            <Label style={[styles.label, globalStyles.midText, textStyle]}>{label}</Label>
            <Input
                multiline={true}
                style={[styles.inputArea, globalStyles.midText]}
                onChangeText={onChange}
                {...restProps} />
            {touched && error && <Text style={[globalStyles.errorText, { marginTop: 15 }]}>* {error}</Text>}
        </View>
    )
}

export default RichTextBox

const styles = StyleSheet.create({
    item: {
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
    },
    label: {
        marginBottom: margin
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: margin
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    }
})

