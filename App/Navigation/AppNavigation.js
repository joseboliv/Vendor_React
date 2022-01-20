import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import ProductListingScreen from '../Containers/ProductListingScreen'
import OrderListingScreen from '../Containers/OrderListingScreen'
import BookingListingScreen from '../Containers/BookingListingScreen'
import EnquiryListingScreen from '../Containers/EnquiryListingScreen'
import NotificationListingScreen from '../Containers/NotificationListingScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProductEditScreen from '../Containers/ProductEditScreen'
import ReportScreen from '../Containers/ReportScreen'
import EnquiryEditScreen from '../Containers/EnquiryEditScreen'
import ReviewListingScreen from '../Containers/ReviewListingScreen'
import CreateProductScreen from '../Containers/CreateProductScreen'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ProductListingScreen: { screen: ProductListingScreen },
  OrderListingScreen: { screen: OrderListingScreen },
  BookingListingScreen: { screen: BookingListingScreen },
  EnquiryListingScreen: { screen: EnquiryListingScreen },
  ReportScreen: { screen: ReportScreen },
  NotificationListingScreen: { screen: NotificationListingScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  LaunchScreen: { screen: LaunchScreen },
  ProductEditScreen: { screen: ProductEditScreen },
  EnquiryEditScreen: { screen: EnquiryEditScreen },
  ReviewListingScreen: { screen: ReviewListingScreen },
  CreateProductScreen: { screen: CreateProductScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'WelcomeScreen'
})

const AuthNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen'
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: PrimaryNav,
    Auth: AuthNav
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
