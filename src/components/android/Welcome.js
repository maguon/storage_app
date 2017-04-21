import React,{Component, PropTypes } from 'react'
import { StatusBar,View } from 'react-native';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import welcomeAction from '../../actions/WelcomeAction'
import {Scene, Router,Actions} from 'react-native-router-flux';
import {Button,Container,Content,Header,Icon,Text,Left,Body,Right,Title,List,ListItem,Toast} from 'native-base';
const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers);


class Welcome extends Component {
    constructor(props){
        super(props);
        this.state = { enterText: 3 };
    }


    render(){
        const {toLogin} = this.props;
        return (
            <Provider store={store}>
                <Container>
                    <Body style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#4f0f04"}}>
                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>Welcome</Text>
                            <Button block onPress={()=>{
                                toLogin();
                            }}><Text>Enter</Text></Button>
                        </View>
                    </Body>
                </Container>

            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => ({
    toLogin :()=>{
        dispatch(welcomeAction.toLogin());
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Welcome);