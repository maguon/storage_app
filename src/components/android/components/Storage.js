import React, { Component } from 'react'
import { View } from 'react-native'
import { Text ,ListItem} from 'native-base'


export default class Storage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
              <ListItem >
                  <View>
                      <View style={{flexDirection:"row"}}>
                          <Text>图片</Text>
                          <Text>一号仓库</Text>
                          <Text>车位总数</Text>
                          <Text>剩余车位</Text>
                          </View>
                      <View style={{flexDirection:"row"}}>
                          <Text>今日计划出库</Text>
                          <Text>今日入库</Text>
                          <Text>今日出库</Text>
                          </View>
                  </View>
                    
              </ListItem >
            </View>

        )

    }

}