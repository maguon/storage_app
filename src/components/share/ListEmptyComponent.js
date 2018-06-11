import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

const ListEmptyComponent = props => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={globalStyles.xlText}>暂无数据</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        paddingTop: 50,
        alignItems: 'center'
    }
})

export default ListEmptyComponent