import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

const propTypes = {
  selected: PropTypes.bool,
  online: PropTypes.string,
  outline: PropTypes.string
};

const TabIcon = (props) => {
  return (
      <Icon name={props.selected ? props.online : props.outline} style={{ color: props.selected ? styleColor : '#999' }} />
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
