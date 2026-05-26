import { createStore } from 'vuex'
import product from './Modules/product'

const store = createStore({
  modules: {
    product
  }
})

export default store


