/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Android_main from './src/Android_main';

/*export default class nt extends Component {
    render() {
        return (
            <Container><Content></Content></Container>
        );
    }
}*/
AppRegistry.registerComponent('storage_app', () => Android_main);
