import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

class LocalStorage {
    constructor() {
        this.storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,
            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: 1000 * 3600,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true
        })
    }
    saveKey(key, object) {
        this.storage.save({
            key: key,
            rawData: object
        })
    }

    saveKeyId(key, id, object) {
        this.storage.save({
            key: key,
            id: id,
            rawData: object
        })
    }
    loadKey(key, callback) {
        this.storage.load({
            key: key
        }).then(ret => {
            callback(null, ret)
        }).catch(err => {
            callback(err, null)
        })
    }
    loadKeyId(key, id, callback) {
        this.storage.load({
            key: key,
            id: id
        }).then(ret => {
            return ret;
        }).catch(err => {
            return null;
        })
    }
    removeKey(key) {
        this.storage.remove({
            key: key
        })
    }
    removeKeyId(key, id) {
        this.storage.remove({
            key: key,
            id: id
        })
    }
}


export default new LocalStorage()

