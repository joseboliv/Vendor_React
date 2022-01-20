const wcfmmpPrefix = '/:wpApiPrefix/wcfmmp/:version'
export default {
  getAuthToken: '/:wpApiPrefix/jwt-auth/:version/token/',
  products: `${wcfmmpPrefix}/products/`,
  orders: `${wcfmmpPrefix}/orders`,
  quickEdit: `${wcfmmpPrefix}/products/quick-edit/`,
  notifications: `${wcfmmpPrefix}/notifications`,
  capabilities: `${wcfmmpPrefix}/restricted-capabilities`,
  siteDetails: `${wcfmmpPrefix}/site-details`,
  bookings: `${wcfmmpPrefix}/bookings`,
  enquiries: `${wcfmmpPrefix}/enquiries`,
  reviews: `${wcfmmpPrefix}/reviews`,
  salesStats: `${wcfmmpPrefix}/sales-stats`
}
