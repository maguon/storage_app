import { Actions } from 'react-native-router-flux'

export const entrustList = parent => {
    if (parent === 'homeBlock') return Actions.entrustListAtHome
}

export const makeList = parent => {
    if (parent === 'homeBlock') return Actions.makeListAtHome
}

export const modelList = parent => {
    if (parent === 'homeBlock') return Actions.modelListAtHome
}

export const colorList = parent => {
    if (parent === 'homeBlock') return Actions.colorListAtHome
}

export const keyCabinetListForSelect = parent => {
    if (parent === 'keyBlock') return Actions.keyCabinetListForSelectAtKey
    if (parent === 'homeBlock') return Actions.keyCabinetListForSelectAtHome
}

export const keyCabinetAreaList = parent => {
    if (parent === 'keyBlock') return Actions.keyCabinetAreaListAtKey
    if (parent === 'homeBlock') return Actions.keyCabinetAreaListAtHome
}

export const keyCabinetRowList = parent => {
    if (parent === 'keyBlock') return Actions.keyCabinetRowListAtKey
}

export const keyCabinetColList = parent => {
    if (parent === 'keyBlock') return Actions.keyCabinetColListAtKey
}

export const keyOfCarList = parent => {
    if (parent === 'keyBlock') return Actions.keyOfCarListAtKey
}

export const storageList = parent => {
    if (parent === 'homeBlock') return Actions.storageListAtHome
}

export const areaList = parent => {
    if (parent === 'homeBlock') return Actions.areaListAtHome
}

export const rowList = parent => {
    if (parent === 'homeBlock') return Actions.rowListAtHome
}

export const lotList = parent => {
    if (parent === 'homeBlock') return Actions.lotListAtHome
}

export const colList = parent => {
    if (parent === 'homeBlock') return Actions.colListAtHome
}

export const yearList = parent => {
    if (parent === 'homeBlock') return Actions.yearListAtHome
}

export const carImagePhotoView = parent => {
    if (parent === 'homeBlock') return Actions.carImagePhotoViewAtHome
}

export const keyCabinetRowFilterList = parent => {
    if (parent === 'homeBlock') return Actions.keyCabinetRowFilterListAtHome
}

export const keyCabinetColFilterList = parent => {
    if (parent === 'homeBlock') return Actions.keyCabinetColFilterListAtHome
}


