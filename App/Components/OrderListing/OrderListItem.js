import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { View, Text } from 'react-native'
import { Colors } from '../../Themes'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StatusLabel from '../WcGlobals/StatusLabel'
import OrderItemsList from '../WcGlobals/OrderItemsList'
import CurrencySymbols from '../../Constants/CurrencySymbols'
import FullScreenLoader from '../FullScreenLoader'
import { CapabilitiesSelectors } from '../../Redux/CapabilitiesRedux'
import moment from 'moment'
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu'

import styles from './Styles/OrderListItemStyle'

const { SlideInMenu } = renderers

class OrderListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    order: PropTypes.object,
    index: PropTypes.number,
    capabilities: PropTypes.object
  }

  statuses = [
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Processing', value: 'processing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' }
  ]

  getOrderStatus = () => {
    const { order } = this.props
    return this.statuses.filter(
      ({ value }) => {
        if (order.status === 'processing') { return value === 'completed' }
        if (order.status === 'completed') { return false }
        if (order.status === 'on-hold') { return value === 'completed' || value === 'processing' }
        if (order.status === 'pending') { return value !== order.status }
      }
    )
  }

  onSelect = (value) => {
    const { onUpdate, order } = this.props
    onUpdate(order.id, value)
  }

  render () {
    if (this.props.updating) {
      return (<FullScreenLoader />)
    }
    const statuses = this.getOrderStatus()
    // console.log(statuses);
    const { order, index } = this.props
    const date = moment(order.date_created).format('DDMMM YYYY')
    const time = moment(order.date_created).format('hh:mmA')
    if (!this.props.capabilities.order_status_update && statuses.length !== 0) {
      return (
        <Menu name={`order-status-${this.props.index}`} renderer={SlideInMenu} style={this.props.index ? styles.listItemContainer : styles.listItemContainerFirst} onSelect={this.onSelect}>
          <MenuTrigger>
            <View style={styles.listItemRow}>
              <View style={styles.orderNameStatusContainer}>
                <View style={styles.orderNoCustContainer}>
                  <Text style={styles.orderName}>{'#' + order.id}</Text>
                  { (order.customer_id)
                    ? (<Text style={styles.orderCustomer}>{' (By ' + order.billing.first_name + ' ' + order.billing.last_name + ')' }</Text>)
                    : (<Text style={styles.orderCustomer}>{' (By Guest)' }</Text>)
                  }
                </View>
                <View style={styles.orderStatusItemsContainer}>
                  <StatusLabel status={order.status} />
                </View>
              </View>
              <View style={styles.orderProductContainer}>
                <Octicons size={17} name={'package'} color={Colors.secondaryColor} />
                <OrderItemsList items={order.line_items} />
              </View>
              <View style={[styles.orderDateContainer]}>
                <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.orderDate}>{ date + ' | ' + time }</Text>
                <View style={styles.orderCommissionContainer}>
                  <FontAwesome size={17} name={'money'} color={Colors.secondaryColor} /><Text style={styles.orderCommission}> Earnings: {CurrencySymbols[order.currency]}{Math.round(order.vendor_order_details.total_commission * 100) / 100 }</Text>
                </View>
              </View>
            </View>
          </MenuTrigger>
          <MenuOptions customStyles={{ optionText: styles.slideInOption }}>
            <MenuOption key={'00'} value={''} disabled disableTouchable text={'Tap any one of the options below to change the order status'} />
            {statuses.map(({ label, value }) => (<MenuOption key={value} value={value} text={label} />))}
          </MenuOptions>
        </Menu>
      )
    } else {
      return (
        <View style={this.props.index ? styles.listItemContainer : styles.listItemContainerFirst} >
          <View style={styles.listItemRow}>
            <View style={styles.orderNameStatusContainer}>
              <View style={styles.orderNoCustContainer}>
                <Text style={styles.orderName}>{'#' + order.id}</Text>
                { (order.customer_id)
                  ? (<Text style={styles.orderCustomer}>{' (By ' + order.billing.first_name + ' ' + order.billing.last_name + ')' }</Text>)
                  : (<Text style={styles.orderCustomer}>{' (By Guest)' }</Text>)
                }
              </View>
              <View style={styles.orderStatusItemsContainer}>
                <StatusLabel status={order.status} />
              </View>

            </View>
            <View style={styles.orderProductContainer}>
              <Octicons size={17} name={'package'} color={Colors.secondaryColor} /><OrderItemsList items={order.line_items} />
            </View>
            <View style={[styles.orderDateContainer]}>
              <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.orderDate}>{ date + ' | ' + time }</Text>
              <View style={styles.orderCommissionContainer}>
                <FontAwesome size={17} name={'money'} color={Colors.secondaryColor} /><Text style={styles.orderCommission}>Earnings: {CurrencySymbols[order.currency]}{Math.round(order.vendor_order_details.total_commission * 100) / 100 }</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    capabilities: CapabilitiesSelectors.getData(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(OrderListItem)
