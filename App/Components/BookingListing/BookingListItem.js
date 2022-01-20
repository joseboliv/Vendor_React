import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../Themes'
import StatusLabel from '../WcGlobals/StatusLabel'
import FullScreenLoader from '../FullScreenLoader'
import moment from 'moment'

import styles from './Styles/BookingListItemStyle'

export default class BookingListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    booking: PropTypes.object,
    index: PropTypes.number
  }

  // statuses = [
  //   { label: 'On Hold', value: 'on-hold' },
  //   { label: 'Processing', value: 'processing' },
  //   { label: 'Completed', value: 'completed' },
  //   { label: 'Pending', value: 'pending' },
  //   { label: 'Refunded', value: 'refunded' },
  //   { label: 'Shipped', value: 'shipped' }
  // ]

  getBookingStatus = () => {
    return this.statuses.filter(({ value }) => value !== this.props.booking.status)
  }

  // onSelect = (value) => {
  //   const { onUpdate, booking } = this.props
  //   onUpdate(booking.id, value)
  // }

  render () {
    if (this.props.updating) {
      return (<FullScreenLoader />)
    }

    // const statuses = this.getBookingStatus()
    const { booking, index } = this.props
    const dateStart = (booking.start !== null) ? moment(booking.start).format('DD-MM-YY - hh:mmA') : ''
    const dateEnd = (booking.end !== null)
      ? (dateStart !== '') ? moment(booking.end).format('DD-MM-YY - hh:mmA') : moment(booking.end).format('DD-MM-YY')
      : ''
    return (

      <View style={index ? styles.row : styles.rowFirst}>
        <View style={styles.bookingNamePriceContainer}>
          <View style={styles.bookingNoCustContainer}>
            <Text style={styles.bookingName}>{'#' + booking.id}</Text>
            <Text style={styles.bookingCustomer}>{' (By ' + booking.customer_name + ')' }</Text>
          </View>
          <View style={styles.bookingNamePriceContainer}>
            <StatusLabel status={booking.status} />
          </View>
        </View>

        <View style={styles.bookingProductContainer}>
          <Icon size={20} name={'cube-outline'} color={Colors.secondaryColor} /><Text style={styles.bookingProduct}>{ booking.product_title }</Text>
        </View>
        <View style={styles.bookingStatusItemsContainer}>
          <Icon size={20} name={'clock-outline'} color={Colors.secondaryColor} />
          { dateStart !== '' && <Text style={styles.notificationDate}>{ ' ' + dateStart}</Text> }
          { dateStart !== '' && <Text style={styles.notificationDateBold}>{' To'}</Text> }
          { dateEnd !== '' && <Text style={styles.notificationDate}>{' ' + dateEnd}</Text> }
        </View>
      </View>

    )
  }
}
