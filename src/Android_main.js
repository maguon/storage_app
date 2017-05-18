import React,{Component} from 'react'
import { StatusBar,Text,TextInput,View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import App from './android/App'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)

class Android_main extends Component {
    render(){
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default Android_main