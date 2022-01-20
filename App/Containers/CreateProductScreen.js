import React, { Component } from 'react'
import { Colors, Fonts } from '../Themes'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ProductEditActions, { ProductEditSelectors } from '../Redux/ProductEditRedux'
import AlertMessage from '../Components/AlertMessage'
import ProductForm from './ProductForm'
import FullScreenLoader from '../Components/FullScreenLoader'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/ProductEditScreenStyle'

class CreateProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Create New Product`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'center', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  componentDidMount () {
    this.props.initProduct({ type: 'simple', mode: 'create' })
  }

  componentWillUnmount () {
    this.props.reset()
  }

  render () {
    const { product, isLoading, hasError, isUpdating, createProduct } = this.props

    if (isLoading || isUpdating) {
      return (
        <FullScreenLoader />
      )
    }

    if (hasError) {
      return (
        <AlertMessage title='Failed to open product for edit' />
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <ProductForm product={product} onChange={this.props.changeField} />
          <Text>Note: Only Simple Products can be created in this page. To create other product types login through the website.</Text>
          <RoundedButton customStyle={styles.updateButton} onPress={createProduct} text='Create Product' />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: ProductEditSelectors.getProduct(state),
    isLoading: ProductEditSelectors.isLoading(state),
    hasError: ProductEditSelectors.hasError(state),
    isUpdating: ProductEditSelectors.isUpdating(state),
    updateError: ProductEditSelectors.updateError(state)
  }
}

const mapDispatchToProps = {
  initProduct: ProductEditActions.productSuccess,
  changeField: ProductEditActions.changeField,
  createProduct: ProductEditActions.createProduct,
  reset: ProductEditActions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductScreen)
