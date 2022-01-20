import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ProductListingTypes } from '../Redux/ProductListingRedux'
import { ProductEditTypes } from '../Redux/ProductEditRedux'
import { OrderListingTypes } from '../Redux/OrderListingRedux'
import { BookingListingTypes } from '../Redux/BookingListingRedux'
import { NotificationListingTypes } from '../Redux/NotificationListingRedux'
import { EnquiryListingTypes } from '../Redux/EnquiryListingRedux'
import { EnquiryEditTypes } from '../Redux/EnquiryEditRedux'
import { SalesStatsTypes } from '../Redux/SalesStatsRedux'
import { ReviewListingTypes } from '../Redux/ReviewListingRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getLogin, logout } from './LoginSagas'
import { getProductList, searchProduct } from './ProductListingSagas'
import { getProduct, updateProduct, createProduct } from './ProductEditSagas'
import { getOrderList, searchOrder, updateStatus } from './OrderListingSagas'
import { getBookingList, searchBooking } from './BookingListingSagas'
import { getEnquiryList } from './EnquiryListingSagas'
import { getEnquiry, updateEnquiry } from './EnquiryEditSagas'
import { getNotificationList } from './NotificationListingSagas'
import { getSalesStats } from './SalesStatsSagas'
import { getReviewList, updateReviewStatus } from './ReviewListingSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
export const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),

    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),

    takeLatest(LoginTypes.LOGOUT, logout),

    takeLatest(ProductListingTypes.PRODUCT_LIST_REQUEST, getProductList, api),

    takeLatest(ProductListingTypes.PRODUCT_SEARCH_INPUT, searchProduct),

    takeLatest(ProductEditTypes.PRODUCT_REQUEST, getProduct, api),

    takeLatest(ProductEditTypes.CREATE_PRODUCT, createProduct, api),

    takeLatest(ProductEditTypes.UPDATE_PRODUCT, updateProduct, api),

    takeLatest(OrderListingTypes.ORDER_LIST_REQUEST, getOrderList, api),

    takeLatest(OrderListingTypes.ORDER_SEARCH_INPUT, searchOrder),

    takeLatest(OrderListingTypes.UPDATE_STATUS, updateStatus, api),

    takeLatest(BookingListingTypes.BOOKING_LIST_REQUEST, getBookingList, api),

    takeLatest(BookingListingTypes.BOOKING_SEARCH_INPUT, searchBooking),

    takeLatest(NotificationListingTypes.NOTIFICATION_LIST_REQUEST, getNotificationList, api),

    takeLatest(EnquiryListingTypes.ENQUIRY_LIST_REQUEST, getEnquiryList, api),

    takeLatest(EnquiryEditTypes.ENQUIRY_REQUEST, getEnquiry, api),

    takeLatest(EnquiryEditTypes.UPDATE_ENQUIRY, updateEnquiry, api),

    takeLatest(SalesStatsTypes.SALES_STATS_REQUEST, getSalesStats, api),

    takeLatest(ReviewListingTypes.REVIEW_LIST_REQUEST, getReviewList, api),

    takeLatest(ReviewListingTypes.UPDATE_REVIEW_STATUS, updateReviewStatus, api)
  ])
}
