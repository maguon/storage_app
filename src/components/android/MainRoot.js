/**
 * Created by lingxue on 2017/4/17.
 */
import React,{Component, PropTypes } from 'react'
import { StatusBar,View ,Navigator} from 'react-native';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import * as appAction from '../../actions/AppAction';
import localStorageKey  from '../../util/LocalStorageKey';
import {Button,Container,Content,Footer,FooterTab,Icon,Text} from 'native-base';

import Setting from './Setting';

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers);


class Main extends Component {

    renderSelectedTab () {
        switch (this.state.selectedTab) {
            case 'home':
                return (<View><Text>Home</Text></View>);
                break;
            case 'record':
                return (<View><Text>Record</Text></View>);
                break;
            case 'setting':
                return (<Setting/>);
                break;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'setting',
        }

    }

    changeTab(selectedTab) {
        this.setState({selectedTab})
    }


    render() {
        const {AppInfo} = this.props;
        const {selectedTab} = this.state;
        return (
            <Provider store={store}>
                <Container>
                    <Content>
                        {this.renderSelectedTab()}
                    </Content>
                    <Footer rasied>
                        <FooterTab>
                            <Button
                                active={selectedTab === 'home'}
                                onPress={() => this.changeTab('home')}>
                                <Icon name={selectedTab === 'home'?"ios-home":"ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            <Button
                                active={selectedTab === 'record'}
                                onPress={() => this.changeTab('record')}>
                                <Icon name={selectedTab === 'record'?"ios-car":"ios-car-outline"} type="ionicons"/>
                                <Text>record</Text>
                            </Button>
                            <Button
                                active={selectedTab === 'setting'}
                                onPress={() => this.changeTab('setting')}>
                                <Icon name={selectedTab === 'setting'?"ios-settings":"ios-settings-outline"} type="ionicons"/>
                                <Text>setting</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
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


export default connect(mapStateToProps,mapDispatchToProps)(Main);