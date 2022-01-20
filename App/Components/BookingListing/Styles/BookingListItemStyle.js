import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.lightText
  },
  rowFirst: {
    backgroundColor: Colors.background,
    padding: Metrics.baseMargin,
    justifyContent: 'center'
  },
  bookingNamePriceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bookingNoCustContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500,
    marginBottom: Metrics.smallMargin
  },
  bookingName: {
    ...Fonts.style.h5,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    textAlign: 'left',
    marginRight: Metrics.smallMargin
  },
  bookingCustomer: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'left',
    alignSelf: 'center'
  },
  bookingProductContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: Metrics.smallMargin / 2
  },
  bookingProduct: {
    marginLeft: Metrics.smallMargin / 2
  },
  bookingStatusItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  },
  slideInOption: {
    padding: 10,
    flex: 1,
    textAlign: 'center'
  },
  notificationDateBold: {
    fontWeight: 'bold'
  }
})
