/**
 * Created by lingxue on 2017/4/19.
 */
import React,{Component, PropTypes } from 'react'
import { StatusBar,View ,Navigator} from 'react-native';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../../reducers/index';
import * as appAction from '../../../actions/AppAction';
import localStorageKey  from '../../../util/LocalStorageKey';
import {Actions} from 'react-native-router-flux';
import {Button,Container,Content,Header,Icon,Form,Item,Text,Label,Input,Left,Body,Right,Title,List,ListItem,Toast} from 'native-base';

class Password extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {AppInfo} = this.props;
        return (
            <Provider store={store}>
                <Container>
                    <Header >
                        <Left>
                            <Button transparent onPress={()=>{Actions.pop()}}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body style={{backgroundColor:"transparent"}}>
                        <Title style={{}}>Password</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Body style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                        <Form style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",height:190}}>
                            <Item floatingLabel style={{flex:1}} >
                                <Label>Origin Password</Label>
                                <Input secureTextEntry={true} />
                            </Item>
                            <Item floatingLabel style={{flex:1}} >
                                <Label>New Password</Label>
                                <Input secureTextEntry={true}/>
                            </Item>
                            <Button block style={{marginTop:20}}>
                                <Text>OK</Text>
                            </Button>
                        </Form>
                    </Body>
                </Container>
            </Provider>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer

    };
};

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps,mapDispatchToProps)(Password);