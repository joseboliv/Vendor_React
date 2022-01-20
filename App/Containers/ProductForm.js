import React, { Component } from 'react'
import t from 'tcomb-form-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles

const Form = t.form.Form

Form.stylesheet.checkbox.normal.display = 'flex'
Form.stylesheet.checkbox.normal.alignSelf = 'flex-start'
Form.stylesheet.checkbox.error.display = 'flex'
Form.stylesheet.checkbox.error.alignSelf = 'flex-start'

class ProductForm extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  setRef = (e) => {
    this.form = e
  }

  handleChange = (value, [key]) => {
    this.props.onChange(key, value[key])
  }

  getFormType = () => {
    const { product: { manage_stock: manageStock, type: productType } } = this.props

    return {
      name: t.String,
      ...((productType === 'simple')
        ? {
          regular_price: t.String,
          sale_price: t.String,
          sku: t.String,
          manage_stock: t.Boolean,
          ...(manageStock ? { stock_quantity: t.Number } : {})
        }
        : {}
      )
    }
  }

  render () {
    const { product } = this.props

    if (!product) return null

    /* let options = {
      fields: {
        name: {
          label: 'Name Label'
        },
        regular_price: { // <= Keys are keys used in getFormType function above
          label: 'Regular Price Label'
        }
      }
    }; */

    const type = t.struct(this.getFormType())

    return (
      <Form
        ref={this.setRef}
        type={type}
        value={product}
        onChange={this.handleChange}
      />
    )
  }
}

export default ProductForm
