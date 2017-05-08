/**
 * Created by lingxue on 2017/4/17.
 */
import React,{Component, PropTypes } from 'react'
import { View } from 'react-native';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../../reducers/index';
import * as storageAction from '../../../actions/StorageAction';
import localStorageKey  from '../../../util/LocalStorageKey';
import {Actions} from 'react-native-router-flux';
import {Button,Container,Content,Header,Icon,Text,Left,Body,Right,Title,List,ListItem,Thumbnail,Toast} from 'native-base';

class Setting extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }

    render() {
        const {AppInfo} = this.props;
        return (
                <Container style={{flex:1}}>
                    <Header >
                        <Left></Left>
                        <Body style={{backgroundColor:"transparent"}}>
                        <Title style={{paddingLeft:70}}>Setting</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <View style={{flex:1}}>
                        <List>
                            <ListItem onPress={()=>{Actions.password()}}>
                                <Left>
                                    <Icon name="md-person" style={{color: '#0A69FE'}} />
                                    <Text>Account</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward"   />
                                </Right>
                            </ListItem>
                            <ListItem onPress={()=>{Actions.password()}}>
                                <Left>
                                    <Icon name="ios-lock" style={{color: '#0A69FE'}} />
                                    <Text>Password</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward"   />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Icon name="ios-ribbon"  style={{color: '#0A69FE'}} />
                                    <Text>Version</Text>
                                </Left>
                                <Body/>
                                <Right/>

                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Icon name="logo-android"  style={{color: '#0A69FE'}} />
                                    <Text>About</Text>
                                </Left>
                                <Body/>
                                <Right>
                                    <Icon name="ios-arrow-forward"  />
                                </Right>
                            </ListItem>
                        </List>
                        <Button light full style={{marginTop:20}}>
                            <Text>Quit</Text>
                        </Button>
                    </View>
                </Container>
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


export default connect(mapStateToProps,mapDispatchToProps)(Setting);