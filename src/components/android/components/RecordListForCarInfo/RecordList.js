/**
 * Created by rbyu on 2017/5/11.
 */



<View style={{ marginVertical: 10, marginHorizontal: 20 }}>
    <View style={{ flexDirection: 'row', paddingBottom: 10, borderColor: '#dddddd', borderBottomWidth: 1 }}>
        <View>
            <Image source={{ uri: 'icon_notes' }} style={{ width: 20, height: 20 }} />
        </View>
        <View style={{ marginLeft: 10 }}>
            <Text>操作记录</Text>
        </View>
    </View>
    <View>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
            <Text style={{ flex: 2, fontSize: 12,color:'#00cade' }}>入库</Text>
            <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
            <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
            <Text style={{ flex: 2, fontSize: 12 ,color:'#ffa700'}}>移位</Text>
            <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
            <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
            <Text style={{ flex: 2, fontSize: 12 ,color:'#f7656a'}}>出库</Text>
            <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
            <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
        </View>
    </View>
</View>