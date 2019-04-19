import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Switch,
    Dimensions,
    TextInput
} from 'react-native'
import globalStyles from '../../../util/GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const SwitchBox = props => {
    const { input: { onChange,...restProps },
        label = '',
        last = false,
        isRequired = false,
        renderIcon,
        meta: { error, touched } } = props
    return (
        <View style={[styles.body, { borderBottomWidth: !last ? 0.3 : 0 }]} >
            <View style={styles.inputContainer} >
                {isRequired && <Text style={[globalStyles.midText, styles.warnColor]}>*</Text>}
                <Text style={[globalStyles.midText, styles.label]}>{label}</Text>
                <Switch
                    style={[styles.input]}
                    onValueChange={param => {
                        // console.log('param', param)
                        onChange(param)
                    }}
                    {...restProps} />
                {renderIcon && renderIcon()}
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.warnColor]}>{`*${error}`}</Text>
            </View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        borderColor: '#ddd',
        marginLeft: margin,
        paddingRight: margin
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        // textAlignVertical: 'center',
        // textAlign: 'right',
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0
    },
    label: {
        marginVertical: margin
    },
    labelError: {
        marginTop: margin,
        marginBottom: 0
    },
    warnColor: {
        color: 'red'
    },
    errView: {
        marginBottom: margin
    }
})

export default SwitchBox