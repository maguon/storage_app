import React, { Component } from 'react'
import { Text, View, StyleSheet, Linking } from 'react-native'
import globalStyles from '../../util/GlobalStyles'
import { Container, Content, Button } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import CheckBox from '../../components/share/CheckBox'
import { connect } from 'react-redux'
import * as reduxActions from '../../actions'
import moment from 'moment'
import ModalWaiting from '../../components/share/ModalWaiting'

class MakePDF extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, makePDFReducer: { createPDF: { isResultStatus } } } = this.props
        // console.log('props', this.props)
        return (
            <Container>
                <Content>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Field
                            name='carInfo'
                            label='车辆基本信息'
                            component={CheckBox}
                        />
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Field
                            name='storageInfo'
                            label='仓储信息'
                            component={CheckBox}
                        />
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Field
                            name='transInfo'
                            label='航运信息'
                            component={CheckBox}
                        />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Button full style={globalStyles.styleBackgroundColor} onPress={handleSubmit}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>生成PDF</Text>
                        </Button>
                    </View>
                    <ModalWaiting visible={isResultStatus == 1} title={'pdf生成中...'} />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    fontColor: {
        color: '#bd417c'
    }
})

const mapStateToProps = (state) => ({
    initialValues: {
        carInfo: true,
        storageInfo: true,
        transInfo: true,
        carImage: false,
        storageImage: false,
        transImage: false
    },
    makePDFReducer: state.makePDFReducer,
    carImageReducer: state.carImageReducer
})

export default connect(mapStateToProps)(reduxForm({
    form: 'makePDFForm',
    onSubmit: (values, dispatch, props) => {
        const { makePDFReducer: { data: { carInfo } } } = props
        const { carImageReducer: { data: { carImageList, storageImageList, transImageList } } } = props
        dispatch(reduxActions.makePDF.createPDF(getHtmlText({ formValues: values, carInfo, carImageList, storageImageList, transImageList }), carInfo.vin))
    }
})(MakePDF))


