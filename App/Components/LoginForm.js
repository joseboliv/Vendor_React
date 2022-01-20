import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import {Input} from 'react-native-elements'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Styles/LoginFormStyle'
import RoundedButton from './RoundedButton'
import { Colors } from '../Themes'

class LoginForm extends React.Component {
  // // Prop type warnings
  static propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    onUserNameChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    handlePressLogin: PropTypes.func,
    isLogginIn: PropTypes.bool
  }

  //
  // // Defaults for props
  static defaultProps = {
    userName: '',
    password: ''
  }

  render () {
    const { userName, password, onUserNameChange, onPasswordChange, onSiteUrlChange, siteUrl, handlePressLogin, isLogginIn } = this.props

    return (
      <View style={styles.container}>
        <Input
          ref='siteurl'
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={onSiteUrlChange}
          value={siteUrl}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs.username.focus()}
          placeholderTextColor={Colors.textColorTwo}
          placeholder='Site Url'
          leftIcon={
            <SimpleLineIcons
              name='globe'
              //raised
              size={18}
              color={Colors.secondaryColor}
            />
          }
          containerStyle= {
            styles.containerStyle
          }
          inputContainerStyle= {
            styles.inputContainerStyle
          }          
          inputStyle={
            styles.inputStyle
          }
          leftIconContainerStyle={
            styles.leftIconContainerStyle
          }
          labelStyle={
            styles.labelStyle
          }
        />

        <Input
          ref='username'
          keyboardType='email-address'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          value={userName}
          onChangeText={onUserNameChange}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs.password.focus()}
          placeholderTextColor={Colors.textColorTwo}
          placeholder='Username/Email'
          leftIcon={
            <Feather
              name='user'
              //raised
              size={18}
              color={Colors.secondaryColor}
            />
          }
          containerStyle= {
            styles.containerStyle
          }
          inputContainerStyle= {
            styles.inputContainerStyle
          }          
          inputStyle={
            styles.inputStyle
          }
          leftIconContainerStyle={
            styles.leftIconContainerStyle
          }
          labelStyle={
            styles.labelStyle
          }
          />
        <Input
          ref='password'
          keyboardType='default'
          returnKeyType='go'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          value={password}
          onChangeText={onPasswordChange}
          underlineColorAndroid='transparent'
          onSubmitEditing={handlePressLogin}
          placeholderTextColor={Colors.textColorTwo}
          placeholder='Password'
          leftIcon={
            <MaterialCommunityIcons
              name='lock-outline'
              //raised
              size={18}
              color={Colors.secondaryColor}
            />
          }
          containerStyle= {
            styles.containerStyle
          }
          inputContainerStyle= {
            styles.inputContainerStyle
          }          
          inputStyle={
            styles.inputStyle
          }
          leftIconContainerStyle={
            styles.leftIconContainerStyle
          }
          labelStyle={
            styles.labelStyle
          }
          />
        <RoundedButton
          text='Login'
          disabled={!userName || !password || !siteUrl || isLogginIn}
          customStyle={(!userName || !password || !siteUrl || isLogginIn) ? styles.buttonDisabled : {}}
          isDisabled={(!userName || !password || isLogginIn)}
          isLoading={isLogginIn}
          onPress={handlePressLogin} />
      </View>
    )
  }
}
export default LoginForm
