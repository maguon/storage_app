import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import globalStyles from '../../util/GlobalStyles'


const ConfirmModal = ({ onPressOk, onPressCancel, isVisible,title }) => {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={isVisible}
            onRequestClose={onPressCancel}
        >
            <View style={styles.modalStyle}>
                <View style={styles.subView}>
                    <Text style={[globalStyles.midText,globalStyles.styleColor,styles.titleText]}>{title}</Text>
                    <View style={styles.horizontalLine} />
                    <TouchableOpacity 
                        onPress={onPressOk}>
                        <Text style={[globalStyles.midText,styles.buttonText]}>确定</Text>
                    </TouchableOpacity>
                    <View style={styles.horizontalLine} />
                    <TouchableOpacity 
                        onPress={onPressCancel}>
                        <Text style={[globalStyles.midText,styles.buttonText]}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

var styles = StyleSheet.create({
    // modal的样式  
    modalStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    // modal上子View的样式  
    subView: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 0.3,
        borderColor: '#eee',
    },
    // 标题  
    titleText: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // 水平的分割线  
    horizontalLine: {
        marginTop: 5,
        height: 0.3,
        backgroundColor: '#eee',
    },
    buttonText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
})

export default ConfirmModal
