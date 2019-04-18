import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Container, Content, ListItem, Left, Icon, Body, Right, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { connect } from 'react-redux'
import moment from 'moment'


const KeyInfo = props => {
    const { initParam: { keyInfo: { key_cabinet_name = '', area_name = '', row = '', col = '' } },
        keyInfoReducer: { data: { carInfo: { vin = '', make_name = '', model_name = '', pro_date, colour, entrust_name = '', plan_out_time
            , enter_time, valuation = 0, mso_status, engine_num = '', storage_name = '', start_port_name = '' }, carInfo }, getCarInfoOfKey } } = props
    if (getCarInfoOfKey.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <Content>
                    <View style={{ backgroundColor: '#ebeef0', justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderBottomColor: '#ddd', borderBottomWidth: 0.5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SimpleLineIcons name='key' style={[globalStyles.styleColor, { fontSize: 16, paddingRight: 3 }]} />
                            <Text style={[globalStyles.largeText, globalStyles.styleColor, { paddingLeft: 3 }]}>{key_cabinet_name}</Text>
                        </View>
                        <Text style={[globalStyles.xlText, globalStyles.styleColor]}>{area_name} <Text style={globalStyles.midText}>扇区</Text> {row} <Text style={globalStyles.midText}>排</Text> {col} <Text style={globalStyles.midText}>号</Text></Text>
                    </View>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>车辆vin码：{vin}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>制造商</Text>
                        <Text style={globalStyles.midText}>{make_name}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>型号</Text>
                        <Text style={globalStyles.midText}>{model_name}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>生产日期</Text>
                        <Text style={globalStyles.midText}>{pro_date ? moment(pro_date).format('YYYY-MM-DD') : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>颜色</Text>
                        {!!colour && <View style={{ width: 15, height: 15, borderColor: '#ddd', borderWidth: 0.5, backgroundColor: `#${colour.replace(/\s+/g,"")}` }} />}
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>发动机号</Text>
                        <Text style={globalStyles.midText}>{engine_num}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>委托方</Text>
                        <Text style={globalStyles.midText}>{entrust_name}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>车辆估值</Text>
                        <Text style={globalStyles.midText}>$ <Text style={{ color: 'red' }}>{valuation}</Text></Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>是否MS0</Text>
                        {mso_status == 2 && <Text style={globalStyles.midText}>是</Text>}
                        {mso_status == 1 && <Text style={globalStyles.midText}>否</Text>}
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>存放位置</Text>
                        <Text style={globalStyles.midText}>{start_port_name} {storage_name} {carInfo.area_name ? `${carInfo.area_name}` : ''}区 {carInfo.row ? `${carInfo.row}` : ''}排 {carInfo.col ? `${carInfo.col}` : ''}列</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>入库时间</Text>
                        <Text style={globalStyles.midText}>{enter_time ? moment(enter_time).format('YYYY-MM-DD') : ''}</Text>
                    </ListItem>
                    <ListItem style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.midText}>计划出库日期</Text>
                        <Text style={globalStyles.midText}>{plan_out_time ? moment(plan_out_time).format('YYYY-MM-DD') : ''}</Text>
                    </ListItem>
                </Content>
            </Container>
        )
    }

}

const mapStateToProps = (state) => ({
    keyInfoReducer: state.keyInfoReducer
})

export default connect(mapStateToProps)(KeyInfo)
