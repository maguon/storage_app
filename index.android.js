/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Body,Container,Content,Header,Left,Right,Title} from 'native-base';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import {Scene, Router,Actions,TabBar} from 'react-native-router-flux';


import reducers from './src/reducers';


const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers);
export default class storage_app extends Component {
  render() {
    return (
        <Provider store={store}>
          <Container>
            <Content>
              <Header >
                <Left></Left>
                <Body style={{backgroundColor:"transparent"}}>
                <Title style={{paddingLeft:70}}>Setting</Title>
                </Body>
                <Right></Right>
              </Header>
            </Content>
          </Container>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('storage_app', () => storage_app);
