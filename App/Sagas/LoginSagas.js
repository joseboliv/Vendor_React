/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import StartupActions from '../Redux/StartupRedux'
import LoginActions from '../Redux/LoginRedux'
import Toast from 'react-native-simple-toast'
import { NavigationActions } from 'react-navigation'
import OneSignal from 'react-native-onesignal'
import axios from 'axios'
import get from 'lodash/get'
import _ from 'lodash'

export function * getLogin (api, action) {
  const { userName, password, siteUrl } = action
  // get current data from Store
  // const currentData = yield select(LoginSelectors.getData)
  // make the call to the api
  try {
    const response = yield call(api.getAuthToken, userName, password, siteUrl)
    if (response.ok && get(response, 'data.token', false)) {  
      const userRoles = get(response, 'data.roles', false)  
      if (_.includes(userRoles, 'wcfm_vendor')) {    
        yield put(LoginActions.loginSuccess(response.data))        
        yield put(StartupActions.startup())                                
        yield put(NavigationActions.navigate({
          routeName: 'AuthLoading'
        }))  
        OneSignal.setExternalUserId(response.data.user_email)        
        OneSignal.setSubscription(true)          
      } else {       
        Toast.show('Please Login As A Vendor')        
        yield put(LoginActions.loginFailure())        
      }
    } else {
      //console.log('mm')
      Toast.show((response && response.data.code) || 'Website Auth Setup Incorrect - Contact Admin - JWT Token Missing')
      //console.log('nn')
      yield put(LoginActions.loginFailure())
      //console.log('oo')
    }
  } catch (e){
    //console.log(e)
    if ( get(e, 'data.code', false) == "[jwt_auth] incorrect_password") {
      //console.log('test')
      Toast.show('Incorrect Username or Password')
    } else if ( get(e, 'data.code', false) == "rest_no_route") { 
      Toast.show('Website Auth Setup Incorrect - Contact Admin - JWT Plugin Inactive', Toast.LONG, Toast.TOP)
    } else if ( get(e, 'data.code', false) == "jwt_auth_bad_config") {
      Toast.show('Website Auth Setup Incorrect - Contact Admin - wp-config incorrect setup', Toast.LONG, Toast.TOP)
    } else {
      if(get(e, 'data.code', false)) {
        Toast.show('Website Auth Setup Incorrect - Contact Admin - ' + get(e, 'data.code', false), Toast.LONG, Toast.TOP)
      }
      else {
        Toast.show('Login Faliure Contact Admin - Probable Cause incorrect URL', Toast.LONG, Toast.TOP)
      }
    }
    // console.log(e)
    yield put(LoginActions.loginFailure())
    //console.log('rr')
  }
}

export function * logout (params) {
  OneSignal.setSubscription(false)
  delete axios.defaults.headers.common['Authorization']
  yield put(NavigationActions.navigate({
    routeName: 'Auth',
    action: NavigationActions.navigate({ routeName: 'LoginScreen' })
  }))
}
