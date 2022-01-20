import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native'
import SalesStatsActions, { SalesStatsSelectors } from '../Redux/SalesStatsRedux'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LogoutButton from '../Components/LogoutButton'
import ButtonBox from '../Components/ButtonBox'
import { withNavigation } from 'react-navigation'
import { CapabilitiesSelectors } from '../Redux/CapabilitiesRedux'
import { SiteDetailsSelectors } from '../Redux/SiteDetailsRedux'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import CurrencySymbols from '../Constants/CurrencySymbols'
import { Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WelcomeScreenStyle'
class WelcomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Welcome ${(navigation.state && navigation.state.params && navigation.state.params.displayName) || ''}`,
    headerStyle: { backgroundColor: Colors.secondaryColor },
    headerTitleStyle: { width: 350 },
    headerRight: (
      <View style={styles.headerButtonContainer}>
        <LogoutButton />
      </View>
    )
  })

  componentDidMount () {
    this.props.getSalesStats()
  }

  handleButtonBoxPress = (screenName) => {
    this.props.navigation.navigate(screenName)
  }

  renderStats = () => {
    const { salesStats, salesStatsError } = this.props
    if (salesStatsError || !salesStats) return
    // if( capabilities.view_reports ) return
    return (
      <View style={styles.stats}>
        <Table borderStyle={styles.borderStyle}>
          <Row data={['Period', 'Gross Sales', 'Earning']} flexArr={[1, 1, 1]} style={styles.head} borderStyle={styles.borderStyle} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper} borderStyle={styles.borderStyle}>
            <Col data={['Week', 'Month', 'Last Month']} style={styles.title} heightArr={[28, 28]} borderStyle={styles.borderStyle} textStyle={styles.text} />
            <Rows data={[
              [CurrencySymbols[salesStats.currency] + salesStats.gross_sales.week, CurrencySymbols[salesStats.currency] + salesStats.earnings.week],
              [CurrencySymbols[salesStats.currency] + salesStats.gross_sales.month, CurrencySymbols[salesStats.currency] + salesStats.earnings.month],
              [CurrencySymbols[salesStats.currency] + salesStats.gross_sales.last_month, CurrencySymbols[salesStats.currency] + salesStats.earnings.last_month]
            ]} flexArr={[1, 1]} borderStyle={styles.borderStyle} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
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
    return (<View style={styles.mainContainer}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={this.props.isSalesStatsLoading}
          onRefresh={this.props.getSalesStats}
        />
      }>
        {this.renderStats()}
        <View style={styles.buttonsContainer}>
          {!capabilities.submit_products && <ButtonBox
            iconName='cube-outline'
            iconSize={48}
            iconColor={Colors.text}
            text='Products'
            onPress={() => this.handleButtonBoxPress('ProductListingScreen')} />}
          {!capabilities.view_orders && <ButtonBox
            iconName='cart-outline'
            iconSize={48}
            iconColor={Colors.text}
            text='Orders'
            onPress={() => this.handleButtonBoxPress('OrderListingScreen')} />}
          {!capabilities.booking_list && siteDetails.is_wc_booking && <ButtonBox
            iconName='calendar'
            iconSize={48}
            iconColor={Colors.text}
            text='Bookings'
            onPress={() => this.handleButtonBoxPress('BookingListingScreen')} />}
          <ButtonBox
            iconName='help-circle-outline'
            iconSize={48}
            iconColor={Colors.text}
            text='Enquiry Board'
            onPress={() => this.handleButtonBoxPress('EnquiryListingScreen')} />
          <ButtonBox
            iconName='bell-outline'
            iconSize={48}
            iconColor={Colors.text}
            text='Notifications'
            onPress={() => this.handleButtonBoxPress('NotificationListingScreen')} />
        </View>

      </ScrollView>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
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
