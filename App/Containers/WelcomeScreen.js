import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StatusBar, RefreshControl } from 'react-native'
import SalesStatsActions, { SalesStatsSelectors } from '../Redux/SalesStatsRedux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LogoutButton from '../Components/LogoutButton'
import ButtonBox from '../Components/ButtonBox'
import { withNavigation } from 'react-navigation'
import { CapabilitiesSelectors } from '../Redux/CapabilitiesRedux'
import { SiteDetailsSelectors } from '../Redux/SiteDetailsRedux'
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import CurrencySymbols from '../Constants/CurrencySymbols'
import { Colors, Fonts } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WelcomeScreenStyle'
class WelcomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Welcome ${(navigation.state && navigation.state.params && navigation.state.params.displayName) || ''}`,
    headerStyle: { backgroundColor: Colors.secondaryColor },
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'center' },
    headerTintColor: '#fff',
    headerRight: (
      <View style={styles.headerButtonContainer}>
        <LogoutButton />
      </View>
    )
  })

  componentDidMount () {
    const { capabilities } = this.props
    if (!capabilities.view_reports) { this.props.getSalesStats() }
  }

  handleButtonBoxPress = (screenName) => {
    this.props.navigation.navigate(screenName)
  }

  renderStats = () => {
    const { salesStats, salesStatsError, capabilities } = this.props
    if (salesStatsError || !salesStats) return
    if (capabilities.view_reports) return

    return (
      <View style={styles.stats}>
        <View style={styles.grossSales}>
          <View style={styles.grossSalesIconBox}>
            <Icon size={28} name={'currency-usd'} color={Colors.headerBackground} />
          </View>
          <View style={styles.amountBox}>
            <View style={[styles.triangle, styles.grossSalesTriangle]} />
            <Text style={styles.amountLabel}>{'Sales in this month'}</Text>
            <Text style={[styles.amountTotal,styles.amountTotalSales]}>{ CurrencySymbols[salesStats.currency] + salesStats.gross_sales.month }</Text>
          </View>
        </View>
        <View style={styles.grossEarnings}>
          <View style={styles.grossEarningsIconBox}>
            <Icon size={28} name={'cash'} color={Colors.headerBackground} />
          </View>
          <View style={styles.amountBox}>
            <View style={[styles.triangle, styles.grossEarningsTriangle]} />
            <Text style={styles.amountLabel}>{'Earnings in this month'}</Text>
            <Text style={[styles.amountTotal,styles.amountTotalEarnings]}>{ CurrencySymbols[salesStats.currency] + salesStats.earnings.month }</Text>
          </View>
        </View>
      </View>
    )
  }

  static propTypes = {
    logout: PropTypes.func,
    capabilities: PropTypes.object,
    siteDetails: PropTypes.object,
    salesStats: PropTypes.object,
    isSalesStatsLoading: PropTypes.bool,
    salesStatsError: PropTypes.any
  }

  render () {
    const { capabilities, siteDetails } = this.props
    return (
      <View style={styles.mainViewInnerPage}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={Colors.primaryColor}
        />
        <ScrollView 
          contentContainerStyle={styles.scrollViewInnerPage}
          refreshControl={
            !capabilities.view_reports && <RefreshControl
              refreshing={this.props.isSalesStatsLoading}
              onRefresh={this.props.getSalesStats}
            />
          }
        >
          <View style={styles.welcomeScreenContainer}>
            {this.renderStats()}
            <View style={styles.buttonsContainer}>
            
              {!capabilities.submit_products && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='package-variant-closed'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Products'
                onPress={() => this.handleButtonBoxPress('ProductListingScreen')} />}
              {!capabilities.view_orders && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='cart-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Orders'
                onPress={() => this.handleButtonBoxPress('OrderListingScreen')} />}
              {!capabilities.booking_list && siteDetails.is_wc_booking && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='calendar-month-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Bookings'
                onPress={() => this.handleButtonBoxPress('BookingListingScreen')} />}
              {!capabilities.enquiry && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='help-circle-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Enquiry Board'
                onPress={() => this.handleButtonBoxPress('EnquiryListingScreen')} />}
              {!capabilities.view_reports && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='chart-line'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Reports'
                onPress={() => this.handleButtonBoxPress('ReportScreen')} />}
              {!capabilities.review_manage && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='comment-processing-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Reviews'
                onPress={() => this.handleButtonBoxPress('ReviewListingScreen')} />}
              {!capabilities.notification && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='bell-ring-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text='Notifications'
                onPress={() => this.handleButtonBoxPress('NotificationListingScreen')} /> }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    capabilities: CapabilitiesSelectors.getData(state),
    siteDetails: SiteDetailsSelectors.getData(state),
    salesStats: SalesStatsSelectors.getData(state),
    isSalesStatsLoading: SalesStatsSelectors.isLoading(state),
    salesStatsError: SalesStatsSelectors.error(state)
  }
}

const mapDispatchToProps = {
  getSalesStats: SalesStatsActions.salesStatsRequest
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(WelcomeScreen)
