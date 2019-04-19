import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import globalStyles from '../../util/GlobalStyles'
import { Container, Content, Button } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import CheckBox from '../../components/share/CheckBox'
import { connect } from 'react-redux'
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const MakePDF = props => {
    const { handleSubmit } = props
    console.log('props', props)
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
                <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Field
                        name='carImage'
                        label='车辆照片'
                        component={CheckBox}
                    />
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Field
                        name='storageImage'
                        label='仓储照片'
                        component={CheckBox}
                    />
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Field
                        name='transImage'
                        label='航运照片'
                        component={CheckBox}
                    />
                </View>
                <View style={{ margin: 15 }}>
                    <Button full style={globalStyles.styleBackgroundColor} onPress={handleSubmit}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>生成PDF</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
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
    makePDFReducer: state.makePDFReducer
})

const createPDF = async ( html, fileName ) => {
    console.log(html)
    console.log(fileName)

    const file = await RNHTMLtoPDF.convert({
        html:html,
        fileName,
        directory: 'Download',
    })
    console.log(file)
}


export default connect(mapStateToProps)(reduxForm({
    form: 'makePDFForm',
    onSubmit: (values, dispatch, props) => {
        const { makePDFReducer: { data: { carInfo } } } = props
        // console.log('getHtmlText', getHtmlText({ formValues: values, carInfo }))
        // console.log('props', props)
        createPDF(getHtmlText({ formValues: values, carInfo }), carInfo.vin)

        // dispatch(actions.makePDF.getCarInfo({carId}))
    }
})(MakePDF))

// const html = `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
// <html xmlns='http://www.w3.org/1999/xhtml'>
// <head></head><body><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <h1 style='color:#09ff05'>PDF TEST</h1><h1 style='color:#09ff05'>PDF TEST</h1>
// <img src='http://stg.myxxjs.com:9002/api/image/5cb58781fb9c22779c127515' alt='CERTIFICATE PDF' style='width: 200px;height:200px;'/>
// </body></html>`

const getHtmlText = param => {
    console.log('param', param)
    const { formValues, carInfo } = param
    let html = `<html><head></head><body>`
    if (formValues.carInfo) {
        html += `<h1 style='color:#09ff05'>P车辆基本信息</h1>`
        // html += carInfo.vin ? `<p>vin:${carInfo.vin}</p>` : ''
        // html += carInfo.vin ? `<p>经销商:${carInfo.vin}</P>` : ''
        // html += carInfo.make_name ? `<p>品牌:${carInfo.make_name}</p>` : ''
        // html += carInfo.vin ? `<p>年份:${carInfo.vin}</P>` : ''
        // html += carInfo.vin ? `<p>发动机编号:${carInfo.vin}</P>` : ''
    }
    return `${html}</body></html>`
}
