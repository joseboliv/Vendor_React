import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Themes'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  listItemContainer: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 15,
    marginTop: Metrics.mediumMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
  listItemContainerFirst: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 15,
    marginTop: Metrics.largeMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
  listItemRow: {
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.miniMargin,
    paddingVertical: Metrics.miniMargin,
    borderRadius: 15,
    alignItems: 'center'
  },
  orderNameStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: Metrics.superMicroMargin
  },
  orderNoCustContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 500,
    marginBottom: Metrics.superMicroMargin
  },
  orderName: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold,
    // backgroundColor: Colors.tertiaryColor,
    fontWeight: 'bold',
    color: Colors.boldText,
    //textAlign: 'left'
  },
  orderCustomer: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'left',
    alignSelf: 'center'
  },
  orderCommissionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  orderCommission: {
    fontSize: 14,
    textAlign: 'right',
    // color: Colors.text
    paddingLeft: Metrics.superMicroMargin,
  },
  orderStatusItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  orderProductContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: Metrics.microMargin,
    marginBottom: Metrics.superMicroMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight
  },
  orderItemsDetails: {
    marginLeft: Metrics.microMargin
  },
  orderDateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.superMicroMargin / 1.5
  },
  orderDate: {
    paddingLeft: Metrics.superMicroMargin,
  },
  label: {
    textAlign: 'center',
    color: Colors.text
  },
  slideInOption: {
    padding: 10,
    flex: 1,
    textAlign: 'center'
  }
})
