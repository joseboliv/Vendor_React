import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderListRequest: ['data'],
  orderListSuccess: ['payload', 'param'],
  orderListFailure: null,
  orderSearchInput: ['searchTerm'],
  updateStatus: ['id', 'status'],
  updatedStatus: ['id', 'status'],
  errorUpdatingStatus: ['error']
})

export const OrderListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  search: '',
  allLoaded: false,
  updatingStatus: false,
  errorUpdatingStatus: null,
  updatingId: null
})

/* ------------- Selectors ------------- */

export const OrderListingSelectors = {
  orders: state => state.orders.payload,
  isLoading: state => Boolean(state.orders.fetching),
  search: state => state.orders.search,
  page: state => state.orders.page,
  hasError: state => state.orders.error,
  isAllLoaded: state => state.orders.allLoaded,
  isUpdating: state => state.orders.updatingStatus,
  updatingId: state => state.orders.updatingId
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data: { page = 0 } = {} }) =>
  state.merge({
    fetching: true,
    payload: page === 1 ? Immutable([]) : state.payload
  })

// successful api lookup
export const success = (state, action) => {
  const { payload, param: { page = 1, search = '' } = {} } = action
  return state.merge({
    fetching: false,
    error: null,
    payload: page === 1 ? Immutable(payload) : state.payload.concat(Immutable(payload)),
    page,
    search,
    allLoaded: page > 1 && !payload.length
  })
}

export const search = (state, action) => {
  const { searchTerm } = action
  return state.merge({ search: searchTerm, page: 1 })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const updateStatus = (state, { id }) =>
  state.merge({ updatingStatus: true, updatingId: id })

export const updatedStatus = (state, { id, status }) =>
  state.merge({ updatingStatus: false, updatingId: null }).setIn(['payload', state.payload.findIndex(o => o.id === id), 'status'], status)
export const errorUpdatingStatus = state =>
  state.merge({ updatingStatus: false, updatingId: null })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_LIST_REQUEST]: request,
  [Types.ORDER_LIST_SUCCESS]: success,
  [Types.ORDER_LIST_FAILURE]: failure,
  [Types.ORDER_SEARCH_INPUT]: search,
  [Types.UPDATE_STATUS]: updateStatus,
  [Types.UPDATED_STATUS]: updatedStatus,
  [Types.ERROR_UPDATING_STATUS]: errorUpdatingStatus
})
