import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import ProductEditActions, { ProductEditSelectors } from '../Redux/ProductEditRedux'
import AlertMessage from '../Components/AlertMessage'
import get from 'lodash/get'
import ProductForm from './ProductForm'
import FullScreenLoader from '../Components/FullScreenLoader'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProductEditScreenStyle'
class ProductEditScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Edit ${navigation.state.params.product.name}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'center', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  componentDidMount () {
    this.props.getProduct(get(this.props, 'navigation.state.params.product.id', -1))
  }

  componentWillUnmount () {
    this.props.reset()
  }

  render () {
    const { product, isLoading, hasError, isUpdating, updateProduct } = this.props

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
          <RoundedButton customStyle={styles.updateButton} onPress={updateProduct} text='Update Product' />
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
  getProduct: ProductEditActions.productRequest,
  changeField: ProductEditActions.changeField,
  updateProduct: ProductEditActions.updateProduct,
  reset: ProductEditActions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditScreen)
