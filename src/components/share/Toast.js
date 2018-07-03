import { ToastAndroid, Platform } from 'react-native'

export const show = (message, duration) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, duration)
    }

    
}

