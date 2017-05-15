import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import VinScannerLayout from '../layout/VinScanner'

export default class VinScanner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <VinScannerLayout/>
        )
    }

}