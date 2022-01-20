import { put, select, all, call } from 'redux-saga/effects'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'
import SiteDetailsActions from '../Redux/SiteDetailsRedux'
import CapabilitiesActions from '../Redux/CapabilitiesRedux'
import OneSignal from 'react-native-onesignal'
import Toast from 'react-native-simple-toast'
import { NavigationActions } from 'react-navigation'
import axios from 'axios'

// exported to make available for tests
export const selectAccessToken = LoginSelectors.getAccessToken

export const selectDisplayName = LoginSelectors.getDisplayName

export const selectSiteUrl = LoginSelectors.getSiteUrl

// process STARTUP actions
export function * startup (api) {
  const accessToken = yield select(selectAccessToken)
  const displayName = yield select(selectDisplayName)
  const siteUrl = yield select(selectSiteUrl)
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  if (siteUrl) {
    api.api.setBaseURL(siteUrl)
    axios.defaults.baseURL = siteUrl
  }

  if (accessToken) {
    try {
      const [capabilities, siteDetails] = yield all([
        call(api.getCapabilities),
        call(api.getSiteDetails)
      ])
      yield put(CapabilitiesActions.updateCapabilities(capabilities.data))
      yield put(SiteDetailsActions.updateSiteDetails(siteDetails.data))
      Toast.show('Logged in successfully')
    } catch (e) {
      Toast.show('Website Auth Setup Incorrect - Contact Admin - HTTP Authorization not enabled in server')
      yield put(LoginActions.logout())
      return
    }
  }

  yield put(NavigationActions.navigate({
    routeName: accessToken ? 'App' : 'Auth',
    action: NavigationActions.navigate({ routeName: 'WelcomeScreen', params: { displayName } })
  }))
}