const getHtmlText = param => {
    const { formValues, carInfo, carImageList, storageImageList, transImageList } = param
    let html = `<html>
    <head>
        <style type="text/css">
            body,
            ul,
            li {
                margin: 0px;
                padding: 0px;
            }
    
            body {
                width: 1000px;
                page-break-inside:avoid;
            }
    
            html {
                font-size: 15px;
            }
    
            ul {
                list-style-type: none;
            }
    
            .clearfix::before,
            .clearfix::after {
                content: '';
                display: table;
            }
    
            .clearfix::after {
                clear: both;
            }
    
            .header {
                text-align: center;
            }
    
            .header-logo {
                float: left;
                margin: 50px 50px 50px 0px;
            }
    
            .header-logo-image {
                height: 90px;
            }
    
            .header-info {
                float: left;
                margin: 50px 0px 50px 50px;
            }
    
            .header-title {
                font-size: 20px;
                font-weight: bold;
            }
    
            .content li {
                display: block;
                float: left;
                width: 33.3%;
                height: 50px;
                line-height: 50px;
                text-align: left;
                color: #9e9e9e;
            }
    
            .content ul {
                padding: 0px 24px;
            }
    
            .content {
                border: 1px solid #bdbdbd;
                margin: 0px 0px 50px 0px;
            }
    
            .content-title {
                background-color: #eceff1;
                padding: 12px 24px;
                color: #407BC7;
            }
    
            .line {
                background-color: #dbdbdb;
                height: 1px;
                margin: 0px 24px;
            }
    
            .contentImage {
                border: 1px solid #bdbdbd;
                margin: 0px 0px 50px 0px;
                padding: 0.5%;
            }
    
            .contentImage li {
                display: block;
                float: left;
                width: 50%;
            }
    
            .contentImage img {
                width: 100%;
                border: 1px solid #eee;
            }
    
            .contentImageContaint {
                width: 98%;
                margin: 0 auto;
                padding: 1% 0px
            }
        </style>
    </head>
    
    <body>
    <div class="clearfix">
        <div class="header-logo">
            <img src="http://stg.myxxjs.com:9000/assets/images/logo2x.png" class="header-logo-image" />
        </div>
        <div class="header-info">
            <div class="header-title">US HONYA INTERNATIONAL INC.</div>
            <div>16293 GALE AVE</div>
            <div>CITY OF INDUSTRY, CA 91745</div>
            <div>714-332-0266</div>
            <div>rlf@ushonya.cc</div>
            <div>www.ushonya.com</div>
        </div>
    </div>`
    if (formValues.carInfo) {
        html += `<div><div class="content"><div class="content-title">车辆信息</div><ul class="clearfix">`
        html += carInfo.vin ? `<li>vin：${carInfo.vin}</li>` : '<li>vin：</li>'
        html += carInfo.make_name ? `<li>制造商：${carInfo.make_name}</li>` : '<li>制造商：</li>'
        html += carInfo.model_name ? `<li>品牌：${carInfo.model_name}</li>` : '<li>品牌：</li>'
        html += `</ul><div class="line"></div><ul class="clearfix">`
        html += carInfo.pro_date ? `<li>年份：${carInfo.pro_date}</li>` : `<li>年份：</li>`
        html += carInfo.engine_num ? `<li>发动机号：${carInfo.engine_num}</li>` : `<li>发动机号：</li>`
        html += `</ul></div>`

        if (carImageList.length > 0) {
            html += `<div class="contentImage clearfix">
                <ul>`
            carImageList.forEach(item => {
                html += `<li>
                                 <div class="contentImageContaint">
                                     <img src="http://stg.myxxjs.com:9002/api/image/${item.url}" />
                                 </div>
                             </li>`
            })
            html += `</ul></div>`
        } else { }
    }

    if (formValues.storageInfo) {
        html += `<div class="content"><div class="content-title">仓储信息</div><ul class="clearfix">`
        html += carInfo.enter_time ? `<li>入库时间：${moment(carInfo.enter_time).format('YYYYMMDD HH:mm:ss')}</li>` : '<li>入库时间：</li>'
        html += carInfo.plan_out_time ? `<li>计划出库日期：${moment(carInfo.plan_out_time).format('YYYYMMDD')}</li>` : '计划出库日期：</li>'
        html += carInfo.real_out_time ? `<li>实际出库日期：${moment(carInfo.real_out_time).format('YYYYMMDD')}</li>` : `<li>实际出库日期：</li>`
        html += `</ul><div class="line"></div><ul class="clearfix">`
        html += carInfo.p_id ? `<li>车辆存放位置：${carInfo.storage_name} ${carInfo.row}排 ${carInfo.lot}列</li>` : '<li>车辆存放位置：</li>'
        html += carInfo.car_key_position_id && carInfo.key_cabinet_id ? `<li>钥匙存放位置：${carInfo.key_cabinet_name}${carInfo.area_name}扇区${carInfo.car_key_position_row}排${carInfo.car_key_position_col}列</li>` : '<li>钥匙存放位置：</li>'
        html += `</ul></div>`
        if (storageImageList.length > 0) {
            html += `<div class="contentImage clearfix">
            <ul>`
            storageImageList.forEach(item => {
                html += `<li>
                                 <div class="contentImageContaint">
                                     <img src="http://stg.myxxjs.com:9002/api/image/${item.url}" />
                                 </div>
                             </li>`
            })
            html += `</ul></div>`
        } else { }
    }

    if (formValues.transInfo) {
        html += `<div class="content"><div class="content-title">海运信息</div><ul class="clearfix">`
        html += carInfo.start_port_name ? `<li>始发港口：${carInfo.start_port_name}</li>` : '<li>始发港口：</li>`'
        html += carInfo.end_port_name ? `<li>目的港口：${carInfo.end_port_name}</li>` : '<li>目的港口：</li>'
        html += carInfo.start_ship_date ? `<li>开船时间：${moment(carInfo.start_ship_date).format('YYYYMMDD')}</li>` : '<li>开船时间：</li>'
        html += `</ul><div class="line"></div><ul class="clearfix">`
        html += carInfo.ship_company_name ? `<li>船公司：${carInfo.ship_company_name}</li>` : '<li>船公司：</li>'
        html += carInfo.ship_name ? `<li>船名：${carInfo.ship_name}</li>` : '<li>船名：</li>`'
        html += carInfo.end_ship_date ? `<li>到港时间：${moment(carInfo.end_ship_date).format('YYYYMMDD')}</li>` : '<li>到港时间：</li>'
        html += `</ul><div class="line"></div><ul class="clearfix">`
        html += carInfo.container ? `<li>货柜：${carInfo.container}</li>` : '<li>货柜：</li>'
        html += carInfo.booking ? `<li>booking：${carInfo.booking}</li>` : '<li>booking：</li>'
        html += carInfo.tab ? `<li>封签：${carInfo.tab}</li>` : '<li>封签：</li>'
        html += `</ul></div>`

        if (transImageList.length > 0) {
            html += `<div class="contentImage clearfix"><ul>`
            transImageList.forEach(item => {
                html += `<li>
                                 <div class="contentImageContaint">
                                     <img src="http://stg.myxxjs.com:9002/api/image/${item.url}" />
                                 </div>
                             </li>`
            })
            html += `</ul></div>`
        } else { }
    }
    return `${html}</div></body></html>`
}
