import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StatusBar, View, ScrollView } from 'react-native'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Colors } from '../Themes/'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import Logo from '../Components/Logo'
import LoginForm from '../Components/LoginForm'
import { withNavigation } from 'react-navigation'

class LoginScreen extends Component {
  static propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    updateUserName: PropTypes.func,
    updatePassword: PropTypes.func,
    navigation: PropTypes.object,
    doLogin: PropTypes.func,
    siteUrl: PropTypes.string,
    updateSiteUrl: PropTypes.func,
    isLoggingIn: PropTypes.bool,
    initialize: PropTypes.func
  }

  componentDidMount () {
    const { userName, password, siteUrl, initialize } = this.props
    if (!userName && !password && !siteUrl) {
      initialize(Config.USER_NAME, Config.PASSWORD, Config.SITE_URL)
    }
  }

  handlePressLogin = () => {
    const { userName, password, siteUrl } = this.props
    this.props.doLogin(userName, password, siteUrl)
  }

  render () {
    const { userName, password, siteUrl, updateUserName, updatePassword, updateSiteUrl, isLoggingIn } = this.props
    return (
      <ScrollView contentContainerStyle={styles.mainScrollViewContainer}>
        <View style={styles.contentArea}>
          <StatusBar
            barStyle='light-content'
            backgroundColor={Colors.primaryColor}
          />
          <View style={styles.formViewContainer}>
            <Logo size='small' />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.LogoText}>Welcome to the Store Manager</Text>
            </View>
            <LoginForm
              userName={userName}
              onUserNameChange={updateUserName}
              password={password}
              onPasswordChange={updatePassword}
              siteUrl={siteUrl}
              onSiteUrlChange={updateSiteUrl}
              handlePressLogin={this.handlePressLogin}
              isLogginIn={isLoggingIn}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userName: LoginSelectors.getUserName(state),
    password: LoginSelectors.getPassword(state),
    siteUrl: LoginSelectors.getSiteUrl(state),
    isLoggingIn: LoginSelectors.isLoggingIn(state)
  }
}

const mapDispatchToProps = {
  updateUserName: LoginActions.updateUserName,
  updatePassword: LoginActions.updatePassword,
  updateSiteUrl: LoginActions.updateSiteUrl,
  doLogin: LoginActions.loginRequest,
  initialize: LoginActions.initialize
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(LoginScreen)
