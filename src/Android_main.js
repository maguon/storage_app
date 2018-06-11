import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import App from './App'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

export default class Android_main extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
